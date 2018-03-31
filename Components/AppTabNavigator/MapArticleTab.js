import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, WebView, Platform, TouchableOpacity, Dimensions, Animated, Image } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { MapView } from 'expo';
// import MapView, { ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';
import { Button, Header, SearchBar } from 'react-native-elements';
import ControlBanner from '../ControlBannerHeader'
import { Ionicons as Icon } from '@expo/vector-icons'
import openMap from 'react-native-open-maps';
import Swiper from 'react-native-swiper';
import { Constants, Location, Permissions } from 'expo';
// import Stars from 'react-native-stars-rating';
import ActionButton from 'react-native-action-button';


export default class MapTab extends React.Component {


  constructor(props) {
    super(props)
    // console.log("GOT PROPSSS", props)
    const { width, height } = Dimensions.get("window");
    const CARD_HEIGHT = height / 4;
    const CARD_WIDTH = CARD_HEIGHT - 50;
    let points = [];
    let article;
    if (props.navigation.state.params) {
      points = props.navigation.state.params.article.restaurants
      article = props.navigation.state.params.article
    }

    let initregion = {
      latitude: 34.052235,
      longitude: -118.243685,
      latitudeDelta: 0.692,
      longitudeDelta: 0.0821,
    }
    this.state = {
      points,
      article,
      initregion,
      width, height, CARD_HEIGHT, CARD_WIDTH
      // showView: true
    }

  }


  _goGrub(coordinates) {
    console.log("GET REKT", coordinates)
    openMap(coordinates);
    console.log("need to get lat/long coordinates so we can open maps")
    // openMap({ latitude: 37.865101, longitude: -119.538330 });

  }

