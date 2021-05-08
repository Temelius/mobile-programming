import React from 'react'
import { StyleSheet,
         Text,
         View,
         SafeAreaView, ScrollView, StatusBar} from 'react-native'
import { List, ActivityIndicator } from 'react-native-paper'

const Films = ({navigation}) => {
  const [films, setFilms] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)


  React.useEffect(() => {
      getAllFilms()
  }, [])

  const getAllFilms = () => {
    const url = 'https://ghibliapi.herokuapp.com/films'
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // sort movies by release_date ascending.
        // switch places on return for descend mode.
        let sorted = data.sort(function(a, b) {return a.release_date - b.release_date})
        setFilms(sorted)
        setIsLoading(false)
      })
    .catch((error) => Alert.alert('Error', error))
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadContainer}>
        <ActivityIndicator animating={true} color={'#00ADEF'} size={'large'} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
        <List.Section>
          <List.Subheader>All films ({films.length})</List.Subheader>
            {
              films.map((film) =>
                <List.Item
                  key={film.id}
                  title={film.title}
                  description={film.release_date}
                  left={() => <List.Icon color="#000" icon="folder" />}
                  onPress={() => navigation.push('Details', {
                      name: film.title,
                      filmId: film.id
                    })
                  }
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
  loadContainer: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Films
