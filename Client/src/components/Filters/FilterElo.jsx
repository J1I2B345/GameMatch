import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import { useState } from 'react';

const FilterElo = ({elo, handleElo}) => {
     const [option, setOption] = useState('Any');

     function handleAll(e) {
          setOption(e);
          handleElo(e);
     }


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
                    Filter By Elo
               </Text>
               <Picker
                    selectedValue={option}
                    onValueChange={(e) => handleAll(e)}
                    style={{
                         marginBottom: 10,
                         width: '100%',
                         backgroundColor: '#fff',
                    }}
               >
                    <Picker.Item label="All" value="All" />
                    {elo.length > 0 &&
                         elo.map((data) => <Picker.Item key={data} label={data} value={data} />)}
               </Picker>
          </View>
     );
};

export default FilterElo;