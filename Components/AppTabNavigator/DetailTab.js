import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Ionicons as Icon } from '@expo/vector-icons'

export default class DetailTab extends React.Component {

  
  render() {
    
    var restaurant = this.props.navigation.state.params.restaurant;
    
    return (
      <View style={styles.container}>
        <Text> {restaurant.name}</Text>



        {/* YEE BOI NOW TIME TO STYLE */}




      </View>
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
