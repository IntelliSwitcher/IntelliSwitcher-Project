#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include "EmonLib.h" //Include Emon Library

#define WIFI_SSID "Add your SSID"
#define WIFI_PASSWORD "ADD you password"
#define API_KEY "API KEY"
#define DATABASE_URL "DATABASE URL"
#define VOLT_CAL 258.7 //We have to Calibrate this
#define MAX_DATA_POINTS 5 // Number of data points to store

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

EnergyMonitor emon1;
const int sensorIn = 36;
int mVperAmp = 66; // use 100 for 20A Module and 66 for 30A Module
double Voltage = 0;
double VRMS = 0;
double AmpsRMS = 0;
float Voltage_RMS_arr[MAX_DATA_POINTS];
float AmpsRMS_arr[MAX_DATA_POINTS];
int dataIndex = 0;

unsigned long sendDataPrevMillis=0;
bool signupOK=false;

float getVPP(){
  float result;
  int readValue; //value read from the sensor
  int maxValue = 0; // store max value here
  int minValue = 1024; // store min value here

  uint32_t start_time = millis();
  while((millis()-start_time) < 3000){ //sample for 3 Sec
    readValue = analogRead(sensorIn);
    // see if you have a new maxValue
    if (readValue > maxValue){
      /*record the maximum sensor value*/
      maxValue = readValue;
    }
    if (readValue < minValue){
      /*record the minimum sensor value*/
      minValue = readValue;
    }
  }
  // Subtract min from max
  result = ((maxValue-minValue) * 5.0)/1024.0;
  return result;
}


void setup(){
  Serial.begin(115200);
  emon1.voltage(35, VOLT_CAL, 1.7);
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
  Voltage = getVPP();
  VRMS = (Voltage / 2.0) * 0.707; // root 2 is 0.707
  AmpsRMS = (VRMS * 1000) / mVperAmp;

  // Store values in arrays
  Voltage_RMS_arr[dataIndex] = Voltage_RMS;
  AmpsRMS_arr[dataIndex] = AmpsRMS;
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


