#include <WiFiManager.h> 
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include "EmonLib.h" // Include Emon Library
#include <ZMPT101B.h>
#include <EEPROM.h>
#include <math.h>



#define EEPROM_USER_EMAIL_ADDR 0
#define EEPROM_USER_PASSWORD_ADDR 100
#define EEPROM_SIZE 200
#define API_KEY "ADD YOUR API KEY"
#define DATABASE_URL "ADD YOUR DATABASE URL"
#define SENSITIVITY 500.0f
#define MAX_DATA_POINTS 5 // Number of data points to store
#define LED_PIN 22

char USER_EMAIL[100] = ""; // Change to your email address
char USER_PASSWORD[100] = "";       // Change to your desired password

// Flag for saving data
bool shouldSaveConfig = false;


#define TRIGGER_PIN 15
ZMPT101B voltageSensor(35, 50.0);

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
WiFiManager wifiManager;

EnergyMonitor emon2;

String uid;

double Voltage = 0;
double VRMS = 0;
float Voltage_RMS_arr[MAX_DATA_POINTS];
float AmpsRMS_arr[MAX_DATA_POINTS];
float Phase_Diff[MAX_DATA_POINTS];
int dataIndex = 0;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

const char custom_html[] PROGMEM = R"html(
    <!DOCTYPE html>
<html>
<head>
    <title>IntelliSwitcher Setup</title>
    <style>
        body {
            background-color: #f9f9f9;
            font-family: Arial, Helvetica, sans-serif;
        }
        h1 {
            text-align: center;
            color: #007bff;
        }
    </style>
</head>
<body>
    <h1>IntelliSwitcher Configuration</h1>
    <!-- You can add more custom content here if needed -->
</body>
</html>

)html";

int timeout = 120; // seconds to run for

void saveConfigFile() {
  Serial.println(F("Saving configuration..."));

  EEPROM.begin(EEPROM_SIZE);

  // Write USER_EMAIL to EEPROM
  for (int i = 0; i < sizeof(USER_EMAIL); i++) {
    EEPROM.write(EEPROM_USER_EMAIL_ADDR + i, USER_EMAIL[i]);
  }

  // Write USER_PASSWORD to EEPROM
  for (int i = 0; i < sizeof(USER_PASSWORD); i++) {
    EEPROM.write(EEPROM_USER_PASSWORD_ADDR + i, USER_PASSWORD[i]);
  }

  EEPROM.commit();
  EEPROM.end();
}


bool loadConfigFile() {
  EEPROM.begin(EEPROM_SIZE);

  // Read USER_EMAIL from EEPROM
  for (int i = 0; i < sizeof(USER_EMAIL); i++) {
    USER_EMAIL[i] = EEPROM.read(EEPROM_USER_EMAIL_ADDR + i);
  }
  USER_EMAIL[sizeof(USER_EMAIL) - 1] = '\0';

  // Read USER_PASSWORD from EEPROM
  for (int i = 0; i < sizeof(USER_PASSWORD); i++) {
    USER_PASSWORD[i] = EEPROM.read(EEPROM_USER_PASSWORD_ADDR + i);
  }
  USER_PASSWORD[sizeof(USER_PASSWORD) - 1] = '\0';

  EEPROM.end();

  if (strlen(USER_EMAIL) > 0 && strlen(USER_PASSWORD) > 0) {
    return true; // Return true to indicate success
  }
  return false;   // Return false if loading fails
}




void saveConfigCallback()
// Callback notifying us of the need to save configuration
{
  Serial.println("Should save config");
  shouldSaveConfig = true;
}

void connectToWiFi() {
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin();
  unsigned long startAttemptTime = millis();

  while (WiFi.status() != WL_CONNECTED && (millis() - startAttemptTime) < 10000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConnected to Wi-Fi!");
    
    config.api_key = API_KEY;
    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;
    config.database_url = DATABASE_URL;
    
    Firebase.reconnectWiFi(true);
    Firebase.begin(&config, &auth);
    uid = auth.token.uid.c_str();
    Serial.print("User UID: ");
    Serial.println(uid);
    signupOK = true;
    Serial.println("Sign ok");
  } else {
    Serial.println("\nFailed to connect to Wi-Fi!");
  }
}

void eraseWiFiCredentials() {
  WiFiManager wifiManager;
  wifiManager.resetSettings();
  Serial.println("Wi-Fi credentials erased.");
}


