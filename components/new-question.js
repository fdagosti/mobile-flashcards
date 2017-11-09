import React, {Component} from "react"
import {Text} from "react-native";


export default class NewQuestion extends Component{

    static navigationOptions = {
        title: 'New question',
    };

    render(){
        return (<Text>Hello I am the New Question view</Text>)
    }
}