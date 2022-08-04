import { Routes, Route } from 'react-router-native';
import { View } from 'react-native';
import Login from './Login.jsx';

export default function Home() {
     return (
          <View>
               <Routes>
                    <Route path="/" element={<Login />} />
               </Routes>
          </View>
     );
}
