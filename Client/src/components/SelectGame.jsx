import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Nav from './Nav';
import axios from 'axios';
import { getPlayersCSGO, getPlayersLoL, getPlayersR6 } from '../redux/actions/create';

export default function SelectGame() {
     const dispatch = useDispatch();
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
          dispatch(getPlayersLoL());
          dispatch(getPlayersCSGO());
          dispatch(getPlayersR6());
     }, []);

     return (
          <SafeAreaView
               style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
               }}
          >
               <ScrollView
                    style={{
                         marginBottom: 45,
                    }}
               >
                    <View
                         style={{
                              marginLeft: '5%',
                         }}
                    >
                         <Text
                              style={{
                                   marginTop: Constants.statusBarHeight + 10,
                                   color: 'white',
                                   fontSize: 45,
                              }}
                         >
                              ¿What
                         </Text>
                         <Text style={{ marginTop: -5, color: 'white', fontSize: 45 }}>
                              do you want
                         </Text>
                         <Text
                              style={{
                                   marginTop: -5,
                                   marginBottom: 10,
                                   color: 'white',
                                   fontSize: 45,
                              }}
                         >
                              to play today?
                         </Text>
                    </View>
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
                    <StatusBar style="auto" />
               </ScrollView>
               <Nav />
          </SafeAreaView>
     );
}
