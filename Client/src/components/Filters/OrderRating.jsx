import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { connect } from 'react-redux';

const OrderRating = ({handleOrder}) => {
     return (
          <View
               style={{
                    width: '40%',
                    color: 'white',
                    textAlign: 'center',
                    justifyContent: 'center',
               }}
          >
               <Text
                    style={{
                         marginBottom: 10,
                         color: 'white',
                         textAlign: 'center',
                         fontSize: 16,
                    }}
               >
                    Order By Rating
               </Text>
               <Picker
                    onValueChange={(e) => handleOrder(e)}
                    style={{
                         marginBottom: 10,
                         width: '100%',
                         backgroundColor: '#fff',
                    }}
               >
                    <Picker.Item label="Any" value="Any" />
                    <Picker.Item label="Max-Min" value="Max-Min" />
                    <Picker.Item label="Min-Max" value="Min-Max" />
               </Picker>
          </View>
     );
};

export default OrderRating;
