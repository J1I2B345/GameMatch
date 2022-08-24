import { NativeRouter } from "react-router-native";
import { Provider } from "react-redux";
import configureStore from "./src/redux/store/configureStore";
import AppContainer from "./src/components/AppContainter.jsx";

const store = configureStore();

export default function App() {
	return (
		<NativeRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</NativeRouter>
	);
}
