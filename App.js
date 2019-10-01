import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import axios from 'axios';

import Listen from './components/Listen';
import AnswerInput from './components/AnswerInput';
import Result from './components/Result';
import AnswerModal from './components/AnswerModal';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answer:'',
      visible: false,
      correctOrNot: null,
      song:'',
      show: false,
    }
    this.receiveAnswer = this.receiveAnswer.bind(this);
    this.exit = this.exit.bind(this);
    this.shuffleSong = this.shuffleSong.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.exitWAnswer = this.exitWAnswer.bind(this);
  }

  componentDidMount(){
    this.shuffleSong();
  }

  shuffleSong(){
    axios.get('https://trviviagame.firebaseio.com/songs.json')
    .then((res)=>{
      let song =res.data[Math.floor(Math.random()*30)];
      // console.log('in app',uri);
      console.log(song);
      this.setState({
        answer:song,
        song:song,
      })
    })
    .catch((err)=>{
      console.log('err',err)
    })

    if(this.state.show){
      this.setState({
        show: false
      })
    }
  }

  receiveAnswer(answer){
    let modifiedAns = (answer.split(' ').join('')).toLowerCase()
    let correctAnswer = ((this.state.answer).split(' ').join('')).toLocaleLowerCase()
    if(correctAnswer === modifiedAns){
      this.setState({
        visible:true,
        correctOrNot: true,
      })
    }else{
      this.setState({
        visible:true,
        correctOrNot: false,
      })
    }
  }

  showAnswer(){
    this.setState({
      show: !this.state.show
    })
  }

  exit(){
    this.setState({
      visible:false,
    })
  }

  exitWAnswer(){
    this.setState({
      visible:false,
    })
    this.shuffleSong();
  }

  render() {

    return (
      <View style={styles.container}>
        <Listen song={this.state.song}/>
        <AnswerInput receiveAnswer={this.receiveAnswer}/>
        <Result 
          answer={this.state.answer} 
          visible={this.state.visible} 
          correctOrNot={this.state.correctOrNot} 
          exitexitWAnswer={this.exitWAnswer}
          exit={this.exit} 
          shuffleSong={this.shuffleSong}/>
        <View style={styles.buttons}>
          <Button color='#f9c133' title="ANSWER" onPress={this.showAnswer}/>
          {this.state.show && (
            <AnswerModal answer={this.state.answer} exit={this.exitWAnswer} />
          )}
          <Button color='#f9c133' title="NEXT" onPress={this.shuffleSong} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttons:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
    margin: 50
  },
  question:{
    padding: 5,
    margin: 5,
    height: 100,
    width: 100,
    resizeMode: 'stretch',
  }

});
