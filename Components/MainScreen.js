import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Ionicons as Icon } from '@expo/vector-icons'
import { TabNavigator } from 'react-navigation'

import HomeTab from './AppTabNavigator/HomeTab'
import SearchTab from './AppTabNavigator/SearchTab'
import VideoTab from './AppTabNavigator/VideoTab'
import SocialTab from './AppTabNavigator/SocialTab'
import ProfileTab from './AppTabNavigator/ProfileTab'


const AppTabNavigator = TabNavigator({
  Home: {
    screen: HomeTab
  },
  Browse: {
    screen: SearchTab
  },
  WhatsPoppin: {
    screen: VideoTab
  },
  // SocialTab:{
  //   screen: SocialTab
  // },
  ProfileTab: {
    screen: SocialTab
  },
}, {
    animationEnabled: false,
    swipeEnabled: false,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: '#fe3f00',
      inactiveTintColor: '#d1cece',
      showLabel: true,
      showIcon: true
    },
  })


class MainScreen extends React.Component {
  render() {
    let tabBarHeight = 0;

    return (
      <AppTabNavigator
        tabBarStyle={{ height: 0, overflow: 'hidden' }}
        sceneStyle={{ paddingBottom: 0 }}
        screenProps={{ topLevelNavigator: this.props.navigation }}
      />
    );
    // <TouchableOpacity> <View style={{backgroundColor: 'blue'}}> </View></TouchableOpacity>
  }
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  subheader: {
    // fontWeight:'bold',
    fontSize: 12,
  },
});
