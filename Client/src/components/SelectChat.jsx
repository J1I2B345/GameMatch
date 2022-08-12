import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Link } from "react-router-native";

export default function SelectChat() {
    let [contacts, setContacts] = useState({});
    let user = useSelector((state) => state.games.user);
    let id = user._id;

    async function getChats() {
        let respuesta = await axios.get(
            `https://backend-gamematch.herokuapp.com/chats/getUsersToChat/${id}`
        );
        let contactsResponse = respuesta.data;
        setContacts(contactsResponse);
    }

    useEffect(() => {
        getChats();
    }, []);

    console.log(contacts);
    return (
        <View style={{ height: "100%", alignItems: "center" }}>
            <StatusBar style="auto" />
            <Text style={{ marginTop: "5%", color: "white", fontSize: 40 }}>
                Chats
            </Text>
            <View style={{ width: "100%", alignItems: "center" }}>
                {contacts.length > 0 ? (
                    contacts.map((contact) => {
                        return (
                            <Link
                                to={`/chat/${contact._id}`}
                                style={{
                                    backgroundColor: "#3519B0",
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: "80%",
                                    marginTop: 20,
                                    padding: 10,
                                }}
                                activeOpacity={1}
                                underlayColor={""}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                    key={contact._id}
                                >
                                    <Image
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 50,
                                        }}
                                        source={{
                                            uri: "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg",
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: "white",
                                            fontSize: 25,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {contact.username}
                                    </Text>
                                </View>
                            </Link>
                        );
                    })
                ) : (
                    <Text>Aun no tienes contactos</Text>
                )}
            </View>
            <Link
                to="/selectgame"
                activeOpacity={1}
                underlayColor={''}
                style={{
                     position: 'absolute',
                     bottom: 80,
                     left: 20,
                     height: 45,
                }}
            >
              <Image
                   source={require('../../assets/iconBack.png')}
                   style={{ width: 50, height: 50 }}
              />
            </Link>
        </View>
    );
}
