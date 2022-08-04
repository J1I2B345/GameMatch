import { View, Text } from "react-native";
import { Link } from "react-router-native"
import Constants from "expo-constants"
import { Routes, Route } from "react-router-native"
import SelectGame from "./SelectGame.jsx"
import Login from "./Login.jsx"

export default function Home (){
    return (
        <View style={{marginTop: Constants.statusBarHeight}}>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/selectgame" element={<SelectGame/>} />
            </Routes>  
        </View>
    )
}