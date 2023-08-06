#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include "EmonLib.h" //Include Emon Library

#define WIFI_SSID "Your SSID"
#define WIFI_PASSWORD "Password"
#define API_KEY "API key"
#define DATABASE_URL "Database URL"
#define VOLT_CAL 106.8 //We have to Calibrate this
#define MAX_DATA_POINTS 5 // Number of data points to store

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

EnergyMonitor emon1;
EnergyMonitor emon2;

double Voltage = 0;
double VRMS = 0;
float Voltage_RMS_arr[MAX_DATA_POINTS];
float AmpsRMS_arr[MAX_DATA_POINTS];
int dataIndex = 0;

unsigned long sendDataPrevMillis=0;
bool signupOK=false;



void setup(){
  Serial.begin(115200);
  emon1.voltage(35, VOLT_CAL, 1.7);
  emon2.current(34,0.52);
  WiFi.begin(WIFI_SSID,WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while(WiFi.status() !=WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

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

void loop() {
  // Calculation Part
  // Volatge RMS
  emon1.calcVI(20, 2000);
  float Voltage_RMS = emon1.Vrms;
  // Current RMS
  double Irms = emon2.calcIrms(1480);
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

  // Delay to wait for next iteration
  delay(1000); // You can adjust this delay based on your requirements
}


