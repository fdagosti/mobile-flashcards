import React, {Component} from "react"
import {Text} from "react-native";


export default class NewDeck extends Component{

    static navigationOptions = {
        title: 'new Deck',
    };

    render(){
        return (<Text>Hello I am the New Deck form</Text>)
    }
}