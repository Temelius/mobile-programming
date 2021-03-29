import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { Button, Input, Header, Icon, ListItem } from 'react-native-elements'

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

  const renderItem = ({ item }) => {
    return (
      <ListItem
        bottomDivider
        containerStyle={{
          width: 350
        }}>

        <ListItem.Content
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <ListItem.Content>
            <ListItem.Title>{item.product}</ListItem.Title>
            <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
          </ListItem.Content>

          <ListItem.Content right>
            <ListItem.Chevron
              name='delete'
              type='material'
              color='#FF0000'
              size={25}
              onPress={() => deleteItem(item.id)}
            />
          </ListItem.Content>

        </ListItem.Content>

      </ListItem>
    )
  }

  return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'SHOPPING LIST',
            style: {color: '#FFF'}
          }}
          />
        <Input
          placeholder='Product'
          label='PRODUCT'
          onChangeText={(value) => setProduct(value)}
          value={product}
          />
        <Input
          placeholder='Amount'
          label='AMOUNT'
          onChangeText={(value) => setAmount(value)}
          value={amount}
          />
        <Button
          containerStyle={{ width: '45%' }}
          onPress={saveItem}
          icon={<Icon type='material' name='save' size={25} color='#FFF'/>}
          title='SAVE'
          />
        <View style={{ flex: 1}}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={shoppingList}
            renderItem={renderItem}
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
   listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
   },
  });
