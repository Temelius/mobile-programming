import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home'
import Profile from './Profile'


export default function Main() {

  const Tab = createBottomTabNavigator()

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            // Jos sivu on aktiivinen, ikoni on
            // väritetty
            if (route.name === 'Home') {
              iconName = focused
              ? 'home'
              : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#00ADEF',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
