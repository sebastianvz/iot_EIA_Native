import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import NavigationMenu from "./tools/NavigationMenu";

export default function MachinesScreen({ navigation }) {
  const [list_machine, setlist_machine] = useState([]);
  const get_machine = () => {
    fetch("https://rksmc4.deta.dev/get_machine/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json_response) => {
          setlist_machine(json_response["result"]);
          return false;
        });
      } else {
        Alert.alert("fallo");
      }
    });
  };
  useEffect(() => {
    get_machine();
  }, []);
  return (
    <View style={styles.container}>
      <NavigationMenu></NavigationMenu>
      <View style={styles.container_machines}>
        {list_machine.map((item, index) => {
          return (
            <Text style={styles.text_machines} key={index}>
              - {item.machine_name}
            </Text>
          );
        })}
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
  container_machines: {
    width: 300,
    height: "auto",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  text_machines: {
    fontSize: 25,
    color: "white",
  },
});