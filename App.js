import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';

export default function App() {

  const [shoppingList, setShoppingList] = useState([])
  const [item, setItem] = useState()

  const addToShoppingList = () => {
    setShoppingList([...shoppingList, item])
  }

  const clearShoppingList = () => {
    setShoppingList([])
  }

  const Separator = () => (
    <View style={styles.separator}></View>
  )

  return (
    <View style={styles.container}>
      <TextInput style={styles.inputField}
        textAlign={'center'}
        onChangeText={text => setItem(text)}
        value={item}
      />
      <View style={styles.buttons}>
        <Button title='ADD' onPress={addToShoppingList}/>
        <Separator />
        <Button title='CLEAR' onPress={clearShoppingList}/>
      </View>
      <Text style={styles.title}>Shopping List</Text>
      <FlatList
        data={shoppingList}
        renderItem={({item}) => <Text>{item}</Text>}
      />
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
  separator: {
    marginHorizontal: 10
  },
  inputField: {
    marginTop: 200,
    width: 200,
    borderColor: 'gray',
    borderWidth: 2,
    margin: 5
  },
  buttons: {
    flexDirection: 'row'
  },
  title: {
    marginVertical: 20,
    color: 'blue',
    fontSize: 20
  }
});
