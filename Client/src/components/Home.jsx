import { Routes, Route } from 'react-router-native';
import { View } from 'react-native';
import Login from './Login.jsx';
import SelectGame from './SelectGame.jsx';
import FormLol from './FormLol.jsx';
import FormCs from './FormCs.jsx';
import FormRainbow from './FormRainbow.jsx';
import WaitingRoom from './WaitingRoom.jsx';

const Home = () => {
     return (
          <View>
               <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/selectgame" element={<SelectGame />} />
                    <Route path="/formlol" element={<FormLol />} />
                    <Route path="/formcs" element={<FormCs />} />
                    <Route path="/formrainbow" element={<FormRainbow/>} />
                    <Route path="/players" element={<WaitingRoom />} />
               </Routes>
          </View>
     );
};

export default Home;
