import React from 'react'
import { StyleSheet, View,
         SafeAreaView, ScrollView, StatusBar} from 'react-native'

import { Title, Text, Avatar, ProgressBar } from 'react-native-paper'


const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Avatar.Text size={64} label="TS"/>
          <Title>Temelius</Title>
        </View>
        <View>
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
  }
});

export default Profile;
