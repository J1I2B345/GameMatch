import { Routes, Route } from 'react-router-native';
import { View } from 'react-native';
import Login from './Login.jsx';
import SelectGame from './SelectGame.jsx';
// import GameHome from './GameHome.jsx';
import WaitingRoom from './WaitingRoom.jsx';

const Home = () => {
     return (
          <View>
               <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/selectgame" element={<SelectGame />} />
                    {/* <Route path="/GameHome" element={<GameHome />} /> */}
                    <Route path="/players" element={<WaitingRoom />} />
               </Routes>
          </View>
     );
};

export default Home;
