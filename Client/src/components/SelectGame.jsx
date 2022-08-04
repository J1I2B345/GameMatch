import {View, Text, FlatList, Image} from "react-native"
import { useState, useEffect } from "react"
import axios from "axios"
import Constants from "expo-constants"

export default function SelectGame(){
let [games, setGames] = useState([])

const fetchGames = async () => {
    try{
        const response = await axios.get("https://backend-gamematch.herokuapp.com/games")
        const respuesta = response.data
        setGames(respuesta)
        console.log(games)
    }
    catch (error){
        console.error(error.message);
    }
}

useEffect(() => {
    fetchGames()
}, [])

    return (
        <View style={{alignItems: "center"}}>
            <Text>soy select game</Text>
            {
                games.length > 0 &&
                <View>
                    <Image source={{uri: games[0].image}} style={{width: 200, height: 200}}/>
                    <Image source={{uri: games[1].image}} style={{width: 200, height: 200}}/>
                    <Image source={{uri: games[2].image}} style={{width: 200, height: 200}}/>
                </View>
            }
        </View>
    )
}