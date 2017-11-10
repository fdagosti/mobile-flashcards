import React, {Component} from "react"
import {Text, View, StyleSheet, Button, TouchableOpacity} from "react-native";

const SIDE = {
    QUESTION: "question",
    ANSWER: "answer"
}

export default class Quiz extends Component{

    static navigationOptions = {
        title: 'Quiz',
    };


    state = {
        currentQuestionIdx: 0,
        displayedSide: SIDE.QUESTION,
        answers: {}
    }

    moveToNextQuestionOrExit = () => {
        this.setState(state=>({currentQuestionIdx: state.currentQuestionIdx+1}))
    }

    putAnswer = (correct) => {
        this.setState(state => ({
            answers: {
                ...state.answers,
                [state.currentQuestionIdx]: correct
            }
        }))
        this.moveToNextQuestionOrExit()
    }

    componentDidUpdate(){
        console.log("after set state ",this.state)
    }


    flipCard = () => this.setState(state => ({displayedSide: state.displayedSide === SIDE.QUESTION?SIDE.ANSWER:SIDE.QUESTION}))

    render(){
        const {navigation} = this.props
        const {deck} = navigation.state.params
        const {currentQuestionIdx, displayedSide, answers} = this.state

        return (
            <View style={styles.container}>
                {currentQuestionIdx < deck.questions.length ?
                    <QuizPanel
                        currentQuestion={deck.questions[currentQuestionIdx]}
                        displayedSide={displayedSide}
                        currentQuestionIdx={currentQuestionIdx}
                        numberOfQuestions={deck.questions.length}
                        flipCard={this.flipCard}
                        putAnswer={this.putAnswer}
                    />:
                    <QuizResult
                        answers={answers}
                        back={()=>navigation.goBack()}
                    />
                }


            </View>
        )
    }
}

const QuizPanel = ({currentQuestion ,numberOfQuestions, displayedSide, currentQuestionIdx, flipCard, putAnswer}) => {

    const contentText = displayedSide === SIDE.QUESTION? currentQuestion.question:currentQuestion.answer
    const buttonLabel = displayedSide === SIDE.QUESTION? "Show Answer" : "Go Back To Question"

    return (
        <View style={{flex: 1}}>
            <Text style={styles.questionCounter}>
                {currentQuestionIdx + 1} / {numberOfQuestions}
            </Text>
            <View style={styles.contentPanel}>
                <Text style={styles.contentText}>
                    {contentText}
                </Text>
                <Button
                    title={buttonLabel}
                    color="red"
                    onPress={flipCard}
                />
            </View>

            <View style={styles.buttonGroup}>
                <QuizButton
                    title="Correct"
                    correct
                    onPress={() => putAnswer(true)}
                />
                <QuizButton
                    title="Incorrect"
                    onPress={() => putAnswer(false)}
                />
            </View>
        </View>
    )
}


const QuizResult = ({answers, back}) => {
    const totalQuestions = Object.keys(answers).length
    const correctNumber = Object.keys(answers).filter(an=>answers[an]).length

        return (
        <View style={{flex: 1}}>
            <View style={styles.contentPanel}>
                <Text
                    style={{textAlign:"center", fontSize:30}}
                >
                    You have answered correctly {correctNumber} times out of {totalQuestions} questions
                </Text>
                <Text style={styles.resultDetailsText}>You correct answer rate if {correctNumber/totalQuestions*100}%</Text>
            </View>
            <Button
                title="Go back to the questions deck"
                onPress={back}
            />
        </View>
)}

const QuizButton = ({title, correct, onPress}) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.button,{backgroundColor: correct? "green": "red"}]}
    >
        <Text
            style={{fontSize: 20, color: "white"}}
        >{title}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    questionCounter: {
      padding:10,
        fontSize: 20
    },
    button: {
        borderWidth:0,
        alignItems: "center",
        padding: 10,
        minWidth: 200,
        marginBottom:10,
        borderRadius: 5
    },
    contentPanel:{
        flex: 0.7,
        padding: 20,
        justifyContent: "center"
    },
    buttonGroup: {
        flex: 0.3,
        alignItems:"center",
        justifyContent: "center"
    },
    contentText: {
        textAlign: "center",
        fontSize: 40,
    },
    resultDetailsText: {
        textAlign: "center",
        fontSize: 20,
        marginTop: 10
    }
})