import React from 'react';
import { Audio } from 'expo-av';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class Listen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            play: false,
        }
        this.playAudio = this.playAudio.bind(this);
    }
    
    playAudio = async () => {

        const soundObject = new Audio.Sound()
        let song = this.props.song.split(' ').join('');
        // console.log(song);
        let source = {
            uri: `https://mvpmusic.s3-us-west-1.amazonaws.com/${song}.mp3`
        }
        // console.log(source.uri);
        try {
            await soundObject.loadAsync(source);
            await soundObject.playAsync();
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={this.playAudio}>
                <Image
                    style={styles.question}
                    source={require('../assets/question.png')}
                />
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 100,
      backgroundColor: '#fff',
      borderRadius: 50,
    },
    question:{
      padding: 5,
      margin: 5,
      height: 150,
      width: 150,
      resizeMode: 'stretch',
    }
  
  });
  