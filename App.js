import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('list.db')

export default function App() {

  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [shoppingList, setShoppingList] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS shoppinglist (id integer primary key not null, amount text, product text);')
    })
    updateList()
  },[])

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO shoppinglist (amount, product) VALUES (?, ?);', [amount, product])
    }, null, updateList)
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM shoppinglist;', [], (_, { rows }) =>
        setShoppingList(rows._array)
      )
    })
    setAmount('')
    setProduct('')
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM shoppinglist WHERE id = ?;', [id])
    }, null, updateList)
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
        />
    );
  };

  return (
      <View style={styles.container}>
        <TextInput placeholder='Product'
          style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(product) => setProduct(product)}
          value={product}/>
        <TextInput placeholder='Amount'
          keyboardType="numeric"
          style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(amount) => setAmount(amount)}
          value={amount}/>
        <Button onPress={saveItem} title="Save" />
        <Text style={{marginTop: 30, fontSize: 20}}>ShoppingList</Text>
        <FlatList
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) =>
            <View style={styles.listcontainer}>
              <Text style={{fontSize: 18}}>{item.product}, {item.amount}</Text>
              <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> bought</Text>
            </View>
          }
          data={shoppingList}
          ItemSeparatorComponent={listSeparator}
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
   listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
   },
  });
