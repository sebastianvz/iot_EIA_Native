import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Animated,
} from "react-native";
import NavigationMenu from "./tools/NavigationMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";

var mqtt = require("@taoqf/react-native-mqtt");
var options = {
  protocol: "mqtts",
  clientId: "User1", //name of sub
  username: "iottest45",
  password: "nFkl77W5JqpvzAXg",
};

export default function ControlScreen({ navigation }) {
  const [press, setPress] = useState(false);
  const [rigthAnimation, setrigthAnimation] = useState(new Animated.Value(0));

  const control_led = () => {
    setPress(!press);
    startAnimation(press ? 0 : 1);
    var client = mqtt.connect("mqtt://iottest45.cloud.shiftr.io", options);
    client.on("connect", function () {
      client.subscribe("led", function (err) {
        if (!err) {
          if (press) {
            client.publish("led", "OFF", { qos: 0, retain: true });
          } else {
            client.publish("led", "ON", { qos: 0, retain: true });
          }
        }
      });
    });

    client.on("message", function (topic, message) {
      console.log(message.toString());
      client.end();
    });
  };

  const startAnimation = (value) => {
    Animated.timing(rigthAnimation, {
      toValue: value === 1 ? 75 : -2,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    right: {
      transform: [{ translateX: rigthAnimation }],
    },
  };

  useEffect(() => {
    var client = mqtt.connect("mqtt://iottest45.cloud.shiftr.io", options);
    client.subscribe("led");
    var note;
    client.on("message", function (topic, message) {
      note = message.toString();
      if (message == "ON") {
        setPress(true);
        startAnimation(1);
      } else {
        setPress(false);
        startAnimation(0);
      }
      client.end();
    });
  }, []);

  return (
    <View style={styles.container}>
      <NavigationMenu></NavigationMenu>
      <View style={styles.container_buttons}>
        <Pressable style={styles.button} onPress={control_led}>
          <Animated.View
            style={[styles.circle, animatedStyle.right]}
          ></Animated.View>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={35}
            color="white"
          />
          <MaterialCommunityIcons
            name="lightbulb-outline"
            size={35}
            color="white"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    backgroundColor: "gray",
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 2,
  },
  circle_rigth: {
    position: "absolute",
    backgroundColor: "gray",
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 2,
    transform: [{ translateX: 75 }],
  },
  container_buttons: {
    width: 300,
    height: "auto",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: "black",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
