import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Nav from "./Nav";
import Spinner from "./Spinner";

const Profile = () => {
  const User = useSelector((state) => state.games.userProfile);

  let arrayStars = [];

  if (User.rating) {
    if (User.rating.$numberDecimal) {
      (() => {
        let ratingCont = User.rating.$numberDecimal;
        while (ratingCont > 0) {
          ratingCont = ratingCont - 1;
          arrayStars.push(arrayStars.length + 1);
        }
        return arrayStars;
      })();
    }
  }

  return (
    <View>
      {User._id && User.username ? (
        <View style={styles.container}>
          <View style={styles.portada_container}>
            <Image
              source={{
                uri: User.img
                  ? User.img
                  : "https://www.pinpng.com/pngs/m/402-4020060_random-image-from-user-smash-ball-pixel-art.png",
              }}
              style={styles.img_perfil}
            />
            <View style={styles.portada}>
            {User.premium == true ? (
            <View >
              <Text
                style={{
                  color: "white",
                  fontSize: 45,
                  marginTop:-70,
                }}
              ></Text>
              <Text
                style={{ color: "gold", fontSize: 35, fontWeight: "bold" }}
              >
                ⭐VIP⭐
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 35,
                  fontStyle: "italic",
                  marginBottom: -10
                }}
              >
              </Text>
            </View>
          ) : (
            <View></View>
          )}
              <Text style={styles.text_name}>{User.username}</Text>
              
              <View style={styles.stars_container}>
                {arrayStars.map((item) => (
                  <View key={item}>
                    <Image
                      source={require("../../assets/Star.png")}
                      style={styles.stars}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View
            style={
              User.premium == false
                ? { ...styles.separador, marginBottom: 10 }
                : styles.separador
            }
          ></View>


          {User.premium == false ? (
            <View style={{ paddingBottom: 5 }}>
              <Link
                to="/whypremium"
                activeOpacity={1}
                underlayColor={"#f4b04d"}
                style={styles.button}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.button_text}>
                    <Image
                      source={require("../../assets/starPremium.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    Become VIP!
                    <Image
                      source={require("../../assets/starPremium.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </Text>
                </View>
              </Link>
            </View>
          ) : (
            <View></View>
          )}
          <SafeAreaView
            style={
              User.premium == false
                ? {
                    width: "100%",
                    marginBottom: 315,
                    alignItems: "center",
                    justifyContent: "center",
                  }
                : {
                    width: "100%",
                    marginBottom: 260,
                    alignItems: "center",
                    justifyContent: "center",
                  }
            }
          >
            <ScrollView>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {User.description ? (
                  <View
                    style={{
                      ...styles.info_container,
                      paddingBottom: 20,
                      marginTop: 0,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                      }}
                    >
                      {User.description}
                    </Text>
                  </View>
                ) : (
                  <View></View>
                )}
                {User.socialNetworks ? (
                  <View
                    style={
                      User.socialNetworks.steam == "" &&
                      User.socialNetworks.riot == "" &&
                      User.socialNetworks.discord == "" &&
                      User.socialNetworks.ig == "" &&
                      User.socialNetworks.twitter == ""
                        ? { display: "none" }
                        : User.description
                        ? {
                            ...styles.info_container,
                            marginTop: -5,
                          }
                        : styles.info_container
                    }
                  >
                    <Text style={styles.users_title}>
                      {(User.socialNetworks.steam !== "" &&
                        User.socialNetworks.riot == "" &&
                        User.socialNetworks.discord == "" &&
                        User.socialNetworks.ig == "" &&
                        User.socialNetworks.twitter == "") ||
                      (User.socialNetworks.steam == "" &&
                        User.socialNetworks.riot !== "" &&
                        User.socialNetworks.discord == "" &&
                        User.socialNetworks.ig == "" &&
                        User.socialNetworks.twitter == "") ||
                      (User.socialNetworks.steam == "" &&
                        User.socialNetworks.riot == "" &&
                        User.socialNetworks.discord !== "" &&
                        User.socialNetworks.ig == "" &&
                        User.socialNetworks.twitter == "") ||
                      (User.socialNetworks.steam == "" &&
                        User.socialNetworks.riot == "" &&
                        User.socialNetworks.discord == "" &&
                        User.socialNetworks.ig !== "" &&
                        User.socialNetworks.twitter == "") ||
                      (User.socialNetworks.steam == "" &&
                        User.socialNetworks.riot == "" &&
                        User.socialNetworks.discord == "" &&
                        User.socialNetworks.ig == "" &&
                        User.socialNetworks.twitter !== "") ||
                      Object.keys(User.socialNetworks).length == 1
                        ? "User:"
                        : "Users"}
                    </Text>
                    <Text
                      style={
                        User.socialNetworks.steam
                          ? styles.users_item
                          : { display: "none" }
                      }
                    >
                      ֍ Steam: {User.socialNetworks.steam}
                    </Text>
                    <Text
                      style={
                        User.socialNetworks.riot
                          ? styles.users_item
                          : { display: "none" }
                      }
                    >
                      ֍ Riot: {User.socialNetworks.riot}
                    </Text>
                    <Text
                      style={
                        User.socialNetworks.discord
                          ? styles.users_item
                          : { display: "none" }
                      }
                    >
                      ֍ Discord: {User.socialNetworks.discord}
                    </Text>

                    <Text
                      style={
                        User.socialNetworks.ig
                          ? styles.users_item
                          : { display: "none" }
                      }
                    >
                      ֍ Instagram: {User.socialNetworks.ig}
                      {/* {Linking.openURL('https://www.instagram.com/new.affection_/')} */}
                    </Text>

                    <Text
                      style={
                        User.socialNetworks.twitter
                          ? styles.users_item
                          : { display: "none" }
                      }
                    >
                      ֍ Twitter: {User.socialNetworks.twitter}
                    </Text>
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
          <Link
            to="/profile/edit"
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
              source={require("../../assets/editProfile.png")}
              style={{ width: 50, height: 50 }}
            />
          </Link>
          <StatusBar style="auto" />
        </View>
      ) : (
        <Spinner />
      )}
      <Nav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },
  portada_container: {
    marginTop: Constants.statusBarHeight + 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  portada: {
    margin: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
  },
  img_perfil: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  text_name: {
    width: "90%",
    color: "white",
    textAlign: "center",
    fontSize: 30,
  },
  stars_container: {
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  stars: {
    margin: 5,
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  separador: {
    marginBottom: 15,
    height: 2,
    width: "90%",
    backgroundColor: "#98228C",
  },
  info_container: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    paddingBottom: 10,
    borderRadius: 20,
    width: "90%",
    backgroundColor: "#443ABB",
    justifyContent: "center",
  },
  users_title: {
    width: "100%",
    color: "#fff",
    fontSize: 25,
    paddingBottom: 10,
  },
  users_item: {
    color: "#fff",
    fontSize: 16,
    padding: 20,
    paddingTop: 0,
    paddingLeft: 28,
  },
  button: {
    margin: 20,
    marginTop: 5,
    marginBottom: 10,
    height: 40,
    width: "55%",
    alignItems: "center",
    borderRadius: 10,
    border: "none",
    backgroundColor: "#fbcb1b",
  },
  button_text: {
    marginTop: 6,
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
});

export default Profile;
