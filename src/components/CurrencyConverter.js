import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Picker } from 'react-native';
import axios from 'axios';
import styles from '../components/Styles';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('AOA');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          'https://api.exchangerate-api.com/v4/latest/USD'
        );
        const currenciesArray = Object.keys(response.data.rates);
        setCurrencies(currenciesArray);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      
      const rate = response.data.rates[toCurrency];
      const result = parseFloat(amount) * rate;

      setConvertedAmount(result.toFixed(2));

    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  useEffect(() => {
    if (amount !== '') {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <View style={styles.container}>
      <Text style={styles.text} >Currency Converty</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      <Picker
        selectedValue={fromCurrency}
        style={styles.input}
        onValueChange={(itemValue) => setFromCurrency(itemValue)}
      >
        {currencies.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <Picker
        selectedValue={toCurrency}
        style={styles.input}
        onValueChange={(itemValue) => setToCurrency(itemValue)}
      >
        {currencies.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>

      <Text >
        Converted Amount: {convertedAmount} {toCurrency}
      </Text>

    </View>
  );
}
