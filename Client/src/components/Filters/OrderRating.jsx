import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

const OrderRating = () => {
     const dispatch = useDispatch();
     const [option, setOption] = useState('All');

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
                    selectedValue={option}
                    onValueChange={(value, index) => setOption(value)}
                    style={{
                         marginBottom: 10,
                         width: '100%',
                         backgroundColor: '#fff',
                    }}
               >
                    <Picker.Item label="Random" value="Unknow" />
                    <Picker.Item label="Min-Max" value="Min-Max" />
                    <Picker.Item label="Max-Min" value="Max-Min" />
               </Picker>
          </View>
     );
};

export default OrderRating;
