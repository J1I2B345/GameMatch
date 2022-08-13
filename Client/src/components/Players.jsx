import React from 'react';
import {View, Text } from 'react-native';
import PlayerCard from './PlayerCard';

export default function Players ({players}) {
     return (
        <View>
            {  players.length > 0 ? (
                    players.map((player, i) => {
                            return <PlayerCard
                            key={i}
                            img={player.img}
                            id={player._id}
                                name={player.username}
                                elo={player.elo}
                                position={player.position}
                                rating={player.rating.$numberDecimal}
                                />
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
        </View>
     )}