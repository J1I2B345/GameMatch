import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { Link, useParams } from "react-router-native";
import {useSelector, useDispatch} from 'react-redux'
import { updateUser } from "../redux/actions";

export default function Form() {
    let [game, setGame] = useState({ position: false });
    let [playerRank, setPlayerRank] = useState("--");
    let [playerPosition, setPlayerPosition] = useState("any");
    let { id } = useParams();
    let dispatch = useDispatch()

    let user = useSelector(state=> state.games.user)

    const fetchGame = async () => {
        try {
            const response = await axios.get(
                `https://backend-gamematch.herokuapp.com/games/${id}`
            );
            const respuesta = response.data;
            setGame(respuesta);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchGame();
    }, []);

    function handleClickPosition(valor) {
        setPlayerPosition(valor);
    }

    function handleClickRank(valor) {
        setPlayerRank(valor);
    }

    function handleSubmit() {
        playerRank? user = {...user, elo: playerRank} : ''
        playerPosition? user = {...user, position: playerPosition} : ''
        dispatch(updateUser(user))
        // disparar evento a socket io
    }

    return (
        <View
            style={{
                height: "100%",
                alignItems: "center",
            }}
        >
            {game ? (
                <Text style={{ marginTop: "15%", fontSize: 50 }}>
                    {game.name}
                </Text>
            ) : (
                <></>
            )}
            <View
                style={{
                    marginTop: "10%",
                    height: "60%",
                    width: "100%",
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
            >
                <View>
                    <Text style={{ fontSize: 30, color: "white" }}>
                        {" "}
                        Choose your Rank
                    </Text>
                    <Picker
                        selectedValue={playerRank}
                        onValueChange={(value) => handleClickRank(value)}
                        style={{
                            backgroundColor: "white",
                            width: 300,
                        }}
                    >
                        <Picker.Item label={"--"} value={"--"}></Picker.Item>
                        {game && game.elo ? (
                            game.elo.map((rank) => {
                                return (
                                    <Picker.Item
                                        key={rank}
                                        label={rank}
                                        value={rank}
                                    />
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </Picker>
                </View>

                {game ? (
                    game.position.length !== 0 ? (
                        <View>
                            <Text style={{ fontSize: 30, color: "white" }}>
                                {" "}
                                Choose your position
                            </Text>
                            <Picker
                                selectedValue={playerPosition}
                                onValueChange={(value) =>
                                    handleClickPosition(value)
                                }
                                style={{
                                    backgroundColor: "white",
                                    width: 300,
                                }}
                            >
                                <Picker.Item
                                    label={"any"}
                                    value={"any"}
                                ></Picker.Item>
                                {game && game.position ? (
                                    game.position.map((position) => {
                                        return (
                                            <Picker.Item
                                                key={position}
                                                label={position}
                                                value={position}
                                            />
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </Picker>
                        </View>
                    ) : (
                        <></>
                    )
                ) : (
                    <></>
                )}

                {playerRank !== "--" ? (
                    <View style={{ alignItems: "center" }}>
                        <Link
                            to="/PlayersLoL"
                            onPress={handleSubmit}
                            style={{
                                margin: "auto",
                                marginTop: 60,
                                height: 40,
                                width: 80,
                                alignItems: "center",
                                borderRadius: 10,
                                border: "none",
                                backgroundColor: "#98228C",
                            }}
                        >
                            <Text
                                style={{
                                    marginTop: 6,
                                    fontSize: 20,
                                    width: "100%",
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                Start
                            </Text>
                        </Link>
                    </View>
                ) : (
                    <></>
                )}
            </View>

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
            <StatusBar style="auto" />
        </View>
    );
}