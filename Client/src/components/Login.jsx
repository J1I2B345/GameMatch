import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import iconApp from '../../assets/iconApp.png';
import GameMatch from '../../assets/GameMatch.png';
import Fondo from '../../assets/Fondo.png';

export default function Login() {
     return (
          <View style={styles.container}>
               <style>@import url('http://fonts.cdnfonts.com/css/actor');</style>
               <style>@import url('https://rsms.me/inter/inter.css');</style>
               <style>
                    @import
                    url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2&display=swap');
               </style>
               <View style={styles.portada}>
                    <View style={styles.portada_text}>
                         <img src={GameMatch} style={{ width: 150 }} />
                    </View>
                    <View style={styles.portada_img}>
                         <img src={iconApp} style={{ width: 105 }} />
                    </View>
               </View>
               <View style={styles.form_container}>
                    <form
                         style={{
                              width: '100%',
                              textAlign: 'center',
                              alignItems: 'center',
                              marginBottom: 30,
                         }}
                    >
                         <input
                              type="text"
                              name="username"
                              maxLength="24"
                              placeholder="Username"
                              autoComplete="off"
                              style={{
                                   marginTop: 80,
                                   height: 38,
                                   width: '60%',
                                   fontSize: 20,
                                   border: 'none',
                                   borderRadius: 20,
                                   textAlign: 'center',
                                   fontFamily: 'Inter',
                              }}
                         />

                         <input
                              type="password"
                              name="password"
                              maxLength="24"
                              placeholder="Password"
                              autoComplete="off"
                              style={{
                                   marginTop: 60,
                                   height: 38,
                                   width: '60%',
                                   fontSize: 20,
                                   border: 'none',
                                   borderRadius: 20,
                                   textAlign: 'center',
                                   fontFamily: 'Inter',
                              }}
                         />
                         <button
                              type="submit"
                              style={{
                                   display: 'flex',
                                   margin: 'auto',
                                   marginTop: 60,
                                   height: 40,
                                   width: '60%',
                                   alignItems: 'center',
                                   borderRadius: 10,
                                   border: 'none',
                                   backgroundColor: '#98228C',
                              }}
                         >
                              <span
                                   style={{
                                        fontSize: 20,
                                        width: '100%',
                                        textAlign: 'center',
                                        color: 'white',
                                        fontFamily: 'Baloo Bhai 2',
                                   }}
                              >
                                   LOGIN
                              </span>
                         </button>
                    </form>
               </View>
               <View
                    style={{
                         fontFamily: 'Inter',
                         fontSize: 15,
                         alignItems: 'flex-start',
                         height: 0,
                    }}
               >
                    <p
                         style={{
                              color: 'gray',
                         }}
                    >
                         Don't have account?{' '}
                         <span
                              style={{
                                   color: 'white',
                              }}
                         >
                              Register
                         </span>
                    </p>
               </View>
               <View
                    style={{
                         marginTop: 37,
                         width: 215,
                         height: 1,
                         backgroundColor: 'gray',
                    }}
               ></View>
               <StatusBar style="auto" />
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          height: '101vh',
          // backgroundColor: '#34167D',
          backgroundImage: `url(${Fondo})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          alignItems: 'center',
     },
     portada: {
          display: 'inline-block',
          marginTop: '15vh',
     },
     portada_text: {
          display: 'inline-block',
          marginRight: 40,
          width: 150,
     },
     portada_img: {
          display: 'inline-block',
     },
     form_container: {
          width: '100%',
          alignItems: 'center',
     },
});
