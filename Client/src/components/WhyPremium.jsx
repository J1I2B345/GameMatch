import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Nav from './Nav';

const WhyPremium = () => {
     return (
          <View style={styles.container}>
               <SafeAreaView style={{ marginTop: Constants.statusBarHeight + 10 }}>
                    <ScrollView>
                         <View style={styles.all_info_container}>
                              <View style={styles.info_container}>
                                   <Text style={styles.title}>¿Why Be Premium?</Text>
                                   <Text style={styles.subTitle}>¿Why Be Premium?</Text>
                                   <Text style={styles.text}>
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                        Voluptatum illo aliquid vero molestiae alias itaque
                                        molestias, magni exercitationem veritatis at expedita
                                        cupiditate tempora. Repudiandae eligendi maiores eveniet
                                        voluptatibus quidem. Impedit?
                                   </Text>
                              </View>
                         </View>
                         <View>
                              <Link
                                   to="/checkout"
                                   activeOpacity={1}
                                   underlayColor={'#9A01E2'}
                                   style={styles.button}
                              >
                                   <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.button_text}>
                                             <Image
                                                  source={require('../../assets/starPremium.png')}
                                                  style={{
                                                       width: 20,
                                                       height: 20,
                                                  }}
                                             />
                                             GET PREMIUM RIGHT NOW FOR $499.00
                                             <Image
                                                  source={require('../../assets/starPremium.png')}
                                                  style={{
                                                       width: 20,
                                                       height: 20,
                                                  }}
                                             />
                                        </Text>
                                   </View>
                              </Link>
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
     all_info_container: {
          width: '100%',
          alignItems: 'center',
     },
     info_container: {
          width: '90%',
          backgroundColor: '#443ABB',
          borderRadius: 20,
          padding: 20,
     },
     title: {
          textAlign: 'center',
          fontSize: 30,
          color: '#fff',
     },
     subTitle: {
          fontSize: 25,
          color: '#fff',
     },
     text: {
          fontSize: 16,
          color: '#fff',
     },
     button: {
          margin: 20,
          marginTop: 20,
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
          fontSize: 17,
          width: '100%',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
     },
});

export default WhyPremium;
