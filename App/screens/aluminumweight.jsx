// AluminumWeight.js
import React, { useState } from "react";
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

const AluminumWeight = ({ navigation }) => {
  // State for the Category dropdown
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("Aluminum Weight");
  const [categoryItems, setCategoryItems] = useState([
    { label: "Aluminum Weight", value: "Aluminum Weight" },
    { label: "Drywall", value: "Drywall" },
  ]);

  // State for the Alloy dropdown
  const [alloyOpen, setAlloyOpen] = useState(false);
  const [alloyValue, setAlloyValue] = useState("Aluminum");
  const [alloyItems, setAlloyItems] = useState([
    { label: "Aluminum (average)", value: "Aluminum" },
    { label: "Melted Aluminum", value: "Melted Aluminum" },
  ]);

  // State for the Shape dropdown
  const [shapeOpen, setShapeOpen] = useState(false);
  const [shapeValue, setShapeValue] = useState("Rectangular prism");
  const [shapeItems, setShapeItems] = useState([
    { label: "Rectangular prism (plate)", value: "Rectangular prism" },
    { label: "Circular prism", value: "Circular prism" },
  ]);

  // State for the Unit dropdown
  const [unitOpen, setUnitOpen] = useState(false);
  const [unitValue, setUnitValue] = useState("meter");
  const [unitItems, setUnitItems] = useState([
    { label: "Meter (m)", value: "meter" },
    { label: "Centimeters (cm)", value: "centimeters" },
  ]);

  // State for the input fields
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [pieces, setPieces] = useState("");

  // State for the calculation result
  const [result, setResult] = useState(null);

  const handleCategorySelect = (itemValue) => {
    setCategoryValue(itemValue);
    if (itemValue === "Drywall") {
      navigation.navigate("Drywall");
    }
  };

  const handleReset = () => {
    setLength("");
    setWidth("");
    setThickness("");
    setPieces("");
    setResult(null);
  };

  const handleCalculate = () => {
    const len = parseFloat(length);
    const wid = parseFloat(width);
    const thk = parseFloat(thickness);
    const pcs = parseInt(pieces, 10);

    if (!isNaN(len) && !isNaN(wid) && !isNaN(thk) && !isNaN(pcs)) {
      let volume = 0;
      if (unitValue === "meter") {
        // Calculate volume in cubic meters
        volume = (len * wid * thk * pcs) / 1000; // cm^3 to m^3
      } else if (unitValue === "centimeters") {
        // Calculate volume in cubic centimeters
        volume = len * wid * thk * pcs;
      }

      setResult({
        materials: alloyValue,
        unit: unitValue,
        quantity: volume.toFixed(2),
      });
    } else {
      setResult(null);
    }
  };

  return (
    <View style={styles.TopContainer}>
      <View style={[styles.navbar, { flexDirection: "row" }]}>
        <Pressable
          activeOpacity={4}
          style={{ width: "5%", height: 25, left: 15, top: 17, borderWidth: 0 }}
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
            Study{" "}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.container}>
        <Image
          source={require("../../assets/Aluminum-Weight-Plate.png")}
          style={styles.image}
          resizeMode="stretch"
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
            setValue={handleCategorySelect}
            setItems={setCategoryItems}
            placeholder="Select category"
            containerStyle={styles.dropdown}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 20,

            borderRadius: 10,
            backgroundColor: "#f1ece9",
            zIndex: 4000,
          }}
        >
          <View style={[styles.dropdownContainer, { zIndex: 4000 }]}>
            <Text style={{ fontSize: 14 }}>Alloy</Text>
            <DropDownPicker
              open={alloyOpen}
              value={alloyValue}
              items={alloyItems}
              setOpen={setAlloyOpen}
              setValue={setAlloyValue}
              setItems={setAlloyItems}
              placeholder="Select alloy"
              containerStyle={styles.dropdown}
            />
          </View>
          <View
            style={[styles.dropdownContainer, { zIndex: 3000, marginTop: 20 }]}
          >
            <Text style={{ fontSize: 14 }}>Shape</Text>
            <DropDownPicker
              open={shapeOpen}
              value={shapeValue}
              items={shapeItems}
              setOpen={setShapeOpen}
              setValue={setShapeValue}
              setItems={setShapeItems}
              placeholder="Select shape"
              containerStyle={styles.dropdown}
            />
          </View>
        </View>

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
              zIndex: 2000,
            },
          ]}
        >
          <Text style={{ fontSize: 14 }}>Unit</Text>
          <DropDownPicker
            open={unitOpen}
            value={unitValue}
            items={unitItems}
            setOpen={setUnitOpen}
            setValue={setUnitValue}
            setItems={setUnitItems}
            placeholder="Select unit"
            containerStyle={styles.dropdown}
          />
        </View>

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
              zIndex: 2000,
            },
          ]}
        >
          <Text style={{ fontSize: 14 }}>Dimensions</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Length</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={length}
              onChangeText={setLength}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Width</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={width}
              onChangeText={setWidth}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Thickness</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={thickness}
              onChangeText={setThickness}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>No of metal pieces</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={pieces}
              onChangeText={setPieces}
            />
          </View>
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
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Materials</Text>
                <Text style={styles.tableCell}>Unit</Text>
                <Text style={styles.tableCell}>Quantity</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{result.materials}</Text>
                <Text style={styles.tableCell}>{result.unit}</Text>
                <Text style={styles.tableCell}>{result.quantity}</Text>
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

export default AluminumWeight;
