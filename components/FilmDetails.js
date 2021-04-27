import React from 'react'
import { StyleSheet, View, Text,
          SafeAreaView, ScrollView, StatusBar} from 'react-native'

import { Card, List, ActivityIndicator, Title, Paragraph, Divider } from 'react-native-paper'

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
  } 

});

export default FilmDetails;
