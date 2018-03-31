import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, FlatList, ImageBackground, Dimensions, ScrollView, ListView } from 'react-native';
import { StackNavigator } from 'react-navigation'
import GridView from 'react-native-super-grid';
import Swiper from 'react-native-swiper';
import { Container, Header, Content, List, ListItem, Card, Form, Button } from 'native-base';
import { Ionicons as Icon } from '@expo/vector-icons'
import SideSwipe from 'react-native-sideswipe';
import { SearchBar } from 'react-native-elements'
import * as firebase from 'firebase';
import * as Animatable from 'react-native-animatable';



export default class LogInTab extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={() => { this.props.navigation.push('StackScreen')}}> Hi </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
