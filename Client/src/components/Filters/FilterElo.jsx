import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';

const FilterElo = ({elo, handleElo}) => {

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
                    onValueChange={e => handleElo(e)}
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