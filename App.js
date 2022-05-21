import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import StartScreen from "./components/StartScreen"
import SecondScreen from "./components/SecondScreen"
import ThirdScreen from "./components/ThirdScreen"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="start" component={StartScreen}></Stack.Screen>
        <Stack.Screen name="second" component={SecondScreen}></Stack.Screen>
        <Stack.Screen name="third" component={ThirdScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
