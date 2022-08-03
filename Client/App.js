import { NativeRouter } from 'react-router-native';
import Login from './src/components/Login.jsx';
import Home from './src/components/Home.jsx';

export default function App() {
     return (
          <NativeRouter>
               <Login />
               <Home />
          </NativeRouter>
     );
}
