import { Routes, Route } from 'react-router-native';
import { View } from 'react-native';
import Login from './Login.jsx';
import SelectGame from './SelectGame.jsx';
import RoomLoL from './RoomLoL.jsx';
import RoomCS from './RoomCS.jsx';
import RoomR6 from './RoomR6.jsx';
import Form from './Form.jsx';
import Chat from './Chat.jsx';
import CreateGame from './CreateGame.jsx';
import Profile from './Profile.jsx';
import WhyPremium from './WhyPremium.jsx';
import BuyPremium from './BuyPremium.jsx';
import News from './News.jsx';
import CreateNews from './CreateNews.jsx';
import SelectChat from './SelectChat.jsx';
import EditProfile from './EditProfile.jsx';
import Register from './Register.jsx';

const Home = () => {
     return (
          <View>
               <Routes>
                    <Route path="/" element={<Login />} />
                    <Route exact path="/selectgame" element={<SelectGame />} />
                    <Route path="form/:id" element={<Form />} />
                    <Route path="/createGame" element={<CreateGame />} />
                    <Route path="/playersLoL" element={<RoomLoL />} />
                    <Route path="/playersCS" element={<RoomCS />} />
                    <Route path="/playersR6" element={<RoomR6 />} />
                    <Route path="selectchat" element={<SelectChat />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/edit" element={<EditProfile />} />
                    <Route path="/whypremium" element={<WhyPremium />} />
                    <Route path="/buypremium" element={<BuyPremium />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/add" element={<CreateNews />} />
                    <Route path="/register" element={<Register />} />
               </Routes>
          </View>
     );
};

export default Home;
