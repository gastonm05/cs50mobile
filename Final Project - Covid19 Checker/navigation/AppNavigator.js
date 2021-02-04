import React from 'react';
import { Button, Platform, Text, View, Image, StyleSheet } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

// APP screens
import HomeScreen from '../screens/HomeScreen';
import Prevention from '../screens/Prevention';
// Diagnose Screens
import SelectList1 from '../screens/SelectList1';
import SelectList2 from '../screens/SelectList2';
import SelectList3 from '../screens/SelectList3';
import SelectList4 from '../screens/SelectList4';
import SelectList5 from '../screens/SelectList5';
import Results from '../screens/Results';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: `Covid-19 Checker`,
        headerBackTitle: null,
      }),
    },
    Prevention: {
      screen: Prevention,
      navigationOptions: () => ({
        headerBackTitle: null,
      }),
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#006cc4',
        height: 80,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 25,
      },
    },
  }
);

const DiagnoseStack = createStackNavigator(
  {
    SelectList1: {
      screen: SelectList1,
      navigationOptions: () => ({
        headerBackTitle: null,
      }),
    },
    SelectList2: {
      screen: SelectList2,
      navigationOptions: () => ({
        headerBackTitle: null,
      }),
    },
    SelectList3: {
      screen: SelectList3,
      navigationOptions: () => ({
        headerBackTitle: null,
      }),
    },
    SelectList4: {
      screen: SelectList4,
      navigationOptions: () => ({
        headerBackTitle: null,
      }),
    },
    SelectList5: {
      screen: SelectList5,
      navigationOptions: () => ({
        headerBackTitle: null,
      }),
    },
    Results: {
      screen: Results,
      navigationOptions: () => ({
        headerBackTitle: null,
      }),
    },
  },
  {
    swipeEnabled: true,
    initialRouteName: 'SelectList1',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#006cc4',
        height: 65,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 21,
      },
    },
  }
);

const AppContainer = createAppContainer(
  createBottomTabNavigator(
    {
      Home: HomeStack,
      Test: DiagnoseStack,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  )
);

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
  } else if (
    routeName === 'Test' ||
    routeName === 'Detail' ||
    routeName === 'Results'
  ) {
    iconName = `ios-search`;
  }
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

export default AppContainer;
