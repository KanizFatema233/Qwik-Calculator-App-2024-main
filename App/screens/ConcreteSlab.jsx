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

const ConcreteSlab = ({ navigation }) => {
  // State for the Category dropdown
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("Concrete Slab");
  const [categoryItems, setCategoryItems] = useState([
    { label: "Concrete Slab", value: "Concrete Slab" },
    { label: "Cement Calculator", value: "CementCalculator" },
    { label: "PlasterWork", value: "PlasterWork" },
    { label: "Wallpaper", value: "Wallpaper" },
  ]);

  useEffect(() => {
    if (categoryValue === "Wallpaper") {
      navigation.navigate("Wallpaper");
    } else if (categoryValue === "CementCalculator") {
      navigation.navigate("CementCalculator");
    } else if (categoryValue === "Cement Water Mixture") {
      navigation.navigate("PlasterWork");
    }
  }, [categoryValue]);

  
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [density, setDensity] = useState("");
  const [bagSize, setBagSize] = useState("");
  const [wasteFactor, setWasteFactor] = useState("");
  const [costPerBag, setCostPerBag] = useState("");

  const [result, setResult] = useState(null);

  const handleReset = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setQuantity("");
    setDensity("");
    setBagSize("");
    setWasteFactor("");
    setCostPerBag("");
    setResult(null);
  };

  const handleCalculate = () => {
    // Convert input values to numbers
    const L = parseFloat(length);
    const W = parseFloat(width);
    const H = parseFloat(height);
    const Q = parseInt(quantity);
    const D_concrete = parseFloat(density);
    const B_size = parseFloat(bagSize);
    const W_factor = parseFloat(wasteFactor);
    const C_bag = parseFloat(costPerBag);

    // Formulas
    // 3.1 Total Area Calculation
    const Total_Area = L * W * Q;

    // 3.2 Volume Calculation
    const Volume = L * W * H * Q;

    // 3.3 Volume per Bag Calculation
    const Volume_per_Bag = B_size / D_concrete;

    // 3.4 Number of Bags Needed Calculation
    const Number_of_Bags = (Volume / Volume_per_Bag) * (1 + W_factor);

    // 3.5 Ceiling of Number of Bags
    const Number_of_Bags_Ceiling = Math.ceil(Number_of_Bags);

    // 3.6 Cost per Unit Volume Calculation
    const Cost_per_Unit_Volume = C_bag / Volume_per_Bag;

    // 3.7 Total Cost Calculation
    const Total_Cost = Number_of_Bags_Ceiling * C_bag;

    // Prepare result object
    const result = {
      materials: "Bags of concrete",
      unit: "Bags",
      quantity: Number_of_Bags_Ceiling,
      costPerUnitVolume: Cost_per_Unit_Volume.toFixed(2),
      totalCost: Total_Cost.toFixed(2),
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
            Concrete Slab{" "}
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
          <Text style={styles.inputLabel}>Height</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Quantity</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Density of Concrete</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={density}
            onChangeText={setDensity}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Bag Size</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={bagSize}
            onChangeText={setBagSize}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Waste Factor</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={wasteFactor}
            onChangeText={setWasteFactor}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Cost per Bag</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={costPerBag}
            onChangeText={setCostPerBag}
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
                <Text style={[styles.tableCell, styles.tableHeaderText]}>
                  Materials
                </Text>
                <Text style={[styles.tableCell, styles.tableHeaderText]}>
                  Unit
                </Text>
                <Text style={[styles.tableCell, styles.tableHeaderText]}>
                  Quantity
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{result.materials}</Text>
                <Text style={styles.tableCell}>{result.unit}</Text>
                <Text style={styles.tableCell}>{result.quantity}</Text>
              </View>
              <View style={[styles.tableRow]}>
                <Text style={[styles.tableCell]}>
                  Cost per Unit Volume
                </Text>
                <Text style={[styles.tableCell]}>
                  m³
                </Text>
                <Text style={[styles.tableCell]}>
                  {result.costPerUnitVolume}
                </Text>
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
    backgroundColor: "#FFFFFF",
  },
  navbar: {
    backgroundColor: "#F1ECE9",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 12,
    paddingHorizontal: 12,
    paddingVertical: 0,
  },
  image: {
    width: "100%",
    height: 200,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 12,
    alignItems: "center",
    borderRadius: 4,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  tableContainer: {
    marginTop: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: "#6A0DAD",
    borderRadius: 8,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  tableHeader: {
    backgroundColor: "#6A0DAD",
  },
  tableHeaderText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
  },
});

export default ConcreteSlab;
