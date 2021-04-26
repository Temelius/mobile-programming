import React from 'react'
import { StyleSheet,
         Text,
         View,
         SafeAreaView, ScrollView, StatusBar} from 'react-native'
import { List } from 'react-native-paper'

const Films = () => {
  const [films, setFilms] = React.useState([])



  React.useEffect(() => {
      getAllFilms()
  }, [])

  const getAllFilms = () => {
    const url = 'https://ghibliapi.herokuapp.com/films'
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setFilms(data)
      })
    .catch((error) => Alert.alert('Error', error))
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
        <List.Section>
          <List.Subheader>Some title</List.Subheader>
            {
              films.map((film) =>
                <List.Item
                  title={film.title}
                  description={film.release_date}
                  left={() => <List.Icon color="#000" icon="folder" />}
                  //onPress={() => navigation.push('FilmDetails')}
                  />
              )
            }
        </List.Section>
      </View>
      </ScrollView>
      </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
  },
});

export default Films
