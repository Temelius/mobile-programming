import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'

export default function App() {

  const [result, setResult] = useState(0)
  const [numberOne, setNumberOne] = useState(0)
  const [numberTwo, setNumberTwo] = useState(0)

  const sum = () => {
    setResult(parseInt(numberOne) + parseInt(numberTwo))
  }

  const subtract = () => {
    setResult(parseInt(numberOne) - parseInt(numberTwo))
  }

  const Spacer = () => (
    <View style={styles.spacer} />
  );

  return (
    <View style={styles.container}>
      <View>
        <Text>Result: {result}</Text>
      </View>
      <View>
        <TextInput style={styles.inputField}
          keyboardType={'numeric'}
          textAlign={'center'}
          onChangeText={text => setNumberOne(text)}
          value={numberOne.toString()}
        />
      </View>
      <View>
        <TextInput style={styles.inputField}
          keyboardType={'numeric'}
          textAlign={'center'}
          onChangeText={text => setNumberTwo(text)}
          value={numberTwo.toString()}
        />
      </View>

      <View style={styles.buttons}>
        <Button title='+' onPress={sum} />
        <Spacer />
        <Button title='-' onPress={subtract} />
      </View>
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
  inputField: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 2,
    margin: 5
  },
  buttons: {
    flexDirection: 'row'
  },
  spacer: {
    marginHorizontal: 15
  }
});
