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

const CementCalculator = ({ navigation }) => {
  const [pageOpen, setPageOpen] = useState(false);
  const [pageValue, setPageValue] = useState("Cement Calculator");
  const [pageItems, setPageItems] = useState([
    { label: "Cement Calculator", value: "Cement Calculator" },
    { label: "Other Page 1", value: "Other Page 1" },
    { label: "Other Page 2", value: "Other Page 2" },
  ]);

  const [currentImage, setCurrentImage] = useState(require("../../assets/Rectangle 4144.png"));

  const [mixTypeOpen, setMixTypeOpen] = useState(false);
  const [mixTypeValue, setMixTypeValue] = useState("Concrete");
  const [mixTypeItems, setMixTypeItems] = useState([
    { label: "Concrete", value: "Concrete" },
    { label: "Cement and Water Only", value: "Cement and Water Only" },
  ]);

  const [unitOpen, setUnitOpen] = useState(false);
  const [unitValue, setUnitValue] = useState("m³");
  const [unitItems, setUnitItems] = useState([
    { label: "Cubic Meter (m³)", value: "m³" },
    { label: "Cubic Feet (ft³)", value: "ft³" },
  ]);

  const [concreteMixRatioOpen, setConcreteMixRatioOpen] = useState(false);
  const [concreteMixRatioValue, setConcreteMixRatioValue] = useState("1:2:4");
  const [concreteMixRatioItems, setConcreteMixRatioItems] = useState([
    { label: "1:2:4", value: "1:2:4" },
    { label: "1:3:6", value: "1:3:6" },
    { label: "1:4:8", value: "1:4:8" },
  ]);

  useEffect(() => {
    if (pageValue === "Other Page 1") {
      navigation.navigate("OtherPage1");
    } else if (pageValue === "Other Page 2") {
      navigation.navigate("OtherPage2");
    }

      if (mixTypeValue === "Concrete") {
        setCurrentImage(require("../../assets/concrete.png"));
      } else if (mixTypeValue === "Cement and Water Only") {
        setCurrentImage(require("../../assets/cementandwater.png")); // Replace with your actual image path
      }
  },[mixTypeValue], [pageValue]);

  const [wetVolume, setWetVolume] = useState("");
  const [dryWetRatio, setDryWetRatio] = useState("");
  const [wasteFactor, setWasteFactor] = useState("");
  const [cementDensity, setCementDensity] = useState("");
  const [bagSize, setBagSize] = useState("");
  const [cementPrice, setCementPrice] = useState("");
  const [sandPrice, setSandPrice] = useState("");
  const [gravelPrice, setGravelPrice] = useState("");
  const [waterDensity, setWaterDensity] = useState("");
  const [waterRatio, setWaterRatio] = useState("");

  const [result, setResult] = useState(null);

  const handleReset = () => {
    setWetVolume("");
    setDryWetRatio("");
    setWasteFactor("");
    setCementDensity("");
    setBagSize("");
    setCementPrice("");
    setSandPrice("");
    setGravelPrice("");
    setWaterDensity("");
    setConcreteMixRatioValue("1:2:4");
    setWaterRatio("");
    setResult(null);
  };

  const handleCalculate = () => {
    const V_wet = parseFloat(wetVolume);
    const R_dry_wet = parseFloat(dryWetRatio);
    const W_factor = parseFloat(wasteFactor);
    const D_cement = parseFloat(cementDensity);
    const B_size = parseFloat(bagSize);
    const C_bag = parseFloat(cementPrice);
    const C_sand = parseFloat(sandPrice);
    const C_gravel = parseFloat(gravelPrice);
    const D_water = parseFloat(waterDensity);
    const R_water = parseFloat(waterRatio);

    const V_total = V_wet * R_dry_wet * (1 + W_factor);

    let V_cement,
      W_cement,
      N_bags,
      V_water,
      W_water,
      C_cement,
      C_total_mix,
      C_unit_volume,
      V_sand,
      V_gravel,
      R_mix;

    if (mixTypeValue === "Concrete") {
      const ratioParts = concreteMixRatioValue.split(":").map(Number);
      const sumRatio = ratioParts.reduce((a, b) => a + b, 0);
      V_cement = V_total / sumRatio;
      V_sand = V_cement * ratioParts[1];
      V_gravel = V_cement * ratioParts[2];
      W_cement = V_cement * D_cement;
      N_bags = Math.ceil(W_cement / B_size);
      V_water = V_cement * R_water;
      W_water = V_water * D_water;
      C_cement = N_bags * C_bag;
      C_total_mix = C_cement + V_sand * C_sand + V_gravel * C_gravel;
      C_unit_volume = C_total_mix / V_total;
    } else {
      V_cement = V_total / R_water;
      W_cement = V_cement * D_cement;
      N_bags = Math.ceil(W_cement / B_size);
      V_water = V_cement * R_water;
      W_water = V_water * D_water;
      C_cement = N_bags * C_bag;
      C_total_mix = C_cement;
      C_unit_volume = C_total_mix / V_total;
    }

    const result = {
      totalVolume: V_total.toFixed(2),
      volumeCement: V_cement.toFixed(2),
      weightCement: W_cement.toFixed(2),
      bagsCement: N_bags,
      volumeWater: V_water.toFixed(2),
      weightWater: W_water.toFixed(2),
      costCement: C_cement.toFixed(2),
      totalCostMix: C_total_mix.toFixed(2),
      costPerUnitVolume: C_unit_volume.toFixed(2),
      ...(mixTypeValue === "Concrete" && {
        volumeSand: V_sand.toFixed(2),
        volumeGravel: V_gravel.toFixed(2),
      }),
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
            Cement Calculator
          </Text>
        </View>
      </View>

      <ScrollView style={styles.container}>
        <Image source={currentImage} style={styles.image} resizeMode="cover" />
        <View style={styles.dropdownContainer}>
          <Text style={{ fontSize: 14, marginTop: 10 }}>Select Page</Text>
          <DropDownPicker
            open={pageOpen}
            value={pageValue}
            items={pageItems}
            setOpen={setPageOpen}
            setValue={setPageValue}
            setItems={setPageItems}
            placeholder="Select page"
            containerStyle={styles.dropdown}
            style={{ backgroundColor: "#f1ece9" }}
            dropDownContainerStyle={{
              backgroundColor: "#f1ece9",
              zIndex: 3000,
            }}
            zIndex={3000}
          />
          <Text style={{ fontSize: 14, marginTop: 20 }}>Mix Type</Text>
          <DropDownPicker
            open={mixTypeOpen}
            value={mixTypeValue}
            items={mixTypeItems}
            setOpen={setMixTypeOpen}
            setValue={setMixTypeValue}
            setItems={setMixTypeItems}
            placeholder="Select mix type"
            containerStyle={styles.dropdown}
            style={{ backgroundColor: "#f1ece9" }}
            dropDownContainerStyle={{
              backgroundColor: "#f1ece9",
              zIndex: 2000,
            }}
            zIndex={2000}
          />
          {mixTypeValue === "Concrete" && (
            <>
              <Text style={{ fontSize: 14, marginTop: 20 }}>
                Concrete Mix Ratio
              </Text>
              <DropDownPicker
                open={concreteMixRatioOpen}
                value={concreteMixRatioValue}
                items={concreteMixRatioItems}
                setOpen={setConcreteMixRatioOpen}
                setValue={setConcreteMixRatioValue}
                setItems={setConcreteMixRatioItems}
                placeholder="Select concrete mix ratio"
                containerStyle={styles.dropdown}
                style={{ backgroundColor: "#f1ece9" }}
                dropDownContainerStyle={{
                  backgroundColor: "#f1ece9",
                  zIndex: 1000,
                }}
                zIndex={1000}
              />
            </>
          )}
          <Text style={{ fontSize: 14, marginTop: 20 }}>Unit</Text>
          <DropDownPicker
            open={unitOpen}
            value={unitValue}
            items={unitItems}
            setOpen={setUnitOpen}
            setValue={setUnitValue}
            setItems={setUnitItems}
            placeholder="Select unit"
            containerStyle={styles.dropdown}
            style={{ backgroundColor: "#f1ece9" }}
            dropDownContainerStyle={{
              backgroundColor: "#f1ece9",
              zIndex: 500,
            }}
            zIndex={500}
          />
          <Text style={{ fontSize: 14, marginTop: 20 }}>Wet Volume</Text>
          <TextInput
            style={styles.input}
            value={wetVolume}
            onChangeText={(text) => setWetVolume(text)}
            placeholder="Enter wet volume"
            keyboardType="numeric"
          />
          <Text style={{ fontSize: 14, marginTop: 20 }}>Dry-Wet Ratio</Text>
          <TextInput
            style={styles.input}
            value={dryWetRatio}
            onChangeText={(text) => setDryWetRatio(text)}
            placeholder="Enter dry-wet ratio"
            keyboardType="numeric"
          />
          <Text style={{ fontSize: 14, marginTop: 20 }}>Waste Factor</Text>
          <TextInput
            style={styles.input}
            value={wasteFactor}
            onChangeText={(text) => setWasteFactor(text)}
            placeholder="Enter waste factor"
            keyboardType="numeric"
          />
          <Text style={{ fontSize: 14, marginTop: 20 }}>
            Cement Density (kg/m³)
          </Text>
          <TextInput
            style={styles.input}
            value={cementDensity}
            onChangeText={(text) => setCementDensity(text)}
            placeholder="Enter cement density"
            keyboardType="numeric"
          />
          <Text style={{ fontSize: 14, marginTop: 20 }}>Bag Size (kg)</Text>
          <TextInput
            style={styles.input}
            value={bagSize}
            onChangeText={(text) => setBagSize(text)}
            placeholder="Enter bag size"
            keyboardType="numeric"
          />
          <Text style={{ fontSize: 14, marginTop: 20 }}>Cement Price</Text>
          <TextInput
            style={styles.input}
            value={cementPrice}
            onChangeText={(text) => setCementPrice(text)}
            placeholder="Enter cement price"
            keyboardType="numeric"
          />
          <Text style={{ fontSize: 14, marginTop: 20 }}>Sand Price</Text>
          <TextInput
            style={styles.input}
            value={sandPrice}
            onChangeText={(text) => setSandPrice(text)}
            placeholder="Enter sand price"
            keyboardType="numeric"
          />
          <Text style={{ fontSize: 14, marginTop: 20 }}>Gravel Price</Text>
          <TextInput
            style={styles.input}
            value={gravelPrice}
            onChangeText={(text) => setGravelPrice(text)}
            placeholder="Enter gravel price"
            keyboardType="numeric"
          />
          <Text style={{ fontSize: 14, marginTop: 20 }}>
            Water Density (kg/m³)
          </Text>
          <TextInput
            style={styles.input}
            value={waterDensity}
            onChangeText={(text) => setWaterDensity(text)}
            placeholder="Enter water density"
            keyboardType="numeric"
          />
          {mixTypeValue === "Cement and Water Only" && (
            <>
              <Text style={{ fontSize: 14, marginTop: 20 }}>Water Ratio</Text>
              <TextInput
                style={styles.input}
                value={waterRatio}
                onChangeText={(text) => setWaterRatio(text)}
                placeholder="Enter water ratio"
                keyboardType="numeric"
              />
            </>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.calculateButton]}
              onPress={handleCalculate}
            >
              <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Result:</Text>
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.cellHeader}>Material</Text>
                  <Text style={styles.cellHeader}>Unit</Text>
                  <Text style={styles.cellHeader}>Quantity</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Total Volume</Text>
                  <Text style={styles.cell}>{unitValue}</Text>
                  <Text style={styles.cell}>{result.totalVolume}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Cement Volume</Text>
                  <Text style={styles.cell}>{unitValue}</Text>
                  <Text style={styles.cell}>{result.volumeCement}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Cement Weight</Text>
                  <Text style={styles.cell}>kg</Text>
                  <Text style={styles.cell}>{result.weightCement}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Cement Bags</Text>
                  <Text style={styles.cell}>bags</Text>
                  <Text style={styles.cell}>{result.bagsCement}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Water Volume</Text>
                  <Text style={styles.cell}>{unitValue}</Text>
                  <Text style={styles.cell}>{result.volumeWater}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Water Weight</Text>
                  <Text style={styles.cell}>kg</Text>
                  <Text style={styles.cell}>{result.weightWater}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Cement Cost</Text>
                  <Text style={styles.cell}>currency</Text>
                  <Text style={styles.cell}>{result.costCement}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Total Cost</Text>
                  <Text style={styles.cell}>currency</Text>
                  <Text style={styles.cell}>{result.totalCostMix}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Cost per Unit Volume</Text>
                  <Text style={styles.cell}>currency/{unitValue}</Text>
                  <Text style={styles.cell}>{result.costPerUnitVolume}</Text>
                </View>
                {mixTypeValue === "Concrete" && (
                  <>
                    <View style={styles.row}>
                      <Text style={styles.cell}>Sand Volume</Text>
                      <Text style={styles.cell}>{unitValue}</Text>
                      <Text style={styles.cell}>{result.volumeSand}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.cell}>Gravel Volume</Text>
                      <Text style={styles.cell}>{unitValue}</Text>
                      <Text style={styles.cell}>{result.volumeGravel}</Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  TopContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  navbar: {
    width: "100%",
    height: 58,
    top: 0,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    height: 40,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f1ece9",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#8B4513",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  calculateButton: {
    backgroundColor: "#8B4513",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cellHeader: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "#f1ece9",
  },
  cell: {
    flex: 1,
    padding: 10,
  },
});

export default CementCalculator;
