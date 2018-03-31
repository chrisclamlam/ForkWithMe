import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, FlatList, ImageBackground, Dimensions, ScrollView, ListView } from 'react-native';
import { StackNavigator } from 'react-navigation'
import GridView from 'react-native-super-grid';
import Swiper from 'react-native-swiper';
import { Ionicons as Icon } from '@expo/vector-icons'
import { Container, Header, Content, List, ListItem, Card, Form, Button } from 'native-base';
import SideSwipe from 'react-native-sideswipe';
import { SearchBar } from 'react-native-elements'
import * as firebase from 'firebase';
import * as Animatable from 'react-native-animatable';


const firebaseConfig = {
  apiKey: "AIzaSyDMaWp2_r0BI__NbilkhjQoXq7uv6Szobc",
  authDomain: "resturantjson.firebaseapp.com",
  databaseURL: "https://resturantjson.firebaseio.com",
  projectId: "resturantjson",
  storageBucket: "resturantjson.appspot.com",
  messagingSenderId: "257714952068"
};
firebase.initializeApp(firebaseConfig);

var data = []

export default class SearchTab extends React.Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })

    this.state = {
      listViewData: data,
      listViewDataFull: data,
      searchText: "",
    }
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-home" style={{
        color:
          tintColor, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
      }} />
    )
  }

  state = {
    currentIndex: 0,
    searchText: "",
  };

  componentDidMount() {
    var that = this

    firebase.database().ref('/articles').on('child_added', function (data) {
      var newData = [...that.state.listViewData]

      newData.push(data)
      that.setState({ listViewDataFull: newData })
    })
  }

  searchDB() {

    console.log(this.state.searchText);
    // console.log(firebase.database().ref('/articles')

  }


  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.heading}> Browse </Text> */}
        {/* <Text style={styles.dateheading}>WEDNESDAY, MARCH 28</Text> */}

        <Animatable.Text  animation="fadeIn" style={styles.heading}>Browse</Animatable.Text>

        <SearchBar
          showLoading
          lightTheme
          platform="ios"
          cancelButtonTitle="Cancel"
          containerStyle={{ backgroundColor: 'transparent', borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
          inputStyle={{ backgroundColor: 'transparent' }}
          placeholder='Articles'
          onChangeText={(text) => this.setState({ searchText: text, listViewData: this.state.listViewData.filter((item) => {
            return item.val().name.indexOf(text) != -1
          }) })}
          onSubmitEditing={() => this.searchDB()}
        />

        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <View style={{ flexDirection: 'column' }}>
                  {/* <Text numberOfLines={1} style={styles.articletext}> {data.val().name} </Text>
                  <Text style={styles.subarticletext}> BuzzFeed </Text> */}
                  <Animatable.Text  animation="bounceInRight" numberOfLines={1} style={styles.articletext}> {data.val().name} </Animatable.Text >
                  <Animatable.Text  animation="bounceInRight" style={styles.subarticletext}> BuzzFeed </Animatable.Text >
                </View>
              </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full>
                <Icon name="md-home" />
              </Button>
            }
            disableLeftSwipe={true}
            leftOpenValue={50}
          />
        </Content>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    justifyContent: 'center',
    marginTop: '13%',
    fontSize: 35,
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
  articletext: {
    fontSize: 15,
    marginLeft: '3.5%',
    fontWeight: 'bold',
    // color: 'rgb(255,45,85)'
    overflow: 'hidden'
  },
  subarticletext: {
    fontSize: 12,
    marginLeft: '3.5%',
    marginTop: 2,

    fontWeight: 'normal',
    color: 'rgb(255,45,85)'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',

  },
});
