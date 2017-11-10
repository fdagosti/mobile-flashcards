import React, {Component} from "react"
import {Text, View, StyleSheet} from "react-native";
import {DeckButton, FlashCardInput} from "./forms";
import {addCardToDeck, saveDeckTitle} from "../utils/api";
import {NavigationActions} from "react-navigation";


export default class NewQuestion extends Component{

    static navigationOptions = {
        title: 'Add Card',
    };

    state = {
        question: "",
        answer: ""
    }

    createCard = ()=> {
        const {question, answer} = this.state

        const {deck} = this.props.navigation.state.params



        addCardToDeck(deck.title,{question, answer})
            .then((newlyUpdatedDeck)=>{
                const resetAction = NavigationActions.reset({
                    index: 1,
                    actions: [
                        NavigationActions.navigate({routeName: "deckList"}),
                        NavigationActions.navigate({routeName: "deckDetail", params: {deck: newlyUpdatedDeck}})
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            })
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30}}>
                    Write a question and its corresponding answer
                </Text>
                <FlashCardInput
                    autoFocus
                    placeholder="Question"
                    onChangeText={(question) => this.setState({question})}
                />

                <FlashCardInput
                    placeholder="Answer"
                    onChangeText={(answer) => this.setState({answer})}
                />

                <DeckButton
                    primary
                    title="Submit"
                    onPress={this.createCard}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15
    }
})