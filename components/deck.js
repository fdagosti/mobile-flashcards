import React, {Component} from "react"
import {Text} from "react-native";


export default class Deck extends Component{

    static navigationOptions = {
        title: 'Deck',
    };

    render(){
        return (<Text>Hello I am A deck</Text>)
    }
}