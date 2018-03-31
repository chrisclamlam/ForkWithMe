import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Ionicons as Icon } from '@expo/vector-icons'
import Carousel from 'react-native-snap-carousel';
import Stars from 'react-native-stars-rating';
import Swiper from 'react-native-swiper';
import { MapView } from 'expo';


export default class SocialTab extends React.Component {


  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-home" style={{
        color:
          tintColor, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
      }} />
    )
  }
  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={{ height: 225}}>
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            showsPagination={false}
            loop={true} autoplay={false}
            autoplayTimeout={5}
            // nextButton = {<Text style={{color:'white',fontSize: 60}}>›</Text>}
            nextButton={<Icon name="arrow-with-circle-right" style={{ color: 'white', fontSize: 20 }} />}
            prevButton={<Icon name="arrow-with-circle-left" style={{ color: 'white', fontSize: 20 }} />}
          >
            <View style={styles.slide2}>
              <Image style={{ flex: 1 }} source={{ uri: 'https://s3-media4.fl.yelpcdn.com/bphoto/l4cf_tzaRp4iQpVVQaZsmA/o.jpg' }} />

            </View>
            <View style={styles.slide3}>
              <Image style={{ flex: 1 }}
                source={{ uri: 'https://pbs.twimg.com/profile_images/696737282376617985/6wDlLbyD_400x400.png' }}
              />
            </View>
            <View style={styles.slide1}>
              <Image style={{ flex: 1 }}
                source={{ uri: 'https://images1.laweekly.com/imager/u/745x420/8206556/17630128_850211821783674_5186323642700063587_n.jpg' }}
              />
            </View>
          </Swiper>
        </View>

        <View style={{ height: 100 }}>
          <Text style={styles.heading}> Shrimp Daddy</Text>
          <View style={{ marginLeft: '3.5%', marginBottom: 5, flexDirection: 'row' }}>
           {/*  Stars go here: <Stars isActive={true} rateMax={5} isHalfStarEnabled={true} rate={4} size={15} /> */}
            <Text> (35) </Text>
          </View>
        </View>
        <View style={{ height: 200 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
        <View style={{ height: 200, marginTop: 5 }}>
          <Text> Description</Text>
          <Text> Description: afdsafdsafdsafdsafdsafd</Text>
        </View>
      </ScrollView>
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
  heading: {
    justifyContent: 'center',
    // marginTop: '10%',
    fontSize: 35,
    // marginLeft: '2.5%',
    // fontWeight: '700',
    // color: '#333333'
    color: 'black',
    fontWeight: '500'

  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#9DD6EB',
    borderRadius: 5
  },
  slide2: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
});
