import React, {Component} from "react"
import {StyleSheet, Text, View} from "react-native";
import {DeckButton} from "./forms";


export default class Deck extends Component{

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.deck.title}`,
    });


    startQuizz = () => {
        const {navigation} = this.props
        this.props.navigation.navigate("quiz", {deck: navigation.state.params.deck})
    }

    render(){

        const {deck} = this.props.navigation.state.params

        return (
            <View style={styles.container}>
                <View style={styles.titleGroup}>
                    <Text
                        style={styles.deckTitle}
                    >
                        {deck.title}
                    </Text>
                    <Text
                        style={styles.deckSize}
                    >{deck.questions.length} cards</Text>
                </View>
                <View style={styles.buttonGroup}>
                    <DeckButton
                        title="Add Card"
                        onPress={()=> this.props.navigation.navigate("newQuestion", {deck: deck})}
                    />
                    <DeckButton
                        primary
                        title="Start Quiz"
                        onPress={this.startQuizz}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleGroup:{
      flex: 0.7,
        justifyContent: "center"
    },
    buttonGroup: {
        flex: 0.3,
      alignItems:"center",
        justifyContent: "center"
    },
    deckTitle: {
        textAlign: "center",
        fontSize: 40,
    },
    deckSize: {
        textAlign: "center",
        fontSize: 25,
        color: "grey"
    }
})