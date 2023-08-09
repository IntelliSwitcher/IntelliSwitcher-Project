#include <WiFiManager.h> 
#include <WiFi.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include "EmonLib.h" //Include Emon Library
#include <ZMPT101B.h>

#define API_KEY "API Key"
#define DATABASE_URL "Database URL"
#define SENSITIVITY 500.0f
#define MAX_DATA_POINTS 5 // Number of data points to store
#define LED_PIN 22

// select which pin will trigger the configuration portal when set to LOW
#define TRIGGER_PIN 15
ZMPT101B voltageSensor(35, 50.0);

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
WiFiManager wifiManager;


EnergyMonitor emon2;

double Voltage = 0;
double VRMS = 0;
float Voltage_RMS_arr[MAX_DATA_POINTS];
float AmpsRMS_arr[MAX_DATA_POINTS];
int dataIndex = 0;

unsigned long sendDataPrevMillis=0;
bool signupOK=false;



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

void connectToWiFi() {
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(); // Start Wi-Fi connection
  unsigned long startAttemptTime = millis();

  // Wait until connected or timed out
  while (WiFi.status() != WL_CONNECTED && (millis() - startAttemptTime) < 10000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConnected to Wi-Fi!");
    config.api_key = API_KEY;
    config.database_url = DATABASE_URL;
    // Sign up
    if (Firebase.signUp(&config, &auth, "", "")) {
      Serial.println("SignUp OK");
      signupOK = true;
    } else {
      Serial.printf("%s\n", config.signer.signupError.message.c_str());
    }

    // Assign the callback function for the long running token generation task
    config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
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
  WiFi.mode(WIFI_STA); // explicitly set mode, esp defaults to STA+AP  
  // put your setup code here, to run once:
  Serial.begin(115200);
  voltageSensor.setSensitivity(SENSITIVITY);
  emon2.current(34,0.9);
  Serial.println("\n Starting");
  pinMode(TRIGGER_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT); // Set LED pin as OUTPUT
  digitalWrite(LED_PIN, LOW); // Initialize LED as OFF
}

void loop() {
  // is configuration portal requested?
  if ( digitalRead(TRIGGER_PIN) == LOW) {
    WiFiManager wm; 
    wm.setCustomHeadElement(custom_html); 
    eraseWiFiCredentials();
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
    config.api_key = API_KEY;
    config.database_url = DATABASE_URL;
    /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("SignUp OK");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  }

   if (WiFi.isConnected()){
     digitalWrite(LED_PIN, HIGH);
     // Calculation Part
    // Volatge RMS
    float Voltage_RMS = voltageSensor.getRmsVoltage();
    delay(1000);
    // Current RMS
    double Irms = emon2.calcIrms(1480);
    //print the Values in serial 
    Serial.println( Voltage_RMS);
    Serial.println( Irms);

    // Store values in arrays
    Voltage_RMS_arr[dataIndex] = Voltage_RMS;
    AmpsRMS_arr[dataIndex] = Irms;
    dataIndex++;

    // Check if we have reached the maximum number of data points
    if (dataIndex >= MAX_DATA_POINTS) {
      // If yes, reset the index and send the arrays to the database
      dataIndex = 0;
      if (Firebase.ready() && signupOK) {
      for (int i = 0; i < MAX_DATA_POINTS; i++) {
        // Create unique data paths for each value using the index
        String voltagePath = "Sensor/Volatge/" + String(i);
        String ampPath = "Sensor/Amp/" + String(i);

        // Send Voltage_RMS and AmpsRMS values to the database
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

        // Introduce a small delay to avoid overwhelming the database
        delay(100);
      }
    }
   }
   }
   else {
    connectToWiFi();
    digitalWrite(LED_PIN, LOW);
   }
}
