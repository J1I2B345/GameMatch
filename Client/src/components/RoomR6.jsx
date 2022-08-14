import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Nav from './Nav';
import PlayerCard from './PlayerCard.jsx';
import FilterElo from './Filters/FilterEloR6';
import OrderRating from './Filters/OrderRating';
import { connect, useSelector } from 'react-redux';
import Players from '../data/usersR6.js';

const RoomCS = () => {
     // const Players = useSelector((state) => state.games.playersR6);

     return (
          <View style={styles.container}>
               <Text
                    style={{
                         marginTop: Constants.statusBarHeight + 10,
                         marginBottom: 10,
                         width: '80%',
                         color: 'white',
                         textAlign: 'center',
                         fontSize: 45,
                    }}
               >
                    Rainbows Six
               </Text>
               <View
                    style={{
                         marginBottom: 20,
                         height: 2,
                         width: '90%',
                         backgroundColor: '#98228C',
                    }}
               ></View>
               <SafeAreaView style={{ marginBottom: 175 }}>
                    <ScrollView>
                         {}
                         <View
                              style={{
                                   flexDirection: 'row',
                                   justifyContent: 'center',
                              }}
                         >
                              <OrderRating />
                              <FilterElo />
                         </View>
                         {Players.length > 0 ? (
                              Players.map((player) => (
                                   <PlayerCard
                                        key={player.id}
                                        id={player.id}
                                        img={player.img}
                                        name={player.name}
                                        elo={player.elo}
                                        position={player.position}
                                        rating={player.rating}
                                   />
                              ))
                         ) : (
                              <Text
                                   style={{
                                        textAlign: 'center',
                                        color: 'white',
                                        fontSize: 20,
                                   }}
                              >
                                   Loading...
                              </Text>
                         )}
                    </ScrollView>
               </SafeAreaView>
               <Link
                    to="/selectgame"
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
                         source={require('../../assets/iconBack.png')}
                         style={{ width: 50, height: 50 }}
                    />
               </Link>
               <Nav />
               <StatusBar style="auto" />
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          height: '100%',
          alignItems: 'center',
     },
});

export default RoomCS;
