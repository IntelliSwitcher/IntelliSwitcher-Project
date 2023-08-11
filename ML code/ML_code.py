import threading
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow import keras
from keras.models import Sequential
from keras.layers import Dense, LSTM
from keras_tuner.tuners import RandomSearch
import xgboost as xgb
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error

# Define functions to train the models
def train_model_task1():
    # # Load your dataset for Task 1 (replace with your data loading code)
    data_task1 = pd.read_csv('task1_data.csv')

    # Split data into features (X) and target (y)
    X_task1 = data_task1.drop(['units_consumed'], axis=1)
    y_task1 = data_task1['units_consumed']

    # Save the column names for later use
    feature_names_task1 = X_task1.columns.tolist()

    # Split data into training and testing sets
    X_train_task1, X_test_task1, y_train_task1, y_test_task1 = train_test_split(X_task1, y_task1, test_size=0.2, random_state=42)

    # Standardize features
    scaler_task1 = StandardScaler()
    X_train_scaled_task1 = scaler_task1.fit_transform(X_train_task1)
    X_test_scaled_task1 = scaler_task1.transform(X_test_task1)

    # Build the first model
    global model_task1
    model_task1 = Sequential()
    model_task1.add(Dense(64, activation='relu', input_dim=X_train_scaled_task1.shape[1]))
    model_task1.add(Dense(32, activation='relu'))
    model_task1.add(Dense(1))

    # Compile the model
    model_task1.compile(optimizer='adam', loss='mean_squared_error')

    # Train the model
    model_task1.fit(X_train_scaled_task1, y_train_task1, epochs=5, batch_size=32, validation_split=0.2,verbose=1)
    model_task1.evaluate(X_test_scaled_task1,y_test_task1, batch_size=32,verbose=1)
    model_task1.save('model_task2.keras')
    print("\nask 1: Model trained and saved")
    return model_task1

def train_model_task2():
    # # Load your dataset for Task 2 (replace with your data loading code)
    data_task2 = pd.read_csv('task2_data.csv')

    # Split data into features (X) and target (y)
    X_task2 = data_task2.drop(['units_consumed'], axis=1)
    y_task2 = data_task2['units_consumed']

    # Split data into training and testing sets
    X_train_task2, X_test_task2, y_train_task2, y_test_task2 = train_test_split(X_task2, y_task2, test_size=0.2, random_state=42)

    # Standardize features
    scaler_task2 = StandardScaler()
    X_train_scaled_task2 = scaler_task2.fit_transform(X_train_task2)
    X_test_scaled_task2 = scaler_task2.transform(X_test_task2)

    # Build the second model
    global model_task2
    model_task2 = Sequential()
    model_task2.add(Dense(64, activation='relu', input_dim=X_train_scaled_task2.shape[1]))
    model_task2.add(Dense(32, activation='relu'))
    model_task2.add(Dense(1))

    # Compile the model
    model_task2.compile(optimizer='adam', loss='mean_squared_error')

    # Train the model
    model_task2.fit(X_train_scaled_task2 , y_train_task2, epochs=5, batch_size=32, validation_split=0.2,verbose=1)
    model_task2.evaluate(X_test_scaled_task2,y_test_task2, batch_size=32,verbose=1)
    
    model_task2.save('model_task2.keras')
    print("\nTask 2: Model trained and saved")
    return model_task2

# Create threads for each task
thread_task1 = threading.Thread(target=train_model_task1)
thread_task2 = threading.Thread(target=train_model_task2)

# Start the threads
thread_task1.start()
thread_task2.start()

# Wait for both threads to finish
thread_task1.join()
thread_task2.join()
print("Both training tasks completed")


#  Load and preprocess new data for prediction
new_data_task1 = pd.read_csv('test1_data.csv')

# Standardize features using the same scaler used during training
scaler_task1 = StandardScaler()
new_data_scaled_task1 = scaler_task1.fit_transform(new_data_task1)

# Make predictions
predicted_units_consumed_task1 = model_task1.predict(new_data_scaled_task1)

print("Predicted Units Consumed (Task 1):", predicted_units_consumed_task1)

#  Load and preprocess new data for prediction
new_data_task2 = pd.read_csv('test2_data.csv')

# Standardize features using the same scaler used during training
scaler_task2 = StandardScaler()
# Standardize features using the same scaler used during training
new_data_scaled_task2 = scaler_task2.fit_transform(new_data_task2)

# Make predictions
predicted_units_consumed_task2 = model_task2.predict(new_data_scaled_task2)

print("Predicted Units Consumed (Task 2):", predicted_units_consumed_task2)

print("Both tasks completed")
