import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Icon } from 'native-base'

export default class ProfileTab extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-person" style={{
        color:
          tintColor, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
      }} />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> PROFILE </Text>
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
