import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, FlatList, ImageBackground, Dimensions, ScrollView, ListView } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Icon, Container, Header, Content, List, ListItem, Form, Button } from 'native-base';
import * as Animatable from 'react-native-animatable';

var events = ["hi", 'fds']

export default class VideoTab extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })

    this.state = {
      listViewData: events,
    }
  }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-play" style={{
        color:
          tintColor, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
      }} />
    )
  }

  render() {
    const { width, height } = Dimensions.get("window");
    const CARD_HEIGHT = height / 4;
    const CARD_WIDTH = CARD_HEIGHT - 50;
    return (
      <View style={styles.container}>
        <Text style={styles.dateheading}> WEDNESDAY, MARCH 28</Text>

        <Animatable.Text animation="fadeIn" style={styles.heading}>Community</Animatable.Text>

        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={events =>
              <ListItem>
                <View style={{ flexDirection: 'column' }}>
                  {/* <Text numberOfLines={1} style={styles.articletext}> {data.val().name} </Text>
                  <Text style={styles.subarticletext}> BuzzFeed </Text> */}
                  <Animatable.Text  animation="bounceInRight" numberOfLines={1} style={styles.articletext}>{events}</Animatable.Text >
                  <Animatable.Text  animation="bounceInRight" style={styles.subarticletext}> Location </Animatable.Text >
                </View>
              </ListItem>
            }
            renderRightHiddenRow={data =>
              <Button full>
                <Icon name="ios-eye" />
              </Button>
            }
            disableRightSwipe={true}
            rightOpenValue={-50}
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
    // marginTop: '10%',
    fontSize: 35,
    marginLeft: '2.5%',
    fontWeight: '700',
    color: '#333333'
  },
  dateheading: {
    justifyContent: 'center',
    marginTop: '10%',
    fontSize: 12,
    marginLeft: '2.5%',
    fontWeight: '700',
    color: 'rgb(255,45,85)'
  },
  articletext: {
    fontSize: 15,
    marginLeft: '3.5%',
    fontWeight: 'bold',
    // color: 'rgb(255,45,85)'
    overflow: 'hidden',
    marginLeft: '2.5%',

  },
});
