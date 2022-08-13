import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { filterByEloLoL } from '../../redux/actions';
import { connect } from 'react-redux';

const FilterElo = ({elo}) => {
     const dispatch = useDispatch();
     const [option, setOption] = useState('All');

     function handleClick(e) {
          setOption(e);
          dispatch(filterByEloLoL(e));
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
                    onValueChange={(value, index) => handleClick(value)}
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