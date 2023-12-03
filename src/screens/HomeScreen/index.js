// screens/HomeScreen.js
import  { useState } from 'react';
import { View } from 'react-native';
import CurrencyConverter from '../../components/CurrencyConverter';
import { styles } from './styles';

const HomeScreen = () => {
  const [convertedAmount, setConvertedAmount] = useState(null);

  const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    try { 
      // Substitua pela sua chave de API válida
      const apiKey = 'c7f5573c31f6279e9f5828ad';
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}?apikey=${apiKey}`
      );

      const rate = response.data.rates[toCurrency];
      const result = parseFloat(amount) * rate;

      setConvertedAmount(result.toFixed(2));
    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CurrencyConverter convertCurrency={convertCurrency} />
      {convertedAmount && (
        <Text>Converted Amount: {convertedAmount} {toCurrency}</Text>
      )}


    </View>
  );
};

export default HomeScreen;
