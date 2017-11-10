import React, {Component} from "react"
import {Animated, Text, View, StyleSheet, Button, TouchableOpacity} from "react-native";

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
        answers: {},
        displayedSide: SIDE.QUESTION
    }


    componentWillMount() {
        this.animatedValue = new Animated.Value(0);

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })

        this.displayedSide = SIDE.QUESTION;
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

    flipCard = () => {
        const displayedSide = this.state.displayedSide === SIDE.QUESTION?SIDE.ANSWER:SIDE.QUESTION

        if (displayedSide === SIDE.QUESTION) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
        this.setState({displayedSide})
    }

    render(){

        const {navigation} = this.props
        const {deck} = navigation.state.params
        const {currentQuestionIdx, answers} = this.state

        const displayedSide = this.state.displayedSide

        return (
            <View style={styles.container}>
                {currentQuestionIdx < deck.questions.length ?
                    <QuizPanel
                        frontInterpolate={this.frontInterpolate}
                        backInterpolate={this.backInterpolate}

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

const QuizPanel = ({frontInterpolate, backInterpolate, currentQuestion ,numberOfQuestions, displayedSide, currentQuestionIdx, flipCard, putAnswer}) => {

    const frontAnimatedStyle = {
        transform: [
            { rotateY: frontInterpolate}
        ]
    }
    const backAnimatedStyle = {
        transform: [
            { rotateY: backInterpolate}
        ]
    }

    return (
        <View style={{flex: 1}}>

            <Animated.View
                pointerEvents={displayedSide===SIDE.QUESTION?"auto":"none"}
                style={[frontAnimatedStyle, styles.flipCard]}>
                <Text style={styles.questionCounter}>
                    {currentQuestionIdx + 1} / {numberOfQuestions}
                </Text>
                <View style={styles.contentPanel}>
                    <Text style={styles.contentText}>
                        {currentQuestion.question}
                    </Text>
                    <Button
                        title="show Answer"
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
            </Animated.View>

            <Animated.View
                pointerEvents={displayedSide===SIDE.ANSWER?"auto":"none"}
                style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                <Text style={styles.questionCounter}>
                    {currentQuestionIdx + 1} / {numberOfQuestions}
                </Text>
                <View style={styles.contentPanel}>
                    <Text style={styles.contentText}>
                        {currentQuestion.answer}
                    </Text>
                    <Button
                        title="Go Back To Question"
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
            </Animated.View>


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
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    flipCard:{
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: "hidden"
    },
    flipCardBack: {
        position: "absolute",
        top: 0,
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