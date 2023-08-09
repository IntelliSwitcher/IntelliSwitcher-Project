package com.thirdapp;


import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import androidx.appcompat.app.AppCompatActivity;

public class WelcomeScreenActivity extends AppCompatActivity {

    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcomescreen);

        mAuth = FirebaseAuth.getInstance();

        TextView welcomeText = findViewById(R.id.welcomeText);
        TextView userNameText = findViewById(R.id.userNameText);
        Button startButton = findViewById(R.id.startButton);

        FirebaseUser user = mAuth.getCurrentUser();
        if (user != null) {
            String username = user.getDisplayName();
            welcomeText.setText("Welcome to IntelliSwitcher");
            userNameText.setText("Hi " + username + "!");
        }

        startButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Start the ChooseMonitoredAreaActivity (next activity)
                Intent intent = new Intent(WelcomeScreenActivity.this, ChooseMonitoredAreaActivity.class);
                startActivity(intent);
                finish(); // Close the WelcomeScreenActivity
            }
        });


    }
}
