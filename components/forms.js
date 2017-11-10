import React, {Component} from "react"
import {Button, Text, StyleSheet, View, TouchableOpacity, TextInput} from "react-native";



export const DeckButton = ({title, primary, onPress}) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.button,{backgroundColor: primary? "black": "transparent"}]}
    >
        <Text
            style={{fontSize: 20, color: primary? "white": "black"}}
        >{title}</Text>
    </TouchableOpacity>
)


export const FlashCardInput = (props)=>(
    <View style={styles.inputContainer}>
        <TextInput
            {...props}
            style={styles.deckTitleInput}
        />
    </View>
)

const styles = StyleSheet.create({
    button: {
        borderWidth:2,
        borderColor:"black",
        alignItems: "center",
        padding: 10,
        minWidth: 200,
        marginBottom:10,
        borderRadius: 5
    },
    deckTitleInput: {
        fontSize: 20,
        borderBottomColor: "black",
        borderBottomWidth:1
    },
    inputContainer: {
        alignSelf:"stretch",
        padding: 10,
        borderWidth:1,
        borderRadius: 5,
        marginBottom: 25,
        marginTop: 25,
    },
})