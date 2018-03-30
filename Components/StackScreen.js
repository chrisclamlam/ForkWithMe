import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import { TabNavigator } from 'react-navigation'

import MainScreen from './MainScreen';
import MapArticleTab from './AppTabNavigator/MapArticleTab';
import EmptyMapTab from './AppTabNavigator/EmptyMapTab';
import DetailTab from './AppTabNavigator/DetailTab';
import MapTab from './AppTabNavigator/MapTab';
import LogInTab from './AppTabNavigator/LogInTab';



const AppStackNavigator = StackNavigator({
  MainScreen: {
    screen: MainScreen,
  },
  MapNArticle: {
    screen: MapArticleTab
  },
  EmptyMap: {
    screen: EmptyMapTab
  },
  DetailTab: {
    screen: DetailTab
  },
  MapTab: {
    screen: MapTab
  },
}, {
    headerMode: "none",
  })

class StackScreen extends React.Component {
  render() {
    return (
      <AppStackNavigator screenProps={{ yo: "da" }} />
    );
  }
}

export default StackScreen;