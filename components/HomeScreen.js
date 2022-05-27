import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView } from "react-native";
import NavigationMenu from "./tools/NavigationMenu";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

export default function HomeScreen({ navigation }) {
  var mqtt = require("@taoqf/react-native-mqtt");
  var options = {
    protocol: "mqtts",
    clientId: "User1", //name of sub
    username: "iottest45",
    password: "nFkl77W5JqpvzAXg",
  };
  var cont = 0;

  const [current_val, setcurrent] = useState("");
  const [voltage_val, setvoltage_val] = useState("");
  // Real time graph
  const [current_graph, setcurrent_graph] = useState([0]);
  const [label, setlabel] = useState([0]);

  let currentref = useRef("");
  currentref.current = current_val;
  useEffect(() => {
    var client = mqtt.connect("mqtt://iottest45.cloud.shiftr.io", options);
    client.subscribe("Termofijadora01/fase1/#");
    var note;
    client.on("message", function (topic, message) {
      note = message.toString();
      if (topic === "Termofijadora01/fase1/corriente") {
        console.log("corriente", note);
        cont = cont + 1;
        setlabel((label) => [...label, cont]);
        setcurrent_graph((current_graph) => [...current_graph, note]);
        setcurrent(note);
      } else if (topic === "Termofijadora01/fase1/voltaje") {
        setvoltage_val(note);
        console.log("voltaje", note);
      }
      if (currentref.current === "") {
        //client.end();
      }
    });
  }, []);

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
          <Text style={styles.text_info}>{current_val}</Text>
        </View>
      </View>
      <View style={styles.card_info}>
        <Text style={styles.text_info}>Voltaje</Text>
        <View style={styles.line_separator}></View>
        <View style={styles.row_card}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={90}
            color="white"
          />
          <Text style={styles.text_info}>{voltage_val}</Text>
        </View>
      </View>
      <LineChart
         data={{
           labels: label,
           datasets: [
             {
               data: current_graph,
             },
           ],
         }}
         width={screenWidth} // from react-native
         height={220}
         yAxisLabel=""
         yAxisInterval={1} // optional, defaults to 1
         chartConfig={{
           backgroundColor: "#e26a00",
           backgroundGradientFrom: "#fb8c00",
           backgroundGradientTo: "#ffa726",
           decimalPlaces: 2, // optional, defaults to 2dp
           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
           labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
           style: {
             borderRadius: 16,
           },
           propsForDots: {
             r: "6",
             strokeWidth: "2",
             stroke: "#ffa726",
           },
         }}
         bezier
         style={{
           marginVertical: 8,
           borderRadius: 16,
         }}
       ></LineChart>
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
