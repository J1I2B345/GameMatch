import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants';
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
               <Text
                    key={chatMessage}
                    style={{
                         margin: 5,
                         padding: 13,
                         borderRadius: 15,
                         width: 65,
                         color: '#fff',
                         textAlign: 'center',
                         backgroundColor: '#655EBE',
                    }}
               >
                    {chatMessage}
               </Text>
          ));

          return (
               <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                         <Text
                              style={{
                                   marginTop: Constants.statusBarHeight,
                                   marginBottom: 10,
                                   width: '100%',
                                   color: 'white',
                                   textAlign: 'center',
                                   fontSize: 30,
                              }}
                         >
                              User
                         </Text>
                         <View
                              style={{
                                   height: 2,
                                   width: '90%',
                                   backgroundColor: '#98228C',
                              }}
                         ></View>
                    </View>
                    <View style={{ margin: 10 }}>{chatMessages}</View>
                    <View
                         style={{
                              position: 'absolute',
                              width: '80%',
                              bottom: 55,
                              left: 8,
                              borderRadius: 50,
                         }}
                    >
                         <TextInput
                              style={{
                                   height: 45,
                                   borderWidth: 1,
                                   borderRadius: 50,
                                   textAlign: 'center',
                                   backgroundColor: '#fff',
                              }}
                              placeholder="Message"
                              autoCorrect={false}
                              value={this.state.chatMessage}
                              onSubmitEditing={() => this.submitChatMessage()}
                              onChangeText={(chatMessage) => {
                                   this.setState({ chatMessage });
                              }}
                         />
                    </View>
                    <View
                         style={{
                              position: 'absolute',
                              padding: 10,
                              width: 45,
                              height: 45,
                              right: 10,
                              bottom: 55,
                              borderRadius: 50,
                              backgroundColor: '#443ABB',
                              justifyContent: 'center',
                         }}
                    >
                         <Image
                              source={require('../../assets/iconSend.png')}
                              style={{ width: '100%', height: '100%' }}
                         />
                    </View>
                    <Nav />
               </View>
          );
     }
}
const styles = StyleSheet.create({
     container: {
          height: '100%',
     },
});
