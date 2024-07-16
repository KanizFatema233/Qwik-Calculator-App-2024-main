import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const PaintWork = ({ navigation }) => {
  // State for the Category dropdown
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("Paint Work");
  const [categoryItems, setCategoryItems] = useState([
    { label: "Paint Work", value: "Paint Work" },
    { label: "PlasterWork", value: "PlasterWork" },
    { label: "Wallpaper", value: "Wallpaper" },
  ]);

  useEffect(() => {
    if (categoryValue === "Wallpaper") {
      navigation.navigate("Wallpaper");
    } else if (categoryValue === "PlasterWork") {
      navigation.navigate("PlasterWork");
    }
  }, [categoryValue]);

  // State for the input fields
  const [roomHeight, setRoomHeight] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [noOfDoors, setNoOfDoors] = useState("");
  const [doorWidth, setDoorWidth] = useState("");
  const [doorHeight, setDoorHeight] = useState("");
  const [noOfWindows, setNoOfWindows] = useState("");
  const [windowWidth, setWindowWidth] = useState("");
  const [windowHeight, setWindowHeight] = useState("");
  const [noOfCoats, setNoOfCoats] = useState("");
  const [areaPerLiter, setAreaPerLiter] = useState("");
  const [paintPrice, setPaintPrice] = useState("");

  // State for the calculation result
  const [result, setResult] = useState(null);

  const handleReset = () => {
    setRoomHeight("");
    setRoomWidth("");
    setNoOfDoors("");
    setDoorWidth("");
    setDoorHeight("");
    setNoOfWindows("");
    setWindowWidth("");
    setWindowHeight("");
    setNoOfCoats("");
    setAreaPerLiter("");
    setPaintPrice("");
    setResult(null);
  };

  const handleCalculate = () => {
    const L = parseFloat(roomHeight);
    const W = parseFloat(roomWidth);
    const H = parseFloat(roomHeight);
    const No_doors = parseInt(noOfDoors);
    const Door_Height = parseFloat(doorHeight);
    const Door_Width = parseFloat(doorWidth);
    const No_windows = parseInt(noOfWindows);
    const Window_Height = parseFloat(windowHeight);
    const Window_Width = parseFloat(windowWidth);
    const N_coats = parseInt(noOfCoats);
    const A_covered = parseFloat(areaPerLiter);
    const P_price = parseFloat(paintPrice);

    const Total_room_wall_area = 2 * (L * H + W * H);
    const Total_door_area = Door_Height * Door_Width * No_doors;
    const Total_window_area = Window_Height * Window_Width * No_windows;
    const Total_paint_area = Total_room_wall_area - Total_door_area - Total_window_area;
    const Volume_paint_needed = (Total_paint_area * N_coats) / A_covered;
    const Total_cost = Volume_paint_needed * P_price;

    const result = {
      totalPaintArea: Total_paint_area.toFixed(2),
      volumePaintNeeded: Volume_paint_needed.toFixed(2),
      totalCost: Total_cost.toFixed(2),
    };

    setResult(result);
  };

  return (
    <View style={styles.TopContainer}>
      <View style={[styles.navbar, { flexDirection: "row" }]}>
        <Pressable
          activeOpacity={4}
          style={{
            width: "5%",
            height: 25,
            left: 15,
            top: 17,
            borderWidth: 0,
          }}
        ></Pressable>

        <View
          style={{
            width: "50%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            left: 10,
          }}
        >
          <Text
            style={{
              left: 10,
              top: 17,
              color: "#000000",
              fontSize: 14,
              letterSpacing: 0.9,
              fontFamily: "Poppins_400Regular",
            }}
          >
            {" "}
            Paint Work{" "}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.container}>
        <Image
          source={require("../../assets/Rectangle 4144.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <View
          style={[
            styles.dropdownContainer,
            {
              marginTop: 20,
              paddingHorizontal: 16,
              paddingTop: 12,
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
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Room Height</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={roomHeight}
            onChangeText={setRoomHeight}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Room Width</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={roomWidth}
            onChangeText={setRoomWidth}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>No of doors</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={noOfDoors}
            onChangeText={setNoOfDoors}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Door Width</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={doorWidth}
            onChangeText={setDoorWidth}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Door Height</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={doorHeight}
            onChangeText={setDoorHeight}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>No of windows</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={noOfWindows}
            onChangeText={setNoOfWindows}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Window Width</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={windowWidth}
            onChangeText={setWindowWidth}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Window Height</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={windowHeight}
            onChangeText={setWindowHeight}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>No of coats</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={noOfCoats}
            onChangeText={setNoOfCoats}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Area per Liter</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={areaPerLiter}
            onChangeText={setAreaPerLiter}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Paint Price per Liter</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={paintPrice}
            onChangeText={setPaintPrice}
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
          <View style={styles.tableContainer}>
            <Text style={styles.tableTitle}>Calculation Result</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Materials</Text>
                <Text style={styles.tableCell}>Unit</Text>
                <Text style={styles.tableCell}>Quantity</Text>
              
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Total paint area</Text>
                <Text style={styles.tableCell}>m2</Text>
                <Text style={styles.tableCell}>{result.totalPaintArea}</Text>
            
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Volume of paint needed</Text>
                <Text style={styles.tableCell}>litre</Text>
                <Text style={styles.tableCell}>{result.volumePaintNeeded}</Text>
                
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Total Cost</Text>
                <Text style={styles.tableCell}>BDT</Text>
                
                <Text style={styles.tableCell}>{result.totalCost}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  TopContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff7f2",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  image: {
    width: "50%",
    alignSelf: "center",
  },

  dropdownContainer: {},

  dropdown: {
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  inputLabel: {
    flex: 0.5,
    fontSize: 14,
    marginRight: 10,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 30,
  },

  button: {
    flex: 1,
    backgroundColor: "#86563B",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 13,
  },

  tableContainer: {
    marginTop: 20,
  },

  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  table: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 30,
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },

  tableCell: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: "center",
  },

  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },

  navbar: {
    backgroundColor: "#FFF7F0",
    width: "100%",
    height: 55,
    shadowColor: "#000",
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,
  },
});

export default PaintWork;
