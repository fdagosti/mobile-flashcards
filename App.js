import React from 'react';
import {StackNavigator} from "react-navigation";
import Quiz from "./components/quiz";
import DeckList from "./components/deck-list";
import NewDeck from "./components/new-deck";
import Deck from "./components/deck";
import NewQuestion from "./components/new-question";
import {setLocalNotification} from "./utils/notifications-helper";

const SimpleApp = StackNavigator({
    deckList: {screen: DeckList},
    quiz: { screen: Quiz},
    newDeck: {screen: NewDeck},
    deckDetail: {screen: Deck},
    newQuestion: {screen: NewQuestion}
});

export default class App extends React.Component {

    componentDidMount(){
        setLocalNotification()
    }

  render() {
    return (
        <SimpleApp/>
    );
  }
}
