import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps'

export default function App() {
  const [location, setLocation] = useState('')
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  })

  const [marker, setMarker] = useState({
    latitude: 60.201373,
    longitude: 24.934041
  })

  const searchLocation = () => {
    const key = 'svxdrSVCU87mW45d9yrO2epeA7gV7xBP'

    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${key}&inFormat=json&outFormat=json&location=${location}`)
      .then((response) => response.json())
      .then((data) => {
        const result = {
          ...region, latitude: data.results[0].locations[0].latLng.lat,
          longitude: data.results[0].locations[0].latLng.lng
        }
        setRegion(result)
        setMarker(result)
      })
      .catch((error) => Alert.alert('Error', error.message))
  }
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={marker} />
      </MapView>
      <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        textAlign={'center'}
        value={location}
        onChangeText={(value) => setLocation(value)}
      />
      <Button title='Search' onPress={searchLocation}/>
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
  map: {
    flex:1,
    width: '100%',

  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10
  },
  searchBar: {
    width: '100%'
  }
});
