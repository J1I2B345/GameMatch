import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const Nav = () => {
     return (
          <View style={styles.container}>
               <View style={styles.icon_container}>
                    <TouchableOpacity style={styles.icon}>
                         <Image
                              source={require('../../assets/iconMenssage.png')}
                              style={{ width: 30, height: 30 }}
                         />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                         <Image
                              source={require('../../assets/iconHomeGames.png')}
                              style={{ width: 30, height: 30 }}
                         />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                         <Image
                              source={require('../../assets/iconForo.png')}
                              style={{ marginTop: 2, width: 26, height: 26 }}
                         />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                         <Image
                              source={require('../../assets/iconProfile.jpg')}
                              style={{ marginTop: 2, width: 26, height: 26 }}
                         />
                    </TouchableOpacity>
               </View>
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          position: 'static',
          top: '83.5%',
          height: 45,
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#5B146C',
     },

     icon_container: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 6,
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