  componentWillMount() {
    this._getLocationAsync();
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here


    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / this.CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.points.length) {
        index = this.state.points.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          //GET AN ERROR HERE NEED HELP
          console.log(this.state.points[0].coordinates);
          // const { coordinate } = this.state.points[index].coordinates;
          // this.map.animateToRegion(
          //   {
          //     ...coordinate,
          //     latitudeDelta: this.state.region.latitudeDelta,
          //     longitudeDelta: this.state.region.longitudeDelta,
          //   },
          //   350
          // );
        }
      }, 100);
    });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState({
      initregion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.092,
        longitudeDelta: 0.0221,
      }
    });
  };

  render() {
    const interpolations = this.state.points.map((restaurant, index) => {
      //116.75 is CARDWIDTH but used value because I get an Invaraint error or monotomically increasing
      const inputRange = [
        (index - 1) * 116.75,
        index * 116.75,
        ((index + 1) * 116.75),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (

      <Swiper
        // nextButton={
        //   // <Icon name="md-compass" style = {{paddingRight: 5, paddingTop: 27, transform:[{scaleX: 0.8},{scaleY:0.8}], color:'red', marginBottom:5}} 
        //              <View style={{backgroundColor:'red',height:50,width:50,borderRadius: 25,marginTop:35, justifyContent: 'center',alignContent: 'center'}}>
        //                 <Icon name="md-map" style = {{color:'white', marginLeft:'25%'}} />
        //              </View>
        //   }
        buttonWrapperStyle={{
          backgroundColor: 'transparent',
          flexDirection: 'row',
          position: 'absolute',
          top: 0, left: 0, flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }
        }
        showsButtons={true}
        loop={false}
        showsPagination={false}
      >
        <View style={styles.container}>
          <WebView
            source={{ uri: this.state.article.link }}
            style={{ marginTop: 20, backgroundColor: 'white', flex: 1 }}
          />
        </View>

        <View style={styles.container}>
          <MapView
            ref={component => this._MapView = component}
            style={{ flex: 1 }}
            region={this.state.initregion}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            zoomEnabled={true}
            scrollEnabled={true}
            rotateEnabled={false}>
            {this.state.points.map((restaurant, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              const opacityStyle = {
                opacity: interpolations[index].opacity,
              };

              return (
                <MapView.Marker
                  ref={marker => { this.marker = marker; }}
                  key={restaurant.id}
                  coordinate={restaurant.coordinates}
                  title={restaurant.name}
                  description={"Rating: " + restaurant.rating.toString()}
                  image={require('../../images/icon.png')}
                // onPress = {() => console.log('pressed homie')}
                // onPress={() => { this.props.navigation.push('DetailTab')}}

                // NEED TO DO THIS MAKE SMOOTH ANIMATION aka use animatetoRegion method
                // onPress = {() => {this.setState({
                //   initregion: {
                //     latitude: restaurant.coordinates.latitude,
                //     longitude: restaurant.coordinates.longitude,
                //     latitudeDelta: 0.092,
                //     longitudeDelta: 0.0221,
                //   }
                // })}}

                // onMarkerPress={() => {
                //   this.animateToRegion({
                //     region: {
                //       latitude: restaurant.coordinates.latitude,
                //       longitude: restaurant.coordinates.longitude,
                //       latitudeDelta: 0.092,
                //       longitudeDelta: 0.0221,
                //     }
                //   })
                // }}

                >
                  <MapView.Callout style={styles.calloutcontainer} tooltip={true}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 5, marginLeft: 5 }}>
                      <TouchableHighlight underlayColor='transparent' >
                        <View style={{ padding: 0, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                          <View style={{ padding: 0, justifyContent: 'center', alignContent: 'center' }}>
                            <Icon name="information-circle"
                              onPress={() => { this.props.navigation.push('DetailTab', { restaurant }) }}
                              style={{ backgroundColor: 'transparent', justifyContent: 'center', alignContent: 'center' }} />
                          </View>
                          <View>
                            <Text style={{ marginLeft: 0, fontWeight: 'bold', paddingLeft: 5, paddingTop: 5, paddingRight: 10 }}> {restaurant.name} </Text>
                            <View style={{ marginLeft: 10, marginBottom: 5 }}>
                            {/*
                              <Stars
                                isActive={true}
                                rateMax={5}
                                isHalfStarEnabled={true}
                                rate={restaurant.rating}
                                size={10}
                              /> */}
                            </View>
                            {/* <Text style={{marginLeft:0,paddingLeft:10, paddingBottom:5}}> Rating: {restaurant.rating.toString()}</Text> */}
                          </View>





                          {/* <Button 
                        buttonStyle={{backgroundColor: '#4cd964', borderRadius: 5, padding: 5, flex:1, width:300}}
                        title="GO" 
                        onPress={() => { this.props.navigation.push('DetailTab')}}

                        // onPress={() => { this._goGrub(restaurant.coordinates)}}
                        /> */}
                        </View>
                      </TouchableHighlight>
                    </View>
                  </MapView.Callout>


                  {/* <MapView.Marker key={index} coordinate={restaurant.coordinates}>
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <Animated.View style={[styles.ring, scaleStyle]} />
                    <View style={styles.marker} />
                  </Animated.View>
                </MapView.Marker> */}
                </MapView.Marker>
              )
            })}
            {/* <Button style={styles.button1}
              icon={{name: 'navigation', type: 'Ionicons', size:30, color: 'red'}} 
              onPress={() => {this._MapView.animateToRegion(this.state.initregion)}} pointerEvents="none"
              /> */}
            {/* { this.state.showView ? <View style={{backgroundColor: 'red', height: 300, width: 300}} pointerEvents="none"/> : null } */}
          </MapView>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={this.CARD_WIDTH}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
            style={styles.scrollView}
            contentContainerStyle={styles.endPadding}
          > 
          {this.state.points.map((restaurant, index) => (
              <View style={styles.card} key={index}>
                <  Image
                  // {/* //   //IMAGE DOES NOT WORK NEED TO FIX IN THE FURTURE
                  source={{ uri: "https://s3-media2.fl.yelpcdn.com/bphoto/QLZbYL1H5tYrUj-J_mbDWw/o.jpg" }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{restaurant.name}</Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    Rating: {restaurant.rating}
                  </Text>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button1: {
    marginTop: '15%',
    marginLeft: '90%',
    backgroundColor: 'blue',
    width: 30,
    height: 200,
  },
  calloutcontainer: {
    padding: 0,
  },
  calloutbutton: {
    backgroundColor: 'red',
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: this.width - this.CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: this.CARD_HEIGHT,
    width: this.CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    // backgroundColor: "rgba(130,4,150, 0.9)",
    backgroundColor: "red",

  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,0,0, 0.3)",
    // backgroundColor: "red",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255,0,0, 0.5)",
  },
});
