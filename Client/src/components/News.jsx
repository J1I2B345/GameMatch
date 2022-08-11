import { View, StyleSheet, Text, FlatList } from "react-native";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../redux/actions/news";
import { connect } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-web";

export default function News() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getAllNews());
  }, []);

  if (!news.news) return <Text>Cargando</Text>;
  return (
    <View>
      <Text style={styles.News}>News</Text>
      <FlatList
        style={{ marginBottom: 600 }}
        data={news.news}
        renderItem={({ item: news }) => (
          <View key={news._id} style={styles.container}>
            <Text style={styles.title}>{news.title}</Text>
            <Text style={styles.description}>{news.description}</Text>
            <Text style={styles.date}>
              {moment(news.createdAt).format("ddd-mm-yyyy")}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",

    borderRadius: 20,
    shadowOpacity: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      height: 10,
      width: 5,
    },
    backgroundColor: "#fff",
    marginTop: 30,
  },
  image: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  News: {
    height: 100,
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 30,
    color: "#fff",
  },
  heading: {},
  author: {
    fontWeight: "bold",
    fontSize: 15,
  },
  date: {
    fontWeight: "bold",
    color: "#e63946",
    fontSize: 15,
  },
  source: {
    color: "#e63946",
    fontWeight: "bold",
    fontSize: 18,
  },
});
