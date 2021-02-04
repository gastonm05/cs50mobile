import React from 'react';
import { Button, Platform, Text, View, Image, StyleSheet } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

// APP screens
import SearchScreen from '../screens/SearchScreen';
import ResultsScreen from '../screens/ResultsScreen';
import MovieScreen from '../screens/MovieScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// Create app container
const AppContainer = createAppContainer(
  createStackNavigator(
    {
      Search: {
        screen: SearchScreen,
        navigationOptions: () => ({
          title: `Movie Browser`,
          headerBackTitle: null,
        }),
      },
      Results: {
        screen: ResultsScreen,
        navigationOptions: () => ({
          title: `Movies Results`,
          headerBackTitle: null,
        }),
      },
      Information: {
        screen: MovieScreen,
        navigationOptions: ({ navigation }) => ({
          headerBackTitle: null,
        }),
      },
    },
    {
      initialRouteName: 'Search',
      defaultNavigationOptions: {
        headerRight: (
          <Image
            style={{
              width: 55,
              height: 40,
              marginRight: 40,
              resizeMode: 'contain',
            }}
            source={require('../assets/images/popcorn1.png')}
          />
        ),
        headerStyle: {
          backgroundColor: '#c4000a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
  )
);

export default AppContainer;
