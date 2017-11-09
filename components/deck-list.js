import React, {Component} from "react"
import {Button, FlatList, Text, View, StyleSheet, TouchableOpacity} from "react-native";



export default class DeckList extends Component{

    static navigationOptions = {
        title: 'DECKS',
    };


    state = {
        decks: {
            React: {
                title: 'React',
                questions: [
                    {
                        question: 'What is React?',
                        answer: 'A library for managing user interfaces'
                    },
                    {
                        question: 'Where do you make Ajax requests in React?',
                        answer: 'The componentDidMount lifecycle event'
                    }
                ]
            },
            JavaScript: {
                title: 'JavaScript',
                questions: [
                    {
                        question: 'What is a closure?',
                        answer: 'The combination of a function and the lexical environment within which that function was declared.'
                    }
                ]
            }
        }
    }

    goToDeckScreen = (deckName)=>{
        this.props.navigation.navigate("deckDetail", {deckTitle: deckName})
    }

    _renderItem = ({item}) => {
        console.log("render item ",this.props)
        return (
        <TouchableOpacity
            id={item.id}
            style={{paddingBottom: 50, paddingTop: 50}}
            onPress={()=>this.goToDeckScreen(item.title)}
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
            <View >
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />


            </View>)
    }
}

const styles = StyleSheet.create({
    deckTitle: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    deckSize: {
        textAlign: "center",
        color: "grey"
    }
})