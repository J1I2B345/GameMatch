import React from 'react';
import { FlatList, View, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-native';
import axios from 'axios';

const GameCard = () => {
     let [gamesDB, setGames] = useState([]);

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
               data={gamesDB}
               renderItem={({ item: game }) => (
                    <View key={game.id} style={{ margin: 5 }}>
                         <Link to={game.link} activeOpacity={1} underlayColor={''}>
                              <Image
                                   source={{ uri: game.image }}
                                   style={{ width: 340, height: 180, borderRadius: 20 }}
                              />
                         </Link>
                    </View>
               )}
          />
     );
};

export default GameCard;
