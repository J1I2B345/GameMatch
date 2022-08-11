import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Nav from './Nav';
import axios from 'axios';
import Game from './Game';
import Spinner from './Spinner';
import { updateUser } from '../redux/actions';

export default function SelectGame() {
     const dispatch = useDispatch();
     let [games, setGames] = useState([]);

     const userGlobal = useSelector((state) => state.games.user);

     function onPress(game) {
          let user = {username: userGlobal.username, _id:userGlobal._id, img: userGlobal.img, rating: userGlobal.rating, game}
          dispatch(updateUser(user));
     }

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
          <View>
               {games.length > 0 ? (
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
                              {games.map((game) => {
                                   return (
                                        <Game
                                             key={game._id}
                                             id={game._id}
                                             image={game.image}
                                             name={game.name}
                                             gender={game.gender}
                                             positions={game.position}
                                             rank={game.elo}
                                             onPress={onPress}
                                        />
                                   );
                              })}
                         </ScrollView>

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
                    </SafeAreaView>
               ) : (
                    <Spinner />
               )}
          </View>
     );
}

{
     /* <Link
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
 
style={{ margin: 5 }}
>
<Image
     source={{ uri: games[2].image }}
     style={{ width: 340, height: 180, borderRadius: 20 }}
/>
</Link> */
}
