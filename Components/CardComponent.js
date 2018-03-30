import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, WebView, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';


export default class CardComponent extends React.Component {

    render() {
        const images = {
            "1": require('../images/icecream.jpeg'),
            "2": require('../images/cheapeats.png'),
            "3": require('../images/musteat.png'),
            "4": require('../images/junkfood.png'),
            "5": require('../images/coffee.png'),
            "6": require('../images/vegan.png')

        }
        // console.log("ATILCEWULR", this.props.article.image_url)
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='transparent'>
                <Card>
                    <CardItem style={{ paddingBottom: 0 }}>
                        <Left>
                            <Text style={styles.header}>{this.props.article.name}</Text>
                            {/* //MAYBE ADD BUZZFEED VERIFIED BUTTON HERE */}
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text style={styles.subheader}>{this.props.article.subTitle}</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Image
                            source={{ uri: this.props.article.image_url }}
                            style={{ marginTop: 0, height: 130, flex: 1, width: null, borderRadius: 3 }}
                        />
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
});
