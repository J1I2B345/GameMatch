import { WebView } from 'react-native-webview';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Text, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import axios from 'axios';
import { editProfile } from '../redux/actions';


const Checkout = () => {
    const redirect = useNavigate()
    const [url, setUrl] = useState(null)
    const dispatch = useDispatch()
    const User = useSelector((state) => state.games.userProfile);
    console.log(User)
    const initialValues={
        _id: User._id,
        email: User.email,
        premium: true,
        rol: User.rol,
        chats: User.chats,
        reviews: User.reviews,
        givenReviews: User.givenReviews,
        rating: User.rating,
        ban: User.ban,
        // MODIFICANDO
        username: User.username,
        img: User.img
             ? User.img
             : 'https://www.pinpng.com/pngs/m/402-4020060_random-image-from-user-smash-ball-pixel-art.png',
        description: User.description ? User.description : '',
        socialNetworks: {
             steam:
                  User.socialNetworks && User.socialNetworks.steam
                       ? User.socialNetworks.steam
                       : '',
             riot:
                  User.socialNetworks && User.socialNetworks.riot
                       ? User.socialNetworks.riot
                       : '',
             discord:
                  User.socialNetworks && User.socialNetworks.discord
                       ? User.socialNetworks.discord
                       : '',
             ig:
                  User.socialNetworks && User.socialNetworks.ig
                       ? User.socialNetworks.ig
                       : '',
             twitter:
                  User.socialNetworks && User.socialNetworks.twitter
                       ? User.socialNetworks.twitter
                       : '',
        }
    }
    const comprador = {email: User.email}
    const urlpago = "https://backend-gamematch.herokuapp.com/pago"

    useEffect(() => {
        function sendServer() {
            axios.post(urlpago, comprador)
                .then(res => {
                    console.log(res.data.init_point)
                    setUrl(res.data.init_point)
                })
                .catch(e => console.log(e))
        }
        sendServer();
    }, []);

    //Mudança de estado de navegação
    async function stateChange(state) {
        let url = state.url;
        if (state.canGoBack == true && !url.includes('mercadopago')) {
            if (url.includes("approved")) {
                dispatch(editProfile(initialValues))
                redirect("/profile")
            } else {
                redirect("/profile")
            }
        }
        if (url.includes("failure")){
            redirect("/profile")
        }
    }

    return (
        <View style={styles.container}>
            {url &&
                <WebView
                    style={{
                        width: 400,
                    }}
                    originWhitelist={['*']}
                    source={{ uri: url }}
                    startInLoadingState={true}
                    onNavigationStateChange={state => stateChange(state)}
                />
            }
        </View>
    );

    
}
const styles = StyleSheet.create({
    container: {
         height: '100%',
         width: "100%",
         alignItems: 'center',
    },
    tittle: {
         fontSize: 40,
         color: '#fff',
    },
    container2: {
         flex: 1,
         height: 1000,
         width: 400,
    },
    text: {
         fontSize: 20,
         color: '#fff',
         marginTop: 50,
    },
    button: {
         fontSize: 20,
         color: '#fff',
         marginTop: 50,
    },
});

export default Checkout
