import * as React from 'react';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json'

import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/Home';
import FilmDetails from './components/FilmDetails'

export default function App() {

  const Stack = createStackNavigator();

  return (
    <PaperProvider>
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
