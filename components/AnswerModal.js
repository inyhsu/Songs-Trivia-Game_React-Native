import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Modal } from 'react-native';

export default class AnswerModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let answer = this.props.answer.split(' ').join('');
        let source = {
            uri: `https://mvppic.s3-us-west-1.amazonaws.com/${answer}.jpg`
        }
        console.log(source.uri);
        return (

            <Modal>
                <View style={styles.modalText}>
                    <View style={styles.text}>
                        <Text style={{ fontSize: 35, fontFamily: 'Chalkduster' }} >{this.props.answer}</Text>
                        <Image style={styles.picture} source={source} />
                    </View>
                    <Button color="#f9c133" title="Back" onPress={this.props.exit} />
                </View>
            </Modal>

        )
    }
}

const styles = StyleSheet.create({
    modalText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    picture: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 75,
        margin: 10,
    }
})