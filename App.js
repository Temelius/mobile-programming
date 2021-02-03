import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native'

export default function App() {

  const [result, setResult] = useState(0)
  const [numberOne, setNumberOne] = useState(0)
  const [numberTwo, setNumberTwo] = useState(0)
  const [history, setHistory] = useState([])

  const sum = () => {
    var num1 = parseInt(numberOne)
    var num2 = parseInt(numberTwo)
    var result = num1 + num2

    setResult(result)
    setHistory([...history, {key:num1 + ' + ' + num2 + ' = ' + result}])
  }

  const subtract = () => {
      var num1 = parseInt(numberOne)
      var num2 = parseInt(numberTwo)
      var result = num1 - num2

      setResult(result)
      setHistory([...history, {key:num1 + ' - ' + num2 + ' = ' + result}])
  }

  const Spacer = () => (
    <View style={styles.spacer} />
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={{marginTop:300}}>Result: {result}</Text>
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
      <View>
        <View style={styles.buttons}>
          <Button title='+' onPress={sum} />
          <Spacer />
          <Button title='-' onPress={subtract} />
        </View>
        <Text>History</Text>
        <FlatList
          data={history}
          renderItem={({item}) => <Text>{item.key}</Text>}
        />
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
