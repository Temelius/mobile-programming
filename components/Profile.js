import React from 'react'
import { StyleSheet, View,
         SafeAreaView, ScrollView, StatusBar, FlatList} from 'react-native'

import { Title, Text, Avatar, ProgressBar } from 'react-native-paper'

import Database from './Database.js'

const Profile = () => {

  const [films, setFilms] = React.useState([])

  React.useEffect(() => {
    setFilms(Database.selectAll())
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userContainer}>
          <Avatar.Text size={64} label="TS"/>
          <Title>Temelius</Title>
        </View>
        <View>
          {/* Tähän olisi tullut visuaalinen tieto siitä kuinka monta elokuvaa käyttäjä on nähnyt */}
          <ProgressBar style={{flex:1}} progress={0.75} color="#00ADEF" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Profile;
