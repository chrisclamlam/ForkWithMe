import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Ionicons as Icon } from '@expo/vector-icons'
import { TabNavigator } from 'react-navigation'

import StackScreen from './StackScreen';
import LogInTab from './AppTabNavigator/LogInTab';



const AppStackNavigator = StackNavigator({
  StackScreen: {
    screen: StackScreen
  },
  LogInTab: {
    screen: LogInTab,
  },
  
}, {
    headerMode: "none",
    navigationOptions: {gesturesEnabled:false}
  })

class AuthenticateUser extends React.Component {
  render() {
    return (
      <AppStackNavigator screenProps={{ yo: "da" }} />
    );
  }
}

export default AuthenticateUser;