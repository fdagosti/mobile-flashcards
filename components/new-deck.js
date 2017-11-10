import React, {Component} from "react"
import {Text, View, StyleSheet, TextInput} from "react-native";
import {DeckButton} from "./forms";
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
            .then(()=>{
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: "deckList"})
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
                <View style={styles.inputContainer}>
                    <TextInput
                        autoFocus
                        placeholder="Deck Title"
                        style={styles.deckTitleInput}
                        onChangeText={(text) => this.setState({text})}
                    />
                </View>

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
    inputContainer: {
        alignSelf:"stretch",
        padding: 10,
        borderWidth:1,
        borderRadius: 5,
        marginBottom: 40,
        marginTop: 40,
    },
    deckTitleInput: {
        fontSize: 20,
        borderBottomColor: "black",
        borderBottomWidth:1
    }

})