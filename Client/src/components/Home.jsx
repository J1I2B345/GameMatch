import { Routes, Route } from 'react-router-native';
import { View } from 'react-native';
import Login from './Login.jsx';
import Nav from './Nav.jsx';
import SelectGame from './SelectGame.jsx';


const Home = () => {
     return (
          <View>
               <Nav />
               <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/selectgame" element={<SelectGame />} />
               </Routes>
          </View>
     );
};

export default Home;
