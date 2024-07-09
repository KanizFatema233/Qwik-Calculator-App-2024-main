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

const PlasterWork = ({ navigation }) => {
  // State for the Category dropdown
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("Plaster Work");
  const [categoryItems, setCategoryItems] = useState([
    { label: "Paint Work", value: "Paint Work" },
    { label: "Plaster Work", value: "Plaster Work" },
    { label: "Wallpaper", value: "Wallpaper" },
  ]);

  useEffect(() => {
    if (categoryValue === "Wallpaper") {
      navigation.navigate("Wallpaper");
    } else if (categoryValue === "Paint Work") {
      navigation.navigate("Paint Work");
    }
  }, [categoryValue]);

  // State for the input fields
  const [wallLength, setWallLength] = useState("");
  const [wallWidth, setWallWidth] = useState("");
  const [wallThickness, setWallThickness] = useState("");
  const [sandCementRatio, setSandCementRatio] = useState("");
  const [cementBagWeight, setCementBagWeight] = useState("");
  const [dryWetRatio, setDryWetRatio] = useState("");
  const [wastagePercentage, setWastagePercentage] = useState("");
  const [plasterAreaPrice, setPlasterAreaPrice] = useState("");
  const [cementBagPrice, setCementBagPrice] = useState("");

  // State for the calculation result
  const [result, setResult] = useState(null);

  const handleReset = () => {
    setWallLength("");
    setWallWidth("");
    setWallThickness("");
    setSandCementRatio("");
    setCementBagWeight("");
    setDryWetRatio("");
    setWastagePercentage("");
    setPlasterAreaPrice("");
    setCementBagPrice("");
    setResult(null);
  };

  const handleCalculate = () => {
    // Convert input values to numbers
    const L = parseFloat(wallLength);
    const W = parseFloat(wallWidth);
    const T = parseFloat(wallThickness);
    const R_sand_cement = parseFloat(sandCementRatio);
    const W_bag = parseFloat(cementBagWeight);
    const R_dry_wet = parseFloat(dryWetRatio);
    const W_wastage = parseFloat(wastagePercentage) / 100; // Convert percentage to decimal
    const C_plaster_area = parseFloat(plasterAreaPrice);
    const C_cement_bag = parseFloat(cementBagPrice);

    // Formulas
    // 3.1 Plaster Area Calculation
    const Plaster_Area = L * W;

    // 3.2 Wet Mortar Volume Calculation
    const Wet_Mortar_Volume = Plaster_Area * T;

    // 3.3 Dry Mortar Volume including Wastage Calculation
    const Dry_Mortar_Volume = Wet_Mortar_Volume * R_dry_wet * (1 + W_wastage);

    // 3.4 Volume of Cement Calculation
    const Volume_Cement = Dry_Mortar_Volume / (1 + R_sand_cement);

    // 3.5 Volume of Sand Calculation
    const Volume_Sand =
      (Dry_Mortar_Volume * R_sand_cement) / (1 + R_sand_cement);

    // 3.6 Weight of Cement Calculation
    const Weight_Cement = Volume_Cement * 1440;

    // 3.7 Number of Cement Bags Calculation
    const Number_Cement_Bags = Weight_Cement / W_bag;

    // 3.8 Cost of Cement Calculation
    const Cost_Cement = Number_Cement_Bags * C_cement_bag;

    // 3.9 Total Plaster Cost Calculation
    const Total_Plaster_Cost = Plaster_Area * C_plaster_area;

    // Prepare result object
    const result = {
      plasterArea: Plaster_Area.toFixed(2),
      wetMortarVolume: Wet_Mortar_Volume.toFixed(2),
      dryMortarVolume: Dry_Mortar_Volume.toFixed(2),
      volumeCement: Volume_Cement.toFixed(2),
      volumeSand: Volume_Sand.toFixed(2),
      weightCement: Weight_Cement.toFixed(2),
      numberCementBags: Number_Cement_Bags.toFixed(2),
      costCement: Cost_Cement.toFixed(2),
      totalPlasterCost: Total_Plaster_Cost.toFixed(2),
    };

    setResult(result);
  };

  return (
    <View style={styles.TopContainer}>
      <ScrollView style={styles.container}>
        <Image
          source={require("../../assets/plaster.png")}
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
          <Text style={styles.label}>Wall Dimensions</Text>
          <TextInput
            style={styles.input}
            placeholder="Length (m)"
            keyboardType="numeric"
            value={wallLength}
            onChangeText={setWallLength}
          />
          <TextInput
            style={styles.input}
            placeholder="Width (m)"
            keyboardType="numeric"
            value={wallWidth}
            onChangeText={setWallWidth}
          />
          <TextInput
            style={styles.input}
            placeholder="Thickness (m)"
            keyboardType="numeric"
            value={wallThickness}
            onChangeText={setWallThickness}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Mortar Ratio</Text>
          <TextInput
            style={styles.input}
            placeholder="Sand to cement ratio"
            keyboardType="numeric"
            value={sandCementRatio}
            onChangeText={setSandCementRatio}
          />
          <TextInput
            style={styles.input}
            placeholder="Weight of one cement bag"
            keyboardType="numeric"
            value={cementBagWeight}
            onChangeText={setCementBagWeight}
          />
          <TextInput
            style={styles.input}
            placeholder="Dry volume to wet volume ratio"
            keyboardType="numeric"
            value={dryWetRatio}
            onChangeText={setDryWetRatio}
          />
          <TextInput
            style={styles.input}
            placeholder="Wastage percentage"
            keyboardType="numeric"
            value={wastagePercentage}
            onChangeText={setWastagePercentage}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Cost</Text>
          <TextInput
            style={styles.input}
            placeholder="Price of plaster per area"
            keyboardType="numeric"
            value={plasterAreaPrice}
            onChangeText={setPlasterAreaPrice}
          />
          <TextInput
            style={styles.input}
            placeholder="Price of cement per bag"
            keyboardType="numeric"
            value={cementBagPrice}
            onChangeText={setCementBagPrice}
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
              Plaster Area: {result.plasterArea} m²
            </Text>
            <Text style={styles.resultText}>
              Wet Mortar Volume: {result.wetMortarVolume} m³
            </Text>
            <Text style={styles.resultText}>
              Dry Mortar Volume: {result.dryMortarVolume} m³
            </Text>
            <Text style={styles.resultText}>
              Volume of Cement: {result.volumeCement} m³
            </Text>
            <Text style={styles.resultText}>
              Volume of Sand: {result.volumeSand} m³
            </Text>
            <Text style={styles.resultText}>
              Weight of Cement: {result.weightCement} kg
            </Text>
            <Text style={styles.resultText}>
              Number of Cement Bags: {result.numberCementBags}
            </Text>
            <Text style={styles.resultText}>
              Cost of Cement: {result.costCement} currency units
            </Text>
            <Text style={styles.resultText}>
              Total Plaster Cost: {result.totalPlasterCost} currency units
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

export default PlasterWork;