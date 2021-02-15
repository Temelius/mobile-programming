import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

export default function History({ route }) {
  const {history} = route.params
  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>
      <FlatList
        data={history}
        renderItem={({ item }) =>
          <Text>{item.key}</Text>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 20
  }
})
