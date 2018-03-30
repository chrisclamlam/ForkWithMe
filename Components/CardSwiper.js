import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, WebView, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import Swiper from 'react-native-swiper';


export default class CardComponent extends React.Component {

  render() {

    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor='transparent'>
        <Card>
          <CardItem style={{ paddingBottom: 0 }}>
            <Left>
              <Text style={styles.header}>TRENDY</Text>
              {/* //MAYBE ADD BUZZFEED VERIFIED BUTTON HERE */}
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Text style={styles.subheader}>Up and coming resturants</Text>
            </Left>
          </CardItem>
          <CardItem>
            <View style={{ backgroundColor: 'transparent', height: 100, shadowOffset: { width: 3, height: 3, }, shadowColor: 'black', shadowOpacity: 0.2, }}>
              <Swiper style={styles.wrapper} showsButtons={true} showsPagination={false}>
                <View style={styles.slide1}>
                  <View style={{ backgroundColor: 'red', justifyContent: 'flex-start' }}>
                    <Text> NAME </Text>
                  </View>
                  <Text style={styles.text}>FEAST MODE</Text>
                </View>
                <View style={styles.slide2}>
                  <Text style={styles.text}>ROMANTIC</Text>
                </View>
                <View style={styles.slide3}>
                  <Text style={styles.text}>CHEAP EAT</Text>
                </View>
              </Swiper>
            </View>



          </CardItem>
        </Card>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  subheader: {
    // fontWeight:'bold',
    fontSize: 12,
  },
  wrapper: {
  },
  slide1: {
    //   flex: 1,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    borderRadius: 5
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
