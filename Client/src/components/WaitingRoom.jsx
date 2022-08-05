import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import { Link } from 'react-router-native';

const WaintingRoom = () => {
     return (
          <View style={styles.container}>
               <StatusBar style="auto" />
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          width: '100%',
          alignItems: 'center',
     },
});

export default WaintingRoom;
