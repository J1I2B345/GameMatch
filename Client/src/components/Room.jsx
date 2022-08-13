import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { Link, useParams } from "react-router-native";
import Constants from "expo-constants";
import Nav from "./Nav";
import PlayerCard from "./PlayerCard.jsx";
import OrderRating from "./Filters/OrderRating";
//filtros deberían ser para todos igual. pasar por props lo que tiene que presentar en el select
//y una función para ir sumando al array de filtrado
import FilterElo from "./Filters/FilterElo";
import FilterPosition from "./Filters/FilterPosition";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";



import { updateUser } from '../redux/actions';
import Spinner from '../components/Spinner';



export default function Room() {
    // const playersGlobal = useSelector((state) => state.games.playersLoL);
    const games = useSelector( state => state.games.games)
    const [players, setPlayers] = useState([]);
    const user = useSelector((state) => state.games.user);
    const socket = useRef();
    const{id} = useParams()
    let game = games.find(e => e._id === id)
    console.log(game)

    useEffect(() => {
        socket.current = io("https://backend-gamematch.herokuapp.com/");
        socket.current.emit("joinRoom", user);
        //agregado para el user global con socketid
        socket.current.on("socketid", socketid =>{
            dispatch(updateUser({...user, socketid}))
        })

        //agregado para el user global con socketid
        return ()=>{
            socket.current.off("socketid")
        }

    }, []);

    useEffect(() => {
        socket.current.on("gameUsers", (data) => {
            let playersList = data.filter((e) => e._id !== user._id);
            setPlayers(playersList);
        });
        return () => {
            socket.current.off("gameUsers");
        };
    }, [socket.current, players]);



    return (
        <View style={styles.container}>
            {game.name? ( 
            <View> 

                <Text
                style={{
                    marginTop: Constants.statusBarHeight + 10,
                    marginBottom: 10,
                    width: "80%",
                    color: "white",
                    textAlign: "center",
                    fontSize: 45,
                }}
                > 
                    {game.name}
                </Text>

                <View
                    style={{
                        marginBottom: 20,
                        height: 2,
                        width: "90%",
                        backgroundColor: "#98228C",
                    }}
                    >

                </View>
                <SafeAreaView style={{ marginBottom: 225 }}>
                    <ScrollView>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                            >
                            <OrderRating />
                          {game.position.length>1 && <FilterPosition position={game.position}/>}  
                        </View>

                        {game.elo &&
                        <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                        >
                            {game.elo&& <FilterElo elo={game.elo} />}
                        </View>
                        }
                        
                        {players.length > 0 ? (
                            players.map((player, i) => {
                                // if (player.rating) return (
                                    return <PlayerCard
                                    key={i}
                                    img={player.img}
                                    id={player._id}
                                        name={player.username}
                                        elo={player.elo}
                                        position={player.position}
                                        rating={player.rating.$numberDecimal}
                                        />
                                        // );
                                        // else return (
                                            // <PlayerCard
                                            //     key={i}
                                            //     id={player._id}
                                            //     name={player.username}
                                            //     elo={player.elo}
                                            //     img={player.img}
                                            //     position={player.position}
                                            // />
                                            // );
                                        })
                                        ) : (
                                            <Text
                                            style={{
                                                textAlign: "center",
                                                color: "white",
                                                fontSize: 20,
                                }}
                            >
                                Waiting for players...
                            </Text>
                        )}
                    </ScrollView>
                </SafeAreaView>
                </View>
                ) : <Spinner/>}
            <Link
            to="/selectgame"
            activeOpacity={1}
            underlayColor={""}
            style={{
                position: "absolute",
                bottom: 80,
                left: 20,
                height: 45,
            }}
            >
                <Image
                    source={require("../../assets/iconBack.png")}
                    style={{ width: 50, height: 50 }}
                    />
            </Link>
            <Nav />
            <StatusBar style="auto" />
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
    },
});
