import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { filterByPosition } from '../../redux/actions/create';
import { connect } from 'react-redux';

const FilterPosition = () => {
     const dispatch = useDispatch();
     const [option, setOption] = useState('All');

     let [position, setPosition] = useState([]);

     const fetchPosition = async () => {
          try {
               const response = await axios.get('https://backend-gamematch.herokuapp.com/games');
               const respuesta = response.data;
               setPosition(respuesta[1].position);
          } catch (error) {
               console.error(error.message);
          }
     };

     useEffect(() => {
          fetchPosition();
     }, []);

     function handleAll(e) {
          setOption(e);
          handleClickFilter(e);
     }

     function handleClickFilter(e) {
          dispatch(filterByPosition(e));
     }

     return (
          <View
               style={{
                    width: '40%',
                    color: 'white',
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginLeft: 30,
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
                    Filter By Position
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
                    {position.length > 0 &&
                         position.map((data) => (
                              <Picker.Item key={data} label={data} value={data} />
                         ))}
               </Picker>
          </View>
     );
};

export default FilterPosition;
