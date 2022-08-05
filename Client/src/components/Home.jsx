import { Routes, Route } from "react-router-native";
import { View } from "react-native";
import Login from "./Login.jsx";
import Chat from "./Chat.jsx";
import CreateGame from "./CreateGame.jsx";

export default function Home() {
  return (
    <View>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<CreateGame />} />
      </Routes>
    </View>
  );
}
