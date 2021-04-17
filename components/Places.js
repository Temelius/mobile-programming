import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { ListItem, Input, Button, Icon } from 'react-native-elements'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("places.db")

export default function Places({ navigation }) {
  const [places, setPlaces] = useState([])
  const [address, setAddress] = useState('')

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF EXISTS places (id integer primary key not null, address text);')
    })
    updateList();
  }, [])

  const saveAddress = () => {
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO places (address) VALUES (?);', [address])
    }, null, updateList)
  }

  const deleteAddress = (id) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM places WHERE id = ?;', [id])
    }, null, updateList)
  }

  const updateList = () => {
    console.log('Toimii?')
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM places;', [], (_, {rows}) => {
        setPlaces(rows._array)
        console.log(places)
      })
    })
    setAddress('')
  }

  const renderItem = ({item}) => {
    <ListItem
      bottomDivider
      containerStyle={{
        width: 400
      }}
      onPress={() => navigation.navigate('Map', {item})}
      onLongPress={() => deleteAddress(item.id)}>
      <ListItem.Content>
        <ListItem.Title>{item.address}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Subtitle>Show on map</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  }

  return (
    <View style={styles.container}>
      <Input
        label='PLACEFINDER'
        placeholder='Type in address'
        onChangeText={(value) => setAddress(value)}
        value={address} />

      <Button
        containerStyle={{width:'90%'}}
        onPress={saveAddress}
        icon={<Icon type='material' name='save' size={25} color='#FFF' />}
        title='SAVE'/>

      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={places}
        renderItem={renderItem} />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  }
})
