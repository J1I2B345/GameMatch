import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { filterByEloLoL } from '../../redux/actions/create';

const FilterElo = () => {
     const dispatch = useDispatch();
     const [option, setOption] = useState('All');

     let [elo, setElo] = useState([]);

     const fetchElos = async () => {
          try {
               const response = await axios.get('https://backend-gamematch.herokuapp.com/games');
               const respuesta = response.data;
               setElo(respuesta[0].elo);
          } catch (error) {
               console.error(error.message);
          }
     };

     useEffect(() => {
          fetchElos();
     }, []);

     function handleAll(e) {
          setOption(e);
          handleClickFilter(e);
     }

     function handleClickFilter(e) {
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
                    onValueChange={(value, index) => handleAll(value)}
                    style={{
                         marginBottom: 10,
                         width: '100%',
                         backgroundColor: '#fff',
                    }}
               >
                    <Picker.Item label="All" value="All" />
                    {elo.length > 0 && elo.map((data) => <Picker.Item label={data} value={data} />)}
               </Picker>
          </View>
     );
};

export default FilterElo;
