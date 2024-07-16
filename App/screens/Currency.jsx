import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Currency = () => {
  const navigation = useNavigation();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "INR", name: "Indian Rupee" },
    { code: "BDT", name: "Bangladeshi Taka" },
  ];

  const handleCurrencySelect = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    // Here you would typically save the selected currency to your app's state or storage
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}></Text>
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>  Currency</Text>
      </View>

      <ScrollView style={styles.content}>
        {currencies.map((currency) => (
          <TouchableOpacity
            key={currency.code}
            style={styles.option}
            onPress={() => handleCurrencySelect(currency.code)}
          >
            <Text style={styles.optionText}>{currency.code}</Text>
            {selectedCurrency === currency.code && (
              <View style={styles.selectedIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1ece9",
  },
  navbar: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    fontSize: 32,
    marginRight: 16,
    color: "#007BFF",
  },
  navbarTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  content: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginHorizontal: 16,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionText: {
    fontSize: 16,
    color: "#000000",
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#007BFF",
  },
});

export default Currency;
