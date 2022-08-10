import { Link } from 'react-router-native';
import { StyleSheet, View, Image } from 'react-native';

const Nav = () => {
     return (
          <View style={styles.container}>
               <View style={styles.icon_container}>
                    <Link to="/chat" underlayColor={'#9A01E2'} style={styles.icon}>
                         <Image
                              source={require('../../assets/iconMenssage.png')}
                              style={{ marginTop: 1, width: 28.5, height: 28.5 }}
                         />
                    </Link>
                    <Link to="/selectgame" underlayColor={'#9A01E2'} style={styles.icon}>
                         <Image
                              source={require('../../assets/iconHomeGames.png')}
                              style={{ width: 30, height: 30 }}
                         />
                    </Link>
                    <Link to="/" underlayColor={'#9A01E2'} style={styles.icon}>
                         <Image
                              source={require('../../assets/iconForo.png')}
                              style={{ marginTop: 2, width: 26, height: 26 }}
                         />
                    </Link>
                    <Link to="/profile" underlayColor={'#9A01E2'} style={styles.icon}>
                         <Image
                              source={require('../../assets/iconProfile.png')}
                              style={{ marginTop: 2, width: 27, height: 27 }}
                         />
                    </Link>
               </View>
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          position: 'absolute',
          bottom: 0,
          height: 45,
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#5B146C',
     },

     icon_container: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 7,
     },

     icon: {
          marginRight: 25,
          marginLeft: 25,
          width: 40,
          height: 32,
          borderRadius: 50,
          alignItems: 'center',
     },
});

export default Nav;
