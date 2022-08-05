import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';
import Nav from './Nav';

export default class Chat extends Component {
     constructor(props) {
          super(props);
          this.state = {
               chatMessage: '',
               chatMessages: ['Hola', 'adios'],
          };
     }

     componentDidMount() {
          this.socket = io('https://backend-gamematch.herokuapp.com');
          this.socket.on('chat message', (msg) => {
               this.setState({ chatMessages: [...this.state.chatMessages, msg] });
          });
     }

     submitChatMessage() {
          this.socket.emit('chat message', this.state.chatMessage);
          this.setState({ chatMessage: '' });
     }
     render() {
          const chatMessages = this.state.chatMessages.map((chatMessage) => (
               <Text key={chatMessage}>{chatMessage}</Text>
          ));

          return (
               <View style={styles.container}>
                    <TextInput
                         style={{ height: 80, borderWidth: 2 }}
                         autoCorrect={false}
                         value={this.state.chatMessage}
                         onSubmitEditing={() => this.submitChatMessage()}
                         onChangeText={(chatMessage) => {
                              this.setState({ chatMessage });
                         }}
                    />
                    {chatMessages}
                    <Nav />
               </View>
          );
     }
}
const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#F5FCFF',
     },
});
