import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View,Alert, TextInput, Button, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import euroCoin from './assets/1-euro-hi.png'

export default function App() {

  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState('')
  const [input, setInput] = useState('')
  const [result, setResult] = useState('0 €')

  React.useEffect(() => {
    const url = `https://api.exchangeratesapi.io/latest`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setRates(data.rates)
      })
      .catch((error) => {
        Alert.alert('Error', error)
      })
  }, [])

  const convert = () => {
    const rate = rates[currency];
    setResult((input / rate).toFixed(2) + ' €')
  }

  return (
    <View style={styles.container}>
      <Image source={euroCoin} style={{width:100, height:100}} />
      <Text style={{fontSize:25}}>{result}</Text>

      <View style={styles.pickerView}>
        <TextInput
          value={input}
          keyboardType='numeric'
          placeholder={'0'}
          onChangeText={text => setInput(text)}
        />
        <Picker
        style={{width:100, height:50}}
        selectedValue={currency}
        onValueChange={(itemValue, itemIndex) => {
            setCurrency(itemValue)
          }}>
          {Object.keys(rates).map(key => (
            <Picker.Item
              label={key}
              value={key}
              key={key}
            />
          ))}
        </Picker>
      </View>
      <Button title="Convert" onPress={convert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerView: {
    flexDirection: 'row',
    margin: 20
  }
});
