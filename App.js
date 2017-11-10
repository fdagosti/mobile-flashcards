import React from 'react';
import {StackNavigator} from "react-navigation";
import Quiz from "./components/quiz";
import DeckList from "./components/deck-list";
import NewDeck from "./components/new-deck";
import Deck from "./components/deck";
import NewQuestion from "./components/new-question";

const SimpleApp = StackNavigator({
    deckList: {screen: DeckList},
    quiz: { screen: Quiz},
    newDeck: {screen: NewDeck},
    deckDetail: {screen: Deck},
    newQuestion: {screen: NewQuestion}
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
