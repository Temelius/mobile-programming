import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

export default function Map({ route }) {

  const { item } = route.params

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

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = () => {
    const key = 'svxdrSVCU87mW45d9yrO2epeA7gV7xBP'
    // http://www.mapquestapi.com/geocoding/v1/address?key=${key}&inFormat=json&outFormat=json&location=${location}
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${item.address}`)
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
      <MapView
        style={styles.map}
        region={region}>
        <Marker coordinate={marker} />
      </MapView>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height

  }
});
