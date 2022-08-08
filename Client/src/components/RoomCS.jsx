import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Nav from './Nav';
import PlayersCSCard from './PlayersCSCard.jsx';
import OrderRating from './Filters/OrderRating';
import FilterPosition from './Filters/FilterPositionCSGO';
import FilterElo from './Filters/FilterEloCSGO';
// import Players from '../data/usersCSGO.js';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

const RoomCS = () => {
     const Players = useSelector((state) => state.games.playersCSGO);

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
                    Counter Strike : GO
               </Text>
               <View
                    style={{
                         marginBottom: 20,
                         height: 2,
                         width: '90%',
                         backgroundColor: '#98228C',
                    }}
               ></View>
               <SafeAreaView style={{ marginBottom: 225 }}>
                    <ScrollView>
                         <View
                              style={{
                                   flexDirection: 'row',
                                   justifyContent: 'center',
                              }}
                         >
                              <OrderRating />
                              <FilterPosition />
                         </View>
                         <View
                              style={{
                                   flexDirection: 'row',
                                   justifyContent: 'center',
                              }}
                         >
                              <FilterElo />
                         </View>
                         {Players.length > 0 ? (
                              Players.map((player) => (
                                   <PlayersCSCard
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
