import React from 'react';
import {StackNavigator} from "react-navigation";
import Quiz from "./components/quiz";
import DeckList from "./components/deck-list";
import NewDeck from "./components/new-deck";
import Deck from "./components/deck";

const SimpleApp = StackNavigator({
    deckList: {screen: DeckList},
    quiz: { screen: Quiz},
    newDeck: {screen: NewDeck},
    deckDetail: {screen: Deck}
});

export default class App extends React.Component {

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
    }

  render() {
    return (
        <SimpleApp/>
    );
  }
}
