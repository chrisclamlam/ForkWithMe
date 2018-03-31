import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView,Animated } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Container, Content } from 'native-base'
import CardComponent from '../CardComponent'
import { Ionicons as Icon } from '@expo/vector-icons'
import CardSwiper from '../CardSwiper'
import SideSwipe from 'react-native-sideswipe';
import Swiper from 'react-native-swiper';
import ControlBanner from '../ControlBannerHeader'
import { SearchBar } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';

// import data from '../../data/data.json'

export default class HomeTab extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
    }
    this.didTapArticle = this.didTapArticle.bind(this)
  }


  componentDidMount() {
    fetch('https://firebasestorage.googleapis.com/v0/b/resturantjson.appspot.com/o/data.json?alt=media&token=19d74a60-d651-492f-8e2b-5285760eade1')
      // fetch(require("../../data/data.json"))

      .then((res) => {
        return res.json()
      })
      .then((res) => {
        this.setState({
          articles: res.articles
        })
      })
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-home" style={{
        color:
          tintColor, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
      }} />
      // <Image source={require('../../images/footerlogo.png')}
      // style={{transform:[{scaleX: 0.55},{scaleY:0.55}]}}
      // />
    )
  }

  didTapArticle(article) {
    console.log("GOT PRESSED!!!")
    this.props.screenProps.topLevelNavigator.push('MapNArticle', { article })
  }

  render() {
    // console.log(articles)
    return (
      <Container style={styles.container}>
        <ControlBanner topLevelNavigator={this.props.screenProps.topLevelNavigator} />

        <Content>
          {/* <CardSwiper /> */}

          {/* <View style={{height: 200}}> 
          <ScrollView style={{flex: 0.5}} horizontal={true} pagingEnabled= {true}>
                <View style={{backgroundColor: 'red', width:325}}/>
                <View style={{backgroundColor: 'blue', width:325}}/>
                <View style={{backgroundColor: 'green', width:325}}/>

          </ScrollView>
          </View> */}
          <View style={{ height: 225, marginLeft: 0, marginRight: 0, marginTop: 7 }}>
            <Swiper
              style={styles.wrapper}
              showsButtons={true}
              showsPagination={false}
              loop={true} autoplay={false}
              autoplayTimeout={5}
              // nextButton = {<Text style={{color:'white',fontSize: 60}}>›</Text>}
              nextButton={<Icon name="md-home" style={{ color: 'white', fontSize: 20 }} />}
              prevButton={<Icon name="md-home" style={{ color: 'white', fontSize: 20 }} />}


            >
              <View style={styles.slide2}>
                <Image style={{ flex: 1 }}
                  source={{ uri: 'https://videoapp-assets-ak.buzzfeed.com/prod/video_thumbnails/45d35d4ba67f4e86818dba20e291d2fc.JPEG' }}
                />
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

          {/* <Text  style={styles.heading}> Most Recent</Text> */}
          <Animatable.Text  animation="fadeIn" style={styles.heading}> Most Recent</Animatable.Text>
          
          {this.state.articles.map((article) => {
            return <CardComponent onPress={() => { this.didTapArticle(article) }} key={article.link} article={article} />
          })}


          {/* <CardComponent imageSource="4" articleTitle='28 Droolworthy Junk Food Treats To Eat In L.A.' subTitle="Not everything in the city of angels involves kale."/>
          <CardComponent imageSource="5" articleTitle='13 Cafes That Make LA The New Mecca For Coffee' subTitle="Caffeine fest from Santa Monica to Silverlake"/> */}

        </Content>


      </Container>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    justifyContent: 'center',
    marginTop: 20,
    fontSize: 20,
    marginLeft: '2.5%',
    fontWeight: '700',
    color: '#333333'
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
