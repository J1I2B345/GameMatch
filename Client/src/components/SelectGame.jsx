import { View, Text, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Nav from './Nav';
import axios from 'axios';

export default function SelectGame() {
     let [games, setGames] = useState([]);

     const fetchGames = async () => {
          try {
               const response = await axios.get('https://backend-gamematch.herokuapp.com/games');
               const respuesta = response.data;
               setGames(respuesta);
          } catch (error) {
               console.error(error.message);
          }
     };

     useEffect(() => {
          fetchGames();
     }, []);

     return (
          <View
               style={{
                    alignItems: 'center',
                    height: '100%',
               }}
          >
               <Text
                    style={{
                         marginTop: Constants.statusBarHeight + 10,
                         marginBottom: 10,
                         color: 'white',
                         fontSize: 40,
                    }}
               >
                    Select your game
               </Text>
               {games.length > 0 && (
                    <View
                         style={{
                              height: '83%',
                         }}
                    >
                         <Link
                              to="/formlol"
                              activeOpacity={1}
                              underlayColor={''}
                              style={{ margin: 5 }}
                         >
                              <Image
                                   source={{ uri: games[0].image }}
                                   style={{ width: 340, height: 180, borderRadius: 20 }}
                              />
                         </Link>
                         <Link
                              to="/formcs"
                              activeOpacity={1}
                              underlayColor={''}
                              style={{ margin: 5 }}
                         >
                              <Image
                                   source={{ uri: games[1].image }}
                                   style={{ width: 340, height: 180, borderRadius: 20 }}
                              />
                         </Link>
                         <Link
                              to="/formrainbow"
                              activeOpacity={1}
                              underlayColor={''}
                              style={{ margin: 5 }}
                         >
                              <Image
                                   source={{ uri: games[2].image }}
                                   style={{ width: 340, height: 180, borderRadius: 20 }}
                              />
                         </Link>
                    </View>
               )}
               <Link
                    to="/createGame"
                    activeOpacity={1}
                    underlayColor={''}
                    style={{
                         position: 'absolute',
                         bottom: 80,
                         left: 20,
                         height: 45,
                    }}
               >
                    <Image
                         source={require('../../assets/addGame.png')}
                         style={{ width: 50, height: 50 }}
                    />
               </Link>
               <StatusBar style="auto" />
               <Nav />
          </View>
     );
}
