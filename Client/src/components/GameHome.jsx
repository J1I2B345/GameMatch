import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import Nav from './Nav';
import GameCard from './GameCard';

const GameHome = () => {
     return (
          <View
               style={{
                    alignItems: 'center',
                    height: '100%',
               }}
          >
               <Text
                    style={{
                         marginTop: Constants.statusBarHeight + 10,
                         marginBottom: 10,
                         color: 'white',
                         fontSize: 40,
                    }}
               >
                    Select your game
               </Text>
               <GameCard />
               <Nav />
               <StatusBar style="auto" />
          </View>
     );
};

export default GameHome;
