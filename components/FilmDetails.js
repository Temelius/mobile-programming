import React from 'react'
import { StyleSheet, View, Text,
          SafeAreaView, ScrollView, StatusBar} from 'react-native'

import { Card, List, ActivityIndicator, Title, Paragraph, Divider, Button } from 'react-native-paper'

import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('ghibli.db')

const FilmDetails = ({route, navigation}) => {
  const filmId = route.params.filmId;

  const [film, setFilm] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isAddedToList, setIsAddedToList] = React.useState()

  React.useEffect(() => {
    getFilmById()
    
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM films WHERE filmId = ?;', [film.id], (_, { rows }) => {
        console.log(rows._array)
        if (rows._array.length > 0) {
          setIsAddedToList(true)
          
        }
      })
    })
  }, [])

  // Get the film by id
  const url = `https://ghibliapi.herokuapp.com/films/${filmId}`
  const getFilmById = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setFilm(data)
      setIsLoading(false)
    })
  }

  const handleSave = () => {
    let filmName = film.title
    let filmId = film.id

    db.transaction(tx => {
        tx.executeSql('INSERT INTO films (filmId, film) VALUES (?, ?);', [filmId, filmName])
    }, null, console.log('Lisäys onnistui')) 
    setIsAddedToList(true)

  }

  const handleRemove = () => {
    let filmId = film.id
    db.transaction(tx => {
      tx.executeSql('DELETE FROM films WHERE filmId = ?;', [filmId])
    }, null, console.log('Poisto onnistui'))
    setIsAddedToList(false)
  }

  const AddToListButton = () => {
    if (isAddedToList) {
      return (
        <Button icon="playlist-remove" mode="contained" dark={true} style={styles.button}
          onPress={handleRemove}>
          Remove
        </Button>
      )
    }
    return (
      <Button icon="playlist-plus" mode="contained" dark={true} style={styles.button}
        onPress={handleSave}>
        Add to List
      </Button>
    )
  }

  const ListItemBoldAndNormal = ({bold, normal}) => {
    return (
      <List.Item title={
        <Text style={styles.bold}>
          {bold}
          <Text style={styles.normal}>{normal}</Text>
        </Text>
      }
      />
    )
  }

  if(isLoading) {
    return (
      <SafeAreaView style={styles.loadContainer}>
        <ActivityIndicator animating={true} color={'#00ADEF'} size={'large'} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Title>{film.title}</Title>
        <View style={styles.buttonContainer}>
          <AddToListButton />
        </View>

        <List.Section>
          <List.Accordion
            title="Alternative Titles" 
            left={props => <List.Icon {...props} icon="translate"/> }>
              <List.Item title={film.original_title} />
              <List.Item title={film.original_title_romanised} />
          </List.Accordion>
        </List.Section>

        <Card>
          <Card.Title title="Description" />
          <Card.Content>
            <Paragraph>{film.description}</Paragraph>
          </Card.Content>
        </Card>

        <Card>
          <Card.Title title="Information" />
          <Card.Content>
            <List.Section>
              <ListItemBoldAndNormal 
                bold="Release Date: "
                normal={film.release_date}
              />
              <Divider />
              <ListItemBoldAndNormal 
                bold="Running time: "
                normal={`${film.running_time} min`}
              />
              <Divider />
              <ListItemBoldAndNormal 
                bold="Director: "
                normal={film.director}
              />
              <Divider />
              <ListItemBoldAndNormal 
                bold="Producer: "
                normal={film.producer}
              />
              <Divider />
              <ListItemBoldAndNormal 
                bold="Rotten Tomato: "
                normal={film.rt_score}
              />
            </List.Section>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
  },
  loadContainer: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bold'
  },
  normal: {
    fontWeight: 'normal'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: '40%'
  } 

});

export default FilmDetails;
