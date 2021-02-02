import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'

export default function App() {

  const [guess, setGuess] = useState()
  const [number, setNumber] = useState(() => {
    return Math.floor(Math.random() * 100) + 1
  })
  const [result, setResult] = useState('Guess a number between 1-100')
  const [tries, setTries] = useState(0)

  const resetGame = () => {
    setGuess()
    setNumber(Math.floor(Math.random() * 100) + 1)
    setResult('Guess a number between 1-100')
    setTries(0)
  }

  const startGame = () => {
    if (guess == number) {
      Alert.alert('You guessed the number in ' + tries + ' guesses')
    } else if (guess > number) {
      setResult('Your guess ' + guess + ' is too high')
      setTries(tries + 1)
    } else if (guess < number) {
      setResult('Your guess ' + guess + ' is too low')
      setTries(tries + 1)
    }
  }

  const Separator = () => (
    <View style={styles.separator} />
  )

  return (
    <View style={styles.container}>
      <Text>{result}</Text>
      <TextInput style={styles.input}
        keyboardType={'numeric'}
        onChangeText={text => setGuess(text)}
        value={guess}
        textAlign={'center'}
      />
      <Button title='MAKE GUESS' onPress={startGame} />
      <Separator />
      <Button title='RESET' onPress={resetGame} />
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
  input: {
    width: 50,
    borderColor: 'gray',
    borderWidth: 2,
    marginVertical: 10
  },
  separator: {
    marginVertical: 10
  }
});
