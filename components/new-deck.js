import React, {Component} from "react"
import {Text, View, StyleSheet, TextInput} from "react-native";
import {DeckButton, FlashCardInput} from "./forms";
import {saveDeckTitle} from "../utils/api";
import {NavigationActions} from "react-navigation";


export default class NewDeck extends Component{

    static navigationOptions = {
        title: 'new Deck',
    };

    state = {
        text: ""
    }

    createDeck = () => {
        saveDeckTitle(this.state.text)
            .then((newDeck)=>{
                const resetAction = NavigationActions.reset({
                    index: 1,
                    actions: [
                        NavigationActions.navigate({routeName: "deckList"}),
                        NavigationActions.navigate({routeName: "deckDetail", params: {deck: newDeck}})
                    ]
                })
                this.props.navigation.dispatch(resetAction)
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30}}>
                    What is the title of your new Deck?
                </Text>
                <FlashCardInput
                    autoFocus
                    placeholder="Deck Title"
                    onChangeText={(text) => this.setState({text})}
                />

                <DeckButton
                    primary

                    title="Submit"
                    onPress={this.createDeck}
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
    },
})