import React from 'react'
import { StyleSheet,
         Text,
         View,
         SafeAreaView, ScrollView, StatusBar} from 'react-native'
import { List } from 'react-native-paper'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons'

import Profile from './Profile'
import Films from './Films'

const Home = () => {

  const Tab = createBottomTabNavigator()

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Jos sivu on aktiivinen, ikoni on
          // väritetty
          if (route.name === 'Films') {
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
      <Tab.Screen title="Films" name="Films" component={Films} />
      <Tab.Screen title="Profile" name="Profile" component={Profile} />
    </Tab.Navigator>

  );
}

export default Home;
