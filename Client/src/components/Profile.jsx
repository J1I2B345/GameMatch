import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Nav from './Nav';

const Profile = () => {
     const User = useSelector((state) => state.games.userProfile);

     let arrayStars = [];
     (() => {
          let ratingCont = User[0].rating;
          while (ratingCont > 0) {
               ratingCont = ratingCont - 1;
               arrayStars.push(arrayStars.length + 1);
          }
          return arrayStars;
     })();

     return (
          <View style={styles.container}>
               <View style={styles.portada_container}>
                    <Image
                         source={{
                              uri: User[0].img
                                   ? User[0].img
                                   : 'https://www.pinpng.com/pngs/m/402-4020060_random-image-from-user-smash-ball-pixel-art.png',
                         }}
                         style={styles.img_perfil}
                    />
                    <View style={styles.portada}>
                         <Text style={styles.text_name}>{User[0].name}</Text>
                         <View style={styles.stars_container}>
                              {arrayStars.map((item) => (
                                   <View key={item}>
                                        <Image
                                             source={require('../../assets/Star.png')}
                                             style={styles.stars}
                                        />
                                   </View>
                              ))}
                         </View>
                    </View>
               </View>

               <View style={styles.separador}></View>
               <SafeAreaView style={{ marginBottom: 263 }}>
                    <ScrollView>
                         <View>
                              <Link
                                   to="/buypremium"
                                   activeOpacity={1}
                                   underlayColor={'#9A01E2'}
                                   style={styles.button}
                              >
                                   <View>
                                        <Text style={styles.button_text}>Pasate a Premium</Text>
                                   </View>
                              </Link>
                         </View>
                         {User[0].description ? (
                              <View style={{ ...styles.info_container, paddingBottom: 20 }}>
                                   <Text
                                        style={{
                                             color: '#fff',
                                             fontSize: 18,
                                        }}
                                   >
                                        {User[0].description}
                                        {User[0].description}
                                   </Text>
                              </View>
                         ) : (
                              <View></View>
                         )}

                         <View
                              style={
                                   Object.keys(User[0].redes).length > 0
                                        ? styles.info_container
                                        : { display: 'none' }
                              }
                         >
                              <Text style={styles.users_title}>
                                   {Object.keys(User[0].redes).length > 1 ? 'Users:' : 'User:'}
                              </Text>
                              <Text
                                   style={
                                        User[0].redes.steam
                                             ? styles.users_item
                                             : { display: 'none' }
                                   }
                              >
                                   Steam: {User[0].redes.steam}
                              </Text>
                              <Text
                                   style={
                                        User[0].redes.riot ? styles.users_item : { display: 'none' }
                                   }
                              >
                                   Riot: {User[0].redes.riot}
                              </Text>
                              <Text
                                   style={
                                        User[0].redes.discord
                                             ? styles.users_item
                                             : { display: 'none' }
                                   }
                              >
                                   Discord: {User[0].redes.discord}
                              </Text>
                              <Text
                                   style={
                                        User[0].redes.ig ? styles.users_item : { display: 'none' }
                                   }
                              >
                                   Instagram: {User[0].redes.ig}
                              </Text>
                              <Text
                                   style={
                                        User[0].redes.twitter
                                             ? styles.users_item
                                             : { display: 'none' }
                                   }
                              >
                                   Twitter: {User[0].redes.twitter}
                              </Text>
                         </View>
                    </ScrollView>
               </SafeAreaView>
               <Link
                    to="/profile"
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
                         source={require('../../assets/editProfile.png')}
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
     portada_container: {
          marginTop: Constants.statusBarHeight + 15,
          marginBottom: 15,
          flexDirection: 'row',
          justifyContent: 'center',
     },
     portada: {
          margin: 20,
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: 150,
     },
     img_perfil: {
          width: 150,
          height: 150,
          borderRadius: 100,
     },
     text_name: {
          width: '80%',
          color: 'white',
          textAlign: 'center',
          fontSize: 30,
     },
     stars_container: {
          marginTop: 10,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
     },
     stars: {
          margin: 5,
          width: 20,
          height: 20,
          borderRadius: 100,
     },
     separador: {
          marginBottom: 10,
          height: 2,
          width: '90%',
          backgroundColor: '#98228C',
     },
     info_container: {
          margin: 20,
          marginTop: 5,
          marginBottom: 10,
          padding: 20,
          paddingBottom: 13,
          borderRadius: 20,
          backgroundColor: '#443ABB',
     },
     users_title: {
          width: '100%',
          color: '#fff',
          fontSize: 30,
          paddingBottom: 10,
     },
     users_item: {
          color: '#fff',
          fontSize: 18,
          padding: 20,
          paddingTop: 0,
          paddingLeft: 40,
     },
     button: {
          margin: 20,
          marginTop: 5,
          marginBottom: 10,
          height: 40,
          width: '90%',
          alignItems: 'center',
          borderRadius: 10,
          border: 'none',
          backgroundColor: '#98228C',
     },
     button_text: {
          marginTop: 6,
          fontSize: 20,
          width: '100%',
          textAlign: 'center',
          color: 'white',
     },
});

export default Profile;
