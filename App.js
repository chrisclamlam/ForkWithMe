import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation'
import StackScreen from './Components/StackScreen'
import AuthenticateUser from './Components/AuthenticateUser'


export default class App extends React.Component {
  render() {
    return (
      // <StackScreen/>
      <AuthenticateUser/>

    ); 
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
