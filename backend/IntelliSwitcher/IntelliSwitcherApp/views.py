# views.py

from django.shortcuts import render

def view_name(request):
    return render(request, 'IntelliSwitcherApp.html', {})

##########################################################
import pyrebase
import os

config = {
    "apiKey": "KEY",
    "authDomain": "project_name-id.firebaseapp.com",
    "projectId": "project_name-id",
    "storageBucket": "project_name-id.appspot.com",
    "messagingSenderId": "msg_sender_id",
    "appId": "1:app_id",
    "measurementId": "G-measurement_id",
    "databaseURL": ""
}

# Initialize Firebase Connection to storage

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()

#############################################################

from django.http import JsonResponse
from .models import SensorData
import firebase_admin
from firebase_admin import credentials, db

# Initialize Firebase Admin SDK with your private key file
cred = credentials.Certificate("path/to/your/private_key.json")
firebase_admin.initialize_app(cred, {'databaseURL': 'https://your-firebase-project.firebaseio.com/'})

def store_data_to_firebase(request):
    if request.method == 'POST':
        # Get data sent from ESP32
        voltage = float(request.POST.get('voltage'))
        current = float(request.POST.get('current'))

        # Save data to Django database
        SensorData.objects.create(voltage=voltage, current=current)

        # Save data to Firebase
        ref = db.reference('/sensor_data')
        ref.push({'voltage': voltage, 'current': current})

        return JsonResponse({"message": "Data stored in Firebase successfully!"})
    else:
        return JsonResponse({"error": "Invalid request method."})

def fetch_data_from_firebase(request):
    if request.method == 'GET':
        # Fetch data from Firebase
        ref = db.reference('/sensor_data')
        data_from_firebase = ref.get()

        return JsonResponse(data_from_firebase)
    else:
        return JsonResponse({"error": "Invalid request method."})

#################################################################

# create more views below if needed
