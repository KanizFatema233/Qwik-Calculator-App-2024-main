// WallpaperCalculator.js
import React, { useState,useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Wallpaper = ({ navigation }) => {
  // State for the Category dropdown
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("Wallpaper");
  const [categoryItems, setCategoryItems] = useState([
    { label: "Wallpaper", value: "Wallpaper" },
    { label: "Paint Work", value: "Paint Work" },
    { label: "Plaster Work", value: "Plaster Work" },
  ]);
  useEffect(() => {
    if (categoryValue === "Paint Work") {
      navigation.navigate("Paint Work");
    }
  }, [categoryValue]);
  // State for input fields
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [roomHeight, setRoomHeight] = useState("");
  const [numDoors, setNumDoors] = useState("");
  const [doorWidth, setDoorWidth] = useState("");
  const [doorHeight, setDoorHeight] = useState("");
  const [numWindows, setNumWindows] = useState("");
  const [windowWidth, setWindowWidth] = useState("");
  const [windowHeight, setWindowHeight] = useState("");
  const [rollLength, setRollLength] = useState("");
  const [rollWidth, setRollWidth] = useState("");
  const [patternRepeat, setPatternRepeat] = useState("");
  const [rollCost, setRollCost] = useState("");
  const [result, setResult] = useState(null);

  const handleReset = () => {
    setRoomLength("");
    setRoomWidth("");
    setRoomHeight("");
    setNumDoors("");
    setDoorWidth("");
    setDoorHeight("");
    setNumWindows("");
    setWindowWidth("");
    setWindowHeight("");
    setRollLength("");
    setRollWidth("");
    setPatternRepeat("");
    setRollCost("");
    setResult(null);
  };

  const handleCalculate = () => {
    const L = parseFloat(roomLength);
    const W = parseFloat(roomWidth);
    const H = parseFloat(roomHeight);
    const noOfDoors = parseInt(numDoors, 10);
    const doorW = parseFloat(doorWidth);
    const doorH = parseFloat(doorHeight);
    const noOfWindows = parseInt(numWindows, 10);
    const windowW = parseFloat(windowWidth);
    const windowH = parseFloat(windowHeight);
    const rollL = parseFloat(rollLength);
    const rollW = parseFloat(rollWidth);
    const patternR = parseFloat(patternRepeat);
    const costPerRoll = parseFloat(rollCost);

    if (
      !isNaN(L) &&
      !isNaN(W) &&
      !isNaN(H) &&
      !isNaN(noOfDoors) &&
      !isNaN(doorW) &&
      !isNaN(doorH) &&
      !isNaN(noOfWindows) &&
      !isNaN(windowW) &&
      !isNaN(windowH) &&
      !isNaN(rollL) &&
      !isNaN(rollW) &&
      !isNaN(patternR) &&
      !isNaN(costPerRoll)
    ) {
      const totalSurfaceArea = 2 * (L * H + W * H);
      const totalDoorArea = doorW * doorH * noOfDoors;
      const totalWindowArea = windowW * windowH * noOfWindows;
      const adjustedRoomArea =
        totalSurfaceArea - totalDoorArea - totalWindowArea;
      const adjustedHeight = H + patternR;
      const numRolls = Math.ceil(adjustedRoomArea / (rollL * rollW));
      const totalCost = numRolls * costPerRoll;

      setResult({
        adjustedRoomArea: adjustedRoomArea.toFixed(2),
        adjustedHeight: adjustedHeight.toFixed(2),
        numRolls: numRolls,
        totalCost: totalCost.toFixed(2),
      });
    } else {
      setResult(null);
    }
  };

  return (
    <View style={styles.TopContainer}>
      <ScrollView style={styles.container}>
        <Image
          source={require("../../assets/wallpaper.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View
          style={[
            styles.dropdownContainer,
            {
              marginTop: 5,
              paddingHorizontal: 16,
              paddingTop: 10,
              paddingBottom: 20,
              borderRadius: 10,
              backgroundColor: "#f1ece9",
              zIndex: 5000,
            },
          ]}
        >
          <Text style={{ fontSize: 14 }}>Category</Text>
          <DropDownPicker
            open={categoryOpen}
            value={categoryValue}
            items={categoryItems}
            setOpen={setCategoryOpen}
            setValue={setCategoryValue}
            setItems={setCategoryItems}
            placeholder="Select category"
            containerStyle={styles.dropdown}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Room Dimension</Text>
          <TextInput
            style={styles.input}
            placeholder="Room Length (m)"
            keyboardType="numeric"
            value={roomLength}
            onChangeText={setRoomLength}
          />
          <TextInput
            style={styles.input}
            placeholder="Room Width (m)"
            keyboardType="numeric"
            value={roomWidth}
            onChangeText={setRoomWidth}
          />
          <TextInput
            style={styles.input}
            placeholder="Room Height (m)"
            keyboardType="numeric"
            value={roomHeight}
            onChangeText={setRoomHeight}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Door Dimension</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of Doors"
            keyboardType="numeric"
            value={numDoors}
            onChangeText={setNumDoors}
          />
          <TextInput
            style={styles.input}
            placeholder="Door Width (m)"
            keyboardType="numeric"
            value={doorWidth}
            onChangeText={setDoorWidth}
          />
          <TextInput
            style={styles.input}
            placeholder="Door Height (m)"
            keyboardType="numeric"
            value={doorHeight}
            onChangeText={setDoorHeight}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Window Dimension</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of Windows"
            keyboardType="numeric"
            value={numWindows}
            onChangeText={setNumWindows}
          />
          <TextInput
            style={styles.input}
            placeholder="Window Width (m)"
            keyboardType="numeric"
            value={windowWidth}
            onChangeText={setWindowWidth}
          />
          <TextInput
            style={styles.input}
            placeholder="Window Height (m)"
            keyboardType="numeric"
            value={windowHeight}
            onChangeText={setWindowHeight}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Wallpaper</Text>
          <TextInput
            style={styles.input}
            placeholder="Roll Length (m)"
            keyboardType="numeric"
            value={rollLength}
            onChangeText={setRollLength}
          />
          <TextInput
            style={styles.input}
            placeholder="Roll Width (m)"
            keyboardType="numeric"
            value={rollWidth}
            onChangeText={setRollWidth}
          />
          <TextInput
            style={styles.input}
            placeholder="Pattern Repeat (m)"
            keyboardType="numeric"
            value={patternRepeat}
            onChangeText={setPatternRepeat}
          />
          <TextInput
            style={styles.input}
            placeholder="Cost per Roll ($)"
            keyboardType="numeric"
            value={rollCost}
            onChangeText={setRollCost}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCalculate}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </View>
        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Adjusted Room Area: {result.adjustedRoomArea} m²
            </Text>
            <Text style={styles.resultText}>
              Adjusted Height: {result.adjustedHeight} m
            </Text>
            <Text style={styles.resultText}>
              Number of Rolls: {result.numRolls}
            </Text>
            <Text style={styles.resultText}>
              Total Cost: ${result.totalCost}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  TopContainer: {
    flex: 1,
    backgroundColor: "#fff7f2",
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f1ece9",
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdown: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#5B3E2E",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Wallpaper;
