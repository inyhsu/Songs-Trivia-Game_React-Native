import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';

export default class AnswerInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            enterInput:'',
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    inputHandler(e){
        // console.log(e.nativeEvent.text)
        this.setState({
            enterInput: e.nativeEvent.text
        })
    }

    handleSubmit(){
        this.props.receiveAnswer(this.state.enterInput);
        this.setState({
            enterInput:'', 
        })
    }
    
    render(){
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="What's your answer"
                    style={styles.input}
                    onChange={this.inputHandler}
                    value = {this.state.enterInput}
                />
                <Button color='#f9c133' title="Enter" onPress={this.handleSubmit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin:50
    },
    input: {
        fontSize: 20,
        padding: 10,
        borderRadius: 10,
        width: '80%'
    },
})

