import { View, StyleSheet, Text } from "react-native";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../redux/actions/news";
import { connect } from "react-redux";

export default function News() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getAllNews());
  }, []);
  console.log({ news });

  if (!news.news) return <Text>Cargando</Text>;
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", height: "100%" }}>
        {news.news.map((t) => (
          <Text style={styles.title} key={t.title}>
            {t.title}
          </Text>
        ))}
        {news.news.map((t) => (
          <Text style={styles.description} key={t.description}>
            {t.description}
          </Text>
        ))}

        {news.news.map((t) => (
          <Text style={styles.createdAt} key={t.createdAt}>
            {moment(t.createdAt).format("MMM Do YY")}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 40,
    shadowOpacity: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    backgroundColor: "#fff",
    marginTop: 20,
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
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
