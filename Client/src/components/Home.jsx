import { Routes, Route } from 'react-router-native';
import { View } from 'react-native';
import Login from './Login.jsx';
import SelectGame from './SelectGame.jsx';
// import GameHome from './GameHome.jsx';
import RoomLoL from './RoomLoL.jsx';
import RoomCS from './RoomCS.jsx';
import RoomR6 from './RoomR6.jsx';

const Home = () => {
     return (
          <View>
               <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/selectgame" element={<SelectGame />} />
                    {/* <Route path="/GameHome" element={<GameHome />} /> */}
                    <Route path="/playersLoL" element={<RoomLoL />} />
                    <Route path="/playersCS" element={<RoomCS />} />
                    <Route path="/playersR6" element={<RoomR6 />} />
               </Routes>
          </View>
     );
};

export default Home;
