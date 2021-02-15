import React, { useState } from 'react'
import { Text, View, StyleSheet, Button, TextInput } from 'react-native'

export default function Calculator({navigation}) {
    const [result, setResult] = useState(0)

    const [numberOne, setNumberOne] = useState('')
    const [numberTwo, setNumberTwo] = useState('')

    const [history, setHistory] = useState([])

    const calculate = (operator) => {
      const [num1, num2] = [Number(numberOne), Number(numberTwo)]

      if (isNaN(num1) || isNaN(num2)) {
        setResult('Use numbers only.')
      } else {
        let result = 0
        switch (operator) {
          case '+':
            result = num1 + num2
            break;
          case '-':
          result = num1 - num2
          break;
        }

        setResult(result)
        const resultText = `${num1} ${operator} ${num2} = ${result}`
        setHistory([...history, { key: resultText }])
      }
    }

    const Spacer = () => (
      <View style={styles.spacer} />
    );

    return (
      <View style={styles.container}>
        <Text>Result: {result}</Text>
        <TextInput style={styles.inputField}
            keyboardType={'numeric'}
            textAlign={'center'}
            onChangeText={text => setNumberOne(text)}
            value={numberOne.toString()}
        />
        <TextInput style={styles.inputField}
          keyboardType={'numeric'}
          textAlign={'center'}
          onChangeText={text => setNumberTwo(text)}
          value={numberTwo.toString()}
        />
        <View style={styles.buttons}>
          <Button title='+' onPress={() => calculate('+')} />
          <Button title='-' onPress={() => calculate('-')} />
          <Button title='History' onPress={() => navigation.navigate('History', {history})} />
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%'
  },
  spacer: {
    marginHorizontal: 15
  }
});
