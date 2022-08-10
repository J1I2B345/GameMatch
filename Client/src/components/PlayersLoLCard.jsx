import React from 'react';
import { FlatList, View, Image, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-native';
import { useSelector } from 'react-redux';

const PlayerLoLCard = ({ id, img, name, elo, position, rating }) => {

   

     return (
          <View key={id} style={{ margin: 5 }}>
               <Link to="/" activeOpacity={1} underlayColor={''}>
                    <View
                         style={{
                              width: 340,
                              height: 80,
                              borderRadius: 20,
                              backgroundColor: '#3519B0',
                              flexDirection: 'row',
                         }}
                    >
                         <Image
                              source={{ uri: img }}
                              style={{
                                   marginTop: 10,
                                   marginLeft: 20,
                                   width: 60,
                                   height: 60,
                                   borderRadius: 50,
                              }}
                         />
                         <View
                              style={{
                                   marginTop: 13,
                                   marginLeft: 10,
                                   width: '75%',
                                   flexDirection: 'row',
                              }}
                         >
                              <Text
                                   style={{
                                        paddingRight: 10,
                                        width: '50%',
                                        fontSize: 20,
                                        color: '#fff',
                                        textAlign: 'center',
                                   }}
                              >
                                   {name}
                              </Text>
                              <View style={{ width: '50%' }}>
                                   <Text
                                        style={{
                                             fontSize: 13,
                                             color: '#fff',
                                        }}
                                   >
                                        Elo: {elo}
                                   </Text>
                                   <Text
                                        style={{
                                             fontSize: 13,
                                             color: '#fff',
                                        }}
                                   >
                                        Position: {position}
                                   </Text>
                                   <Text
                                        style={{
                                             fontSize: 13,
                                             color: '#fff',
                                        }}
                                   >
                                        Calification: {rating}
                                   </Text>
                              </View>
                         </View>
                    </View>
               </Link>
          </View>
     );
};

export default PlayerLoLCard;
