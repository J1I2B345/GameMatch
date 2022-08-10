import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Nav from './Nav';

const BuyPremium = () => {
     return (
          <View style={styles.container}>
               <SafeAreaView style={{ marginTop: Constants.statusBarHeight + 10 }}>
                    <ScrollView>
                         <Text style={styles.tittle}>TRABAJA AQUI</Text>
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
     tittle: {
          fontSize: 40,
          color: '#fff',
     },
});

export default BuyPremium;
