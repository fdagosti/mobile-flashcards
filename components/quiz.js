import React, {Component} from "react"
import {Text} from "react-native";


export default class Quiz extends Component{

    static navigationOptions = {
        title: 'Quiz',
    };

    render(){
        return (<Text>Hello I am a Quizz</Text>)
    }
}