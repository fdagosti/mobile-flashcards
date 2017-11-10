import React, {Component} from "react"
import {Button, Text, StyleSheet, View, TouchableOpacity} from "react-native";



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
})