import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Nav from './Nav';
import PlayerCard from './PlayerCard.jsx';

const WaintingRoom = () => {
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
                    League of Legends
               </Text>
               <View
                    style={{
                         marginBottom: 20,
                         height: 2,
                         width: '90%',
                         backgroundColor: '#98228C',
                    }}
               ></View>
               <PlayerCard />
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

export default WaintingRoom;
