import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const DonutChart = (props) => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const expired = props.usage;
  const nonExpired = props.usageIn;
  const total = expired + nonExpired;

  const data = [];

  for (let i = 1; i <= expired; i++) {
    data.push({
      color: props.usageColor,
    });
  }

  for (let i = 1; i <= nonExpired; i++) {
    data.push({ color: props.usageInColor });
  }

  const percentage = (1 / total) * 100;
  const strokeDashoffset =
    circleCircumference + (circleCircumference * percentage) / 100;

  const angle = (1 / total) * 360;
  const sliceSpacing = total === 1 ? 0 : 4;

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height={props.size} width={props.size} viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            {total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="40"
              />
            ) : (
              data.map((element, index) => (
                <Circle
                  key={index}
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={element.color}
                  fill="transparent"
                  strokeWidth="10"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={strokeDashoffset + sliceSpacing}
                  rotation={angle * index}
                  originX="90"
                  originY="90"
                />
              ))
            )}
          </G>
        </Svg>
        <View style={styles.label}>{props.children}</View>
      </View>
    </View>
  );
};

export default DonutChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 24,
    color: "#082032",
  },
});
