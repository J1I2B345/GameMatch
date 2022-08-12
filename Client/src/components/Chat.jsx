import { TextInput, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import io from 'socket.io-client';
import Nav from './Nav';
import { useEffect, useState, useRef} from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-native';
import axios from 'axios';


const Chat= ()=> {
   const [chatMessage, setChatMessage] = useState('')
   const [chatMessages, setChatMessages] = useState(['Hola', 'adios'])
   const user = useSelector(state => state.games.user)
   const socket = useRef();
   const {id} = useParams()
   
       
     useEffect(()=>{
          socket.current = io('https://backend-gamematch.herokuapp.com')
          socket.current.emit('joinChat', user)
     }, [])

     useEffect(()=>{
          socket.current.on('server: send message', msg => setChatMessages([...chatMessages, msg.msg]))
     }, [])

     function handleChange(e){
          setChatMessage(e)
     }

     async function submitChatMessage(e) {
          console.log(chatMessage)
          //formatea el mensaje
          let msg = {message: chatMessage, users: [user._id, id], sender: user._id}
          //envía mensaje a la DB
          let msgInDb = await axios.post('https://backend-gamematch.herokuapp.com/chats', msg)
          //si se mandó el mensaje a la DB envía al otro usuario
          if (msgInDb) socket.current.emit('client: send message', msg);
          setChatMessage('');
     }
     return (
          <View>
             
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
                    <View style={{ margin: 10 }}>
                         {
                              chatMessages && chatMessages.map((chatMessage, i) => (
                                   <Text
                                        key={i}
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
                         ))}
                    </View>
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
                              value={chatMessage}
                              onChangeText={(e) => handleChange(e)}
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
                         <TouchableWithoutFeedback
                              onPress= {(e) => submitChatMessage(e)}
                         >
                              <Image
                                   	source={require('../../assets/iconSend.png')}
                                   	style={{ width: '100%', height: '100%' }}
                              />
                         </TouchableWithoutFeedback>
                    </View>
                    <Nav />
               </View>
          </View>
          );
     }

const styles = StyleSheet.create({
     container: {
          height: '100%',
     },
});

export default Chat