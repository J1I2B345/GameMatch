import React from 'react';
import { FlatList, View, Image, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-native';
import axios from 'axios';
import Players from '../data/usersLOL.js';

const PlayerLoLCard = () => {
     // let [playersDB, setGames] = useState([]);

     // const fetchGames = async () => {
     //      try {
     //           const response = await axios.get('https://backend-gamematch.herokuapp.com/games');
     //           const respuesta = response.data;
     //           setGames(respuesta);
     //      } catch (error) {
     //           console.error(error.message);
     //      }
     // };

     // useEffect(() => {
     //      fetchGames();
     // }, []);

     return (
          <FlatList
               style={{ marginBottom: 45 }}
               data={Players}
               renderItem={({ item: player }) => (
                    <View key={player.id} style={{ margin: 5 }}>
                         <Link to="/" activeOpacity={1} underlayColor={''}>
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
                                        source={{ uri: player.img }}
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
                                             marginTop: 13,
                                             marginLeft: 10,
                                             width: '75%',
                                             flexDirection: 'row',
                                        }}
                                   >
                                        <Text
                                             style={{
                                                  paddingRight: 10,
                                                  width: '50%',
                                                  fontSize: 20,
                                                  color: '#fff',
                                                  textAlign: 'center',
                                             }}
                                        >
                                             {player.name}
                                        </Text>
                                        <View style={{ width: '50%' }}>
                                             <Text
                                                  style={{
                                                       fontSize: 13,
                                                       color: '#fff',
                                                  }}
                                             >
                                                  Elo: {player.elo}
                                             </Text>
                                             <Text
                                                  style={{
                                                       fontSize: 13,
                                                       color: '#fff',
                                                  }}
                                             >
                                                  Position: {player.position}
                                             </Text>
                                             <Text
                                                  style={{
                                                       fontSize: 13,
                                                       color: '#fff',
                                                  }}
                                             >
                                                  Calification: {player.rating}
                                             </Text>
                                        </View>
                                   </View>
                              </View>
                         </Link>
                    </View>
               )}
          />
     );
};

export default PlayerLoLCard;