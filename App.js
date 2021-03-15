import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts'

export default function App() {

  const [contacts, setContacts] = useState([])

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync()

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setContacts(data)
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{marginBottom:25}}
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.firstName} {item.lastName} {item.phoneNumbers ? item.phoneNumbers[0].number : ''}
            </Text>
          </View>
        )}
      />
      <Button title='Get Contacts' onPress={getContacts}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:25,
    paddingBottom:25
  },
});
