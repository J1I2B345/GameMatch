import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity } from 'react-native';

const Login = () => {
     return (
          <View style={styles.container}>
               <View style={styles.portada}>
                    <View style={styles.portada_text}>
                         <Image
                              source={require('../../assets/GameMatch.png')}
                              style={{ width: 130, height: 100 }}
                         />
                    </View>
                    <View style={styles.portada_img}>
                         <Image
                              source={require('../../assets/iconApp.png')}
                              style={{ width: 110, height: 110 }}
                         />
                    </View>
               </View>
               <View style={styles.form_container}>
                    <TextInput placeholder="Ussername" style={styles.input} />
                    <TextInput placeholder="Password" style={styles.input} />

                    <TouchableOpacity onPress={() => Alert.alert('logeado')} style={styles.button}>
                         <View>
                              <Text style={styles.button_text}>LOGIN</Text>
                         </View>
                    </TouchableOpacity>
               </View>

               <View
                    style={{
                         marginTop: 30,
                         fontSize: 15,
                         height: 'auto',
                    }}
               >
                    <Text
                         style={{
                              color: 'gray',
                         }}
                    >
                         Don't have account?{' '}
                         <Text
                              style={{
                                   color: 'white',
                              }}
                         >
                              Register
                         </Text>
                    </Text>
               </View>
               <View
                    style={{
                         marginTop: 0,
                         width: 190,
                         height: 1,
                         backgroundColor: 'gray',
                    }}
               ></View>
               <StatusBar style="auto" />
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          height: '100%',
          width: '100%',
          alignItems: 'center',
     },
     portada: {
          marginTop: 120,
          flexDirection: 'row',
     },
     portada_text: {
          marginRight: 30,
     },
     form_container: {
          width: '100%',
          alignItems: 'center',
     },
     input: {
          marginTop: 70,
          borderWidth: 1,
          backgroundColor: '#fff',
          height: 38,
          width: '60%',
          fontSize: 15,
          borderRadius: 20,
          textAlign: 'center',
     },
     button: {
          margin: 'auto',
          marginTop: 60,
          height: 40,
          width: '60%',
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

export default Login;
