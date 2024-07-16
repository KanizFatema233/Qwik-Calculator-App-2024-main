import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import HomePage from "./App/screens/homepage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from '@expo/vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from "./App/screens/Settings";
import Currency from "./App/screens/Currency";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_100Thin,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,



} from '@expo-google-fonts/poppins';
import AluminumWeight from "./App/screens/aluminumweight";
//import SettingsPage from "./App/screens/Settings";
import PaintWork from "./App/screens/paintwork";
import Wallpaper from "./App/screens/wallpaper";
import PlasterWork from "./App/screens/plasterwork";
import ConcreteSlab from "./App/screens/ConcreteSlab";
import CementCalculator from "./App/screens/CementCalculator";

const logoImage = require("./assets/round.png");

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_100Thin,
    // Poppins_100ExtraLight ,
    // Poppins_100Light,
    Poppins_500Medium,
    // Poppins_600SemiBold,
    Poppins_700Bold,
    // Poppins_800ExtraBold,
    Poppins_900Black,
  });

  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#701F21",
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 4,
        },
        headerTitleStyle: {
          fontSize: 14,
          letterSpacing: 0.9,
          fontFamily: "Poppins_500Medium",
        },
        headerStyle: {
          backgroundColor: "#FFF7F0",
          shadowColor: "#000",
          shadowOffset: { width: 1.5, height: 1.5 },
          shadowOpacity: 0.8,
          shadowRadius: 5,
          elevation: 6,
        },
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={22} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  const StackNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: "#000000",
        headerTitle: "",
        headerTransparent: true,
        headerLeftContainerStyle: {
          paddingLeft: 0,
        },
      }}
    >
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerLeft: () => null }}
      />

      <Stack.Screen name="Aluminum" component={AluminumWeight} />
      <Stack.Screen name="Paint Work" component={PaintWork} />
      <Stack.Screen name="Wallpaper" component={Wallpaper} />
      <Stack.Screen name="PlasterWork" component={PlasterWork} />
      <Stack.Screen name="ConcreteSlab" component={ConcreteSlab} />
      <Stack.Screen name="CementCalculator" component={CementCalculator} />
  
      <Stack.Screen name="Currency" component={Currency} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
