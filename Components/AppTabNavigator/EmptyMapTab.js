import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, WebView } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { MapView } from 'expo';
import { Button, Header, SearchBar } from 'react-native-elements';
import ControlBanner from '../ControlBannerHeader'
import { Icon } from 'native-base'
import openMap from 'react-native-open-maps';
import Swiper from 'react-native-swiper';


export default class MapTab extends React.Component {

  constructor(props) {
    super(props)
    // console.log("GOT PROPSSS", props)
    let points = [];
    if (props.navigation.state.params) {
      points = props.navigation.state.params.article.restaurants
    }
    this.state = {
      points
    }
  }
  _goGrub(coordinates) {
    console.log("GET REKT", coordinates)
    openMap(coordinates);
    console.log("need to get lat/long coordinates so we can open maps")
    // openMap({ latitude: 37.865101, longitude: -119.538330 });

  }

  render() {
    let initregion = {
      latitude: 34.052234,
      longitude: -118.243685,
      latitudeDelta: 0.692,
      longitudeDelta: 0.0821,
    }

    //SET THE INTIAL POSITION TO BE THE USERS CURRENT LOCATION AND ADJUST DELTA FOR PERFECT MAPVIEW
    //PROB USE WATCH ID AND COMPONENT DID MOUNT


    return (
      <View style={styles.container}>
        <MapView
          ref={component => this._MapView = component}
          style={{ flex: 1 }}
          region={initregion}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          zoomEnabled={true}
          scrollEnabled={true}
          rotateEnabled={false}>
          {this.state.points.map((restaurant) => {
            return (<MapView.Marker
              key={restaurant.id}
              coordinate={restaurant.coordinates}
              title={restaurant.name}
              description={"Rating: " + restaurant.rating.toString()}
              image={require('../../images/icon.png')}
            >
              <MapView.Callout style={styles.calloutcontainer} tooltip={true}>
                <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 0, marginLeft: 5 }}>
                  <TouchableHighlight underlayColor='transparent' >
                    <View style={{ padding: 0 }}>
                      {/* <Button 
              text= "fdsa" 
              buttonStyle={styles.calloutbutton}> */}
                      <Text style={{ marginLeft: 0, fontWeight: 'bold', paddingLeft: 10, paddingTop: 5, paddingRight: 10 }}> {restaurant.name} </Text>
                      <Text style={{ marginLeft: 0, paddingLeft: 10, paddingBottom: 5 }}> Rating: {restaurant.rating.toString()}</Text>
                      {/* <Button 
                // title={restaurant.rating.toString()} 
                // textStyle={{color: 'black'}} 
                buttonStyle={{backgroundColor:'transparent'}}>
                </Button> */}
                      <Button
                        buttonStyle={{ backgroundColor: '#4cd964', borderRadius: 5, padding: 5, flex: 1, width: 300 }}
                        title="GO"
                        onPress={() => { this._goGrub(restaurant.coordinates) }}
                      />
                      {/* </Button> */}
                    </View>
                  </TouchableHighlight>
                </View>
              </MapView.Callout>
            </MapView.Marker>
            )
          })}
          <View style={styles.button1} onPress={() => { this._MapView.animateToRegion(initregion) }} />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  button1: {
    paddingTop: '15%',
    paddingLeft: '90%',
    // justifyContent: "flex-end",
    // alignItems: "center",
    width: 20,
    height: 20,
    // backgroundColor: "white "
  },
  calloutcontainer: {
    padding: 0,
  },
  calloutbutton: {
    backgroundColor: 'red',
    flex: 1,
  }
});
