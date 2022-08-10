import { Routes, Route } from 'react-router-native';
import { View } from 'react-native';
import Login from './Login.jsx';
import SelectGame from './SelectGame.jsx';
// import GameHome from './GameHome.jsx';
import RoomLoL from './RoomLoL.jsx';
import RoomCS from './RoomCS.jsx';
import RoomR6 from './RoomR6.jsx';
import FormLol from './FormLol.jsx';
import FormCs from './FormCs.jsx';
import FormRainbow from './FormRainbow.jsx';
import Chat from './Chat.jsx';
import CreateGame from './CreateGame.jsx';
import Profile from './Profile.jsx';
import BuyPremium from './BuyPremium.jsx';

const Home = () => {
     return (
          <View>
               <Routes>
                    <Route path="/" element={<Login />} />
                    <Route exact path="/selectgame" element={<SelectGame />} />
                    {/* <Route path="/GameHome" element={<GameHome />} /> */}
                    <Route path="/createGame" element={<CreateGame />} />
                    <Route path="/playersLoL" element={<RoomLoL />} />
                    <Route path="/playersCS" element={<RoomCS />} />
                    <Route path="/playersR6" element={<RoomR6 />} />
                    <Route path="/formlol" element={<FormLol />} />
                    <Route path="/formcs" element={<FormCs />} />
                    <Route path="/formrainbow" element={<FormRainbow />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/buypremium" element={<BuyPremium />} />
               </Routes>
          </View>
     );
};

export default Home;
