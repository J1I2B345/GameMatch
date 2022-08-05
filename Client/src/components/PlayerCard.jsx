import React from 'react';
import { FlatList, View, Image, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-native';
import axios from 'axios';
import Players from './Players.js';

const PlayerCard = () => {
     let [playersDB, setGames] = useState([]);

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
          <FlatList
               style={{ marginBottom: 45 }}
               data={Players}
               renderItem={({ item: game }) => (
                    <View key={game.id} style={{ margin: 5 }}>
                         <Link to="/SelectGame" activeOpacity={1} underlayColor={''}>
                              <View
                                   style={{
                                        width: 340,
                                        height: 80,
                                        borderRadius: 20,
                                        backgroundColor: '#3519B0',
                                        flexDirection: 'row',
                                   }}
                              >
                                   <Image
                                        source={{ uri: game.image }}
                                        style={{
                                             marginTop: 10,
                                             marginLeft: 20,
                                             width: 60,
                                             height: 60,
                                             borderRadius: 50,
                                        }}
                                   />
                                   <View
                                        style={{
                                             marginLeft: 10,
                                             width: '70%',
                                             textAlign: 'center',
                                             backgroundColor: 'red',
                                        }}
                                   >
                                        <Text
                                             style={{
                                                  fontSize: 20,
                                                  color: '#fff',
                                                  textAlign: 'center',
                                             }}
                                        >
                                             {game.name}
                                        </Text>
                                   </View>
                              </View>
                         </Link>
                    </View>
               )}
          />
     );
};

export default PlayerCard;
