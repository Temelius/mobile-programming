import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Map from './components/Map'
import Places from './components/Places'

export default function App() {
  const Tab = createStackNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='My Places' component={Places} />
        <Tab.Screen name='Map' component={Map} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
