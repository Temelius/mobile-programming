import React from 'react'
import { StyleSheet, View, Text,
          SafeAreaView, ScrollView, StatusBar} from 'react-native'

import { List, ActivityIndicator, Title } from 'react-native-paper'

const FilmDetails = ({route, navigation}) => {
  const filmId = route.params.filmId;

  const [film, setFilm] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    getFilmById()
  }, [])

  const url = `https://ghibliapi.herokuapp.com/films/${filmId}`
  const getFilmById = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setFilm(data)
      setIsLoading(false)
    })
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
  }
});

export default FilmDetails;
