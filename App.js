import * as React from 'react';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/Home';
import FilmDetails from './components/FilmDetails'

export default function App() {

  const Stack = createStackNavigator();

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#00ADEF',
      accent: '#f1c40f',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Details"
            component={FilmDetails}
            options={({route}) => ({ title: route.params.name })}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
