import { StatusBar } from 'expo-status-bar';
import {
     StyleSheet,
     Text,
     View,
     Image,
     SafeAreaView,
     ScrollView,
     TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getAllNews } from '../redux/actions/index.js';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Nav from './Nav';
import Spinner from './Spinner';

const News = () => {
     const dispatch = useDispatch();
     const news = useSelector((state) => state.games.news);

     useEffect(() => {
          dispatch(getAllNews());
     }, [dispatch]);

     const imgDefecto = (
          <Image
               source={require('../../assets/iconMenssage.png')}
               style={{
                    width: 30,
                    height: 30,
               }}
          />
     );

     return (
          <View>
               {news.length > 0 ? (
                    <View style={styles.container}>
                         <View style={styles.portada_container}>
                              <Text
                                   style={{
                                        marginTop: Constants.statusBarHeight + 10,
                                        marginBottom: 20,
                                        width: '80%',
                                        color: 'white',
                                        textAlign: 'center',
                                        fontSize: 45,
                                   }}
                              >
                                   News
                              </Text>
                         </View>

                         <View
                              style={{
                                   marginBottom: 5,
                                   height: 2,
                                   width: '90%',
                                   backgroundColor: '#98228C',
                              }}
                         ></View>

                         <SafeAreaView style={{ width: '100%', marginBottom: 170 }}>
                              <ScrollView>
                                   <View style={{ alignItems: 'center' }}>
                                        {news.map((data) => (
                                             <View key={data._id} style={styles.card_container}>
                                                  <TouchableOpacity
                                                       style={{
                                                            position: 'absolute',
                                                            top: 12,
                                                            right: 10,
                                                       }}
                                                  >
                                                       <Image
                                                            source={require('../../assets/iconTrash.png')}
                                                            style={{
                                                                 width: 20,
                                                                 height: 20,
                                                            }}
                                                       />
                                                  </TouchableOpacity>
                                                  <View
                                                       style={{
                                                            flexDirection: 'row',
                                                       }}
                                                  >
                                                       <View
                                                            style={{
                                                                 backgroundColor: '#9d0e9c',
                                                                 borderRadius: 50,
                                                                 padding: 5,
                                                                 justifyContent: 'center',
                                                                 alignItems: 'center',
                                                                 width: 45,
                                                                 height: 45,
                                                            }}
                                                       >
                                                            {data.author &&
                                                            data.author.length > 0 &&
                                                            data.author[0].img ? (
                                                                 <Image
                                                                      source={{
                                                                           uri: data.author[0].img,
                                                                      }}
                                                                      style={{
                                                                           width: 45,
                                                                           height: 45,
                                                                           borderRadius: 50,
                                                                      }}
                                                                 />
                                                            ) : (
                                                                 imgDefecto
                                                            )}
                                                       </View>
                                                       <View style={{ marginLeft: 10 }}>
                                                            <Text style={styles.user}>
                                                                 {data.author.length > 0
                                                                      ? data.author[0].username
                                                                      : 'Developers'}
                                                            </Text>
                                                            <Text style={styles.date}>
                                                                 {moment(data.createdAt).format(
                                                                      'MMMM d'
                                                                 )}{' '}
                                                                 at{' '}
                                                                 {moment(data.createdAt).format(
                                                                      'h:mm A'
                                                                 )}
                                                            </Text>
                                                       </View>
                                                  </View>
                                                  <Text
                                                       style={
                                                            data.title
                                                                 ? styles.card_title
                                                                 : { display: 'none' }
                                                       }
                                                  >
                                                       {data.title}
                                                  </Text>
                                                  <Text
                                                       style={
                                                            data.title
                                                                 ? styles.description
                                                                 : {
                                                                        ...styles.description,
                                                                        marginTop: 5,
                                                                   }
                                                       }
                                                  >
                                                       {data.description}
                                                  </Text>
                                             </View>
                                        ))}
                                   </View>
                              </ScrollView>
                         </SafeAreaView>
                         <Link
                              to="/news/add"
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
                                   source={require('../../assets/editProfile.png')}
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
          height: '100%',
          width: '100%',
          alignItems: 'center',
     },
     card_container: {
          margin: 10,
          marginBottom: 5,
          padding: 20,
          paddingTop: 10,
          paddingBottom: 10,
          width: '95%',
          borderRadius: 10,
          backgroundColor: '#443ABB',
     },
     user: {
          fontSize: 20,
          color: '#fff',
     },
     date: {
          fontSize: 11,
          color: '#bbb',
     },
     card_title: {
          margin: 3,
          marginLeft: 0,
          fontSize: 18,
          color: '#fff',
     },
     description: {
          marginLeft: 15,
          fontSize: 16,
          color: '#fff',
     },
});

export default News;
