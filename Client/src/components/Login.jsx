import { StatusBar } from 'expo-status-bar';
import {getUser} from '../redux/actions';
import { useEffect, useState } from 'react';
import {useSelector, connect, useDispatch} from 'react-redux'; 
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Link, useNavigate } from 'react-router-native';

const Login = () => {

     const [user, setUser] = useState('')
     const dispatch = useDispatch();

     function handleChange(value){
          setUser(value)
     }

     function onSubmit(e){
          dispatch(getUser(user)) 
     }

    
     // const navigate = useNavigate();
     // const [userState, setUserState] = useState('');

     // const user = useSelector((state) => state.games.user);
     // user.length == 1 ?? user[0].name === userState ?? navigate('/selectgame');


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
                    <TextInput placeholder="Username" style={styles.input} value={user} onChangeText={(e)=> handleChange(e)}/>
                    <TextInput placeholder="Password" style={styles.input} />
                    <Link
                         to="/selectgame"
                         activeOpacity={1}
                         underlayColor={'#9A01E2'}
                         style={styles.button}
                         onPress={(e)=> onSubmit(e)}
                    >
                         <View>
                              <Text style={styles.button_text}>LOGIN</Text>
                         </View>
                    </Link>
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