import { Routes, Route } from 'react-router-native';
import { View } from 'react-native';
import Login from './Login.jsx';

const Home = () => {
     return (
          <View>
               <Routes>
                    <Route path="/" element={<Login />} />
               </Routes>
          </View>
     );
};

export default Home;
