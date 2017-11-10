import React, {Component} from "react"
import {Button, FlatList, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {clearDecks, getDeck, getDecks} from "../utils/api";
import {DeckButton} from "./forms";



export default class DeckList extends Component{

    static navigationOptions = ({navigation}) => ({
        title: 'DECKS',
        headerRight: <Button
            title="Add new Deck"
            onPress={()=>navigation.navigate("newDeck")}
        />
    });


    state = {
        decks: {}
    }

    clearAllDecks = () => clearDecks().then(()=>this.setState({decks: {}}))

    componentWillMount(){
        getDecks().then(decks=> this.setState({decks}))
    }

    goToDeckScreen = (deck)=>{
        this.props.navigation.navigate("deckDetail", {deck: deck})
    }


    _renderItem = ({item}) => {
        return (
        <TouchableOpacity
            id={item.id}
            style={{paddingBottom: 50, paddingTop: 50}}
            onPress={()=>this.goToDeckScreen(item)}
        >
            <Text
                style={styles.deckTitle}
            >
                {item.title}
            </Text>
            <Text
                style={styles.deckSize}
            >{item.questions.length} cards</Text>
        </TouchableOpacity>
    )};

    _keyExtractor = (item, index) => item.title;

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    render(){

        const {navigate} = this.props.navigation

        const {decks} = this.state

        const data = Object.keys(decks).map(deckName=>decks[deckName])

        return (
            <View style={styles.container} >
                {data.length >0 ?
                    <View style={styles.container}>
                        <Button
                            title="clear all decks"
                            color="red"
                            onPress={this.clearAllDecks}
                        />
                        <FlatList
                            ItemSeparatorComponent={this.renderSeparator}
                            data={data}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    </View>
                    :
                    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.infoText}>You do not have any deck. Please create some before</Text>
                        <DeckButton
                            primary
                            title="Create Deck"
                            onPress={()=>navigate("newDeck")}
                        />
                    </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    deckTitle: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    deckSize: {
        textAlign: "center",
        color: "grey"
    },
    infoText: {
        textAlign: "center",
        fontSize: 25,
        color: "grey",
        marginBottom: 20
    }
})