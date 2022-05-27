import React, { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import NavigationMenu from "./tools/NavigationMenu";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {

 /*  var mqtt = require("mqtt");
  var options = {
    protocol: "mqtts",
    clientId: "User1",
    username: "smart",
    password: "FzSjl27L9Ac9VVlk",
  };

  const [current_val, setcurrent] = useState("");
  const [voltage_val, setvoltage_val] = useState("");
  // Real time graph
  const [current_graph, setcurrent_graph] = useState([{ id: 0, value: 0 }]);

  let currentref = useRef("");
  currentref.current = current_val;
  useEffect(() => {
    var client = mqtt.connect("mqtt://smart.cloud.shiftr.io", options);
    client.subscribe("Termofijadora01/fase3/#");
    var note;
    client.on("message", function (topic, message) {
      note = message.toString();
      if (topic === "Termofijadora01/fase3/corriente") {
        console.log("corriente", note);
        cont = cont + 1;
        setcurrent_graph((current_graph) => [
          ...current_graph,
          { id: cont, value: note },
        ]);
        setcurrent(note);
      } else if (topic === "Termofijadora01/fase3/voltaje") {
        setvoltage_val(note);
        console.log("voltaje", note);
      }
      if (currentref.current === "") {
        client.end();
      }
    });
  }, []); */

  return (
    <View style={styles.container}>
      <NavigationMenu></NavigationMenu>
      <View style={styles.card_info}>
        <Text style={styles.text_info}>Corriente</Text>
        <View style={styles.line_separator}></View>
        <View style={styles.row_card}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={90}
            color="white"
          />
          <Text style={styles.text_info}>20</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  card_info: {
    width: "80%",
    height: 200,
    backgroundColor: "black",
    borderRadius: 20,
    marginTop: 100,
    display: "flex",
    alignItems: "center",
  },
  text_info: {
    fontSize: 30,
    color: "white",
  },
  row_card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 35,
  },
  line_separator: {
    backgroundColor: "white",
    height: 2,
    width: "80%",
  },
});
