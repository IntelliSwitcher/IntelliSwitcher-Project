# urls.py in App

from django.contrib import admin
from django.urls import path, include
from views import store_data_to_firebase, fetch_data_from_firebase

urlpatterns = [
    path('store_data/', views.store_data_to_firebase, name='store_data'),
    path('fetch_data/', views.fetch_data_from_firebase, name='fetch_data'),
]

