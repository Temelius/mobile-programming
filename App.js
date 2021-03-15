import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as Speech from 'expo-speech'

export default function App() {
  const [text, setText] = React.useState('')

  const speak = () => {
    Speech.speak(text)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setText(value)}
        />
      <Button title='Speak' onPress={speak} />

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
    width: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 15
  }
});
