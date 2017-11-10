import {AsyncStorage} from "react-native"


const DECK_KEY = "flashcards"

export function getDecks(){

    return AsyncStorage.getItem(DECK_KEY)
        .then(decks=>JSON.parse(decks) || {})
        /*.then((decks) => {
            console.log("decks ", decks)

            const defaultDecks = {
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


            return Object.assign(decks||{}, defaultDecks)
        })*/
}

export function getDeck(deckId){

}

export async function saveDeckTitle(title){

    const newDeck = {[title]:{title, questions: []}}

    return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify(newDeck))

}

export function clearDecks(){
    return AsyncStorage.clear()
}

export function addCardToDeck(title, card){

}