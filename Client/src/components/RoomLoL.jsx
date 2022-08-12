import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Nav from "./Nav";
import PlayersLoLCard from "./PlayersLoLCard.jsx";
import OrderRating from "./Filters/OrderRating";
import FilterElo from "./Filters/FilterEloLoL";
import FilterPosition from "./Filters/FilterPositionLoL";
// import Players from '../data/usersLOL.js';
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { updateUser } from '../redux/actions';

export default function RoomLoL() {
    // const playersGlobal = useSelector((state) => state.games.playersLoL);
    const [players, setPlayers] = useState([]);
    const user = useSelector((state) => state.games.user);
    const socket = useRef();
    console.log(user)

    useEffect(() => {
        socket.current = io("https://backend-gamematch.herokuapp.com/");
        socket.current.emit("joinRoom", user);
        socket.current.on("socketid", socketid =>{
            dispatch(updateUser({...user, socketid}))
        })
        return ()=>{
            socket.current.off("socketid")
        }
    }, []);

    useEffect(() => {
        socket.current.on("gameUsers", (data) => {
            console.log("soy data", data);
            let playersList = data.filter((e) => e._id !== user._id);
            setPlayers(playersList);
            console.log("soy playerlist", playersList);
        });
        socket.current.on("message", (data) => {
            console.log(data);
        });
        return () => {
            socket.current.off("gameUsers");
            socket.current.off("message");
        };
    }, [socket.current, players]);

    console.log("soy players", players);

    return (
        <View style={styles.container}>
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
                League of Legends
            </Text>
            <View
                style={{
                    marginBottom: 20,
                    height: 2,
                    width: "90%",
                    backgroundColor: "#98228C",
                }}
            ></View>
            <SafeAreaView style={{ marginBottom: 225 }}>
                <ScrollView>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <OrderRating />
                        <FilterPosition />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <FilterElo />
                    </View>
                    {players.length > 0 ? (
                        players.map((player) => {
                            return (
                                <PlayersLoLCard
                                    key={player._id}
                                    id={player._id}
                                    name={player.username}
                                    elo={player.elo}
                                    position={player.position}
                                    rating={player.rating.$numberDecimal}
                                />
                            );
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
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
    },
});
