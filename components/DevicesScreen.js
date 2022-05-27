import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import NavigationMenu from "./tools/NavigationMenu";

export default function DevicesScreen({ navigation }) {
  const [name_device, set_name_device] = useState("");
  const [secret_device, set_secret_device] = useState("");
  const [machinbe_id, set_machinbe_id] = useState(null);
  const [loading, set_loading] = useState(false);

  const save_device = () => {
    console.log("OEOEO")
    set_loading(true);
    fetch("https://rksmc4.deta.dev/create_device/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name_device,
        secret: secret_device,
        machines_id: machinbe_id,
      }),
    }).then((response) => {
      set_loading(false);
      if (response.status === 200) {
        Alert.alert("Se Guardo el  con exito");
        set_machinbe_id(null);
        set_name_device("")
        set_secret_device("")
      } else {
        Alert.alert("Error");
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <NavigationMenu></NavigationMenu>
      <Pressable
        style={styles.container_form}
        onPress={() => Keyboard.dismiss()}
      >
        <Text style={styles.title_form}>Dispositivos</Text>
        <View style={styles.row_form}>
          <Text style={styles.title_form}>Nombre :</Text>
          <TextInput
            style={styles.input_form}
            onChangeText={set_name_device}
            value={name_device}
            placeholder={"Nombre del dispositivo"}
          ></TextInput>
        </View>
        <View style={styles.row_form}>
          <Text style={styles.title_form}>Secret :</Text>
          <TextInput
            style={styles.input_form}
            onChangeText={set_secret_device}
            value={secret_device}
            secureTextEntry={true}
            placeholder={"Secret"}
          ></TextInput>
        </View>
        <View style={styles.row_form}>
          <Text style={styles.title_form}>id Maquina :</Text>
          <TextInput
            style={styles.input_form}
            onChangeText={set_machinbe_id}
            value={machinbe_id}
            keyboardType="numeric"
          ></TextInput>
        </View>
        {/* <Button
        title="Press me"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      /> */}
        <Pressable style={styles.button_form} onPress={save_device}>
          {loading ? (
            <ActivityIndicator
              animating={true}
              size="large"
              style={{ opacity: 1 }}
              color="white"
            ></ActivityIndicator>
          ) : (
            <Text style={styles.button_text_form}>Guardar</Text>
          )}
        </Pressable>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container_form: {
    width: 300,
    height: "50%",
    backgroundColor: "gray",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  row_form: {
    width: "95%",
    height: 30,
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title_form: {
    fontSize: 18,
    color: "white",
    width: 100,
  },
  input_form: {
    width: 150,
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
  },
  button_form: {
    width: "80%",
    height: 50,
    backgroundColor: "black",
    marginTop: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  button_text_form: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});