void setup() {
  WiFi.mode(WIFI_STA);
  Serial.begin(115200);
  voltageSensor.setSensitivity(SENSITIVITY);
  emon2.current(34, 0.9);
  Serial.println("\nStarting");
  pinMode(TRIGGER_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  if (!loadConfigFile()) {
    // Default values will be used if the config file doesn't exist
  }
  
}

void loop() {

  // is configuration portal requested?
  if ( digitalRead(TRIGGER_PIN) == LOW) {
    WiFiManager wm;
    wm.setDebugOutput(false);
    WiFiManagerParameter Email_text("Email_text", "Enter Your Email Address", USER_EMAIL, 100);
    WiFiManagerParameter Password_text("password_text", "Enter Your Password", USER_PASSWORD, 100);
    wm.addParameter(&Email_text);
    wm.addParameter(&Password_text);
    wm.setCustomHeadElement(custom_html); // Set custom HTML template
    eraseWiFiCredentials();
    // Reset the stored USER_EMAIL and USER_PASSWORD
    memset(USER_EMAIL, 0, sizeof(USER_EMAIL));
    memset(USER_PASSWORD, 0, sizeof(USER_PASSWORD));
    saveConfigFile(); // Save empty credentials to EEPROM
    digitalWrite(LED_PIN, LOW);

    delay(2000);


    //reset settings - for testing
    //wm.resetSettings();
  
    // set configportal timeout
    wm.setConfigPortalTimeout(timeout);

    if (!wm.startConfigPortal("IntelliSwitcher","Intel123")) {
      Serial.println("failed to connect and hit timeout");
      delay(3000);
      //reset and try again, or maybe put it to deep sleep
      ESP.restart();
      delay(5000);
    }

    //if you get here you have connected to the WiFi
    Serial.println("connected...yeey :)");
    
    // Save the new configuration
    saveConfigFile();
    uid="";
    strcpy(USER_EMAIL, Email_text.getValue());
    strcpy(USER_PASSWORD, Password_text.getValue());
    Serial.print("Updated USER_EMAIL: ");
    Serial.println(USER_EMAIL);
    Serial.print("Updated USER_PASSWORD: ");
    Serial.println(USER_PASSWORD);
    saveConfigFile();
    ESP.restart();
  }



  if (WiFi.isConnected()) {
    digitalWrite(LED_PIN, HIGH);
    
    float Voltage_RMS = voltageSensor.getRmsVoltage();
    double Irms = emon2.calcIrms(1480);
    double phaseDifference = atan2(Voltage_RMS, Irms);
    // Convert phase angle to degrees
    double phaseDegrees = phaseDifference * (180.0 / M_PI);
    delay(1000);
    
    Serial.println(Voltage_RMS);
    Serial.println(Irms);
    Serial.println(phaseDegrees);


    Voltage_RMS_arr[dataIndex] = Voltage_RMS;
    AmpsRMS_arr[dataIndex] = Irms;
    Phase_Diff[dataIndex] = phaseDegrees;
    dataIndex++;

    if (dataIndex >= MAX_DATA_POINTS) {
      dataIndex = 0;
      if (signupOK) {
        for (int i = 0; i < MAX_DATA_POINTS; i++) {
          String voltagePath = "Sensor/Voltage/" + String(i) ;
          String ampPath = "Sensor/Amp/" + String(i) ;
          String phasePath = "Sensor/Phase/" + String(i) ;


          if (Firebase.RTDB.setFloat(&fbdo, voltagePath.c_str(), Voltage_RMS_arr[i])) {
            Serial.println(Voltage_RMS_arr[i]);
            Serial.print("-successfully saved to: " + voltagePath);
            Serial.println(" (" + fbdo.dataType() + ")");
          } else {
            Serial.println("FAILED: " + fbdo.errorReason());
          }

          if (Firebase.RTDB.setFloat(&fbdo, ampPath.c_str(), AmpsRMS_arr[i])) {
            Serial.print(AmpsRMS_arr[i]);
            Serial.print("-successfully saved to: " + ampPath);
            Serial.println(" (" + fbdo.dataType() + ")");
          } else {
            Serial.println("FAILED: " + fbdo.errorReason());
          }
          if (Firebase.RTDB.setFloat(&fbdo, phasePath.c_str(), Phase_Diff[i])) {
            Serial.println(Phase_Diff[i]);
            Serial.print("-successfully saved to: " + phasePath);
            Serial.println(" (" + fbdo.dataType() + ")");
          } else {
            Serial.println("FAILED: " + fbdo.errorReason());
          }

          delay(100);
        }
      }
    }

    delay(1000); // Delay before taking the next reading
  } else {
    digitalWrite(LED_PIN, LOW);
    connectToWiFi();
  }
}