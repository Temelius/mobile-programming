import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Calculator from './components/Calculator'
import History from './components/History'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={ Calculator } />
        <Stack.Screen name="History" component={ History } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
