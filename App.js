import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, Button, TextInput, Image} from 'react-native';

export default function App() {

  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])

  const getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + query
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.results)
      })
      .catch((error) => {
        Alert.alert('Error', error)
      })
  }

  const listSeparator = () => {
    return (
      <View style={
        {height:1,width:'80%',backgroundColor:'#CED0CE',marginVertical:10}
      }/>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{marginLeft:'5%', marginTop:20}}
        keyExtractor={item => item.href}
        renderItem={({item}) =>
        <View>
          <Text>{item.title}</Text>
          <Image
            style={{ width: 90, height: 90 }}
            source={{
              uri: item.thumbnail
            }}
          />
        </View>
        }
        ItemSeparatorComponent={listSeparator}
        data={recipes}
      />
      <TextInput
        style={styles.inputField}
        value={query} placeholder='Ingredient'
        onChangeText={(query) => setQuery(query)}
        textAlign={'center'}
      />
      <Button title='Search' onPress={getRecipes}/>
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
    width: 100,
    height: 20,
    marginLeft: 10,
    height: 20,
    borderColor: 'gray',
    borderWidth: 2,
    margin: 15
  }
});
