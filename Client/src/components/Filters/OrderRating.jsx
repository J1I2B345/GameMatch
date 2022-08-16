import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { orderByRating } from "../../redux/actions";

const OrderRating = () => {
	const [option, setOption] = useState("Any");
	const dispatch = useDispatch();
	const state = useSelector((state) => state.games.rating);

	const handleAll = (e) => {
		setOption(e);
		dispatch(orderByRating(e));
	};

	useEffect(() => {
		setOption(state);
	}, [option]);

	return (
		<View
			style={{
				width: "40%",
				color: "white",
				textAlign: "center",
				justifyContent: "center",
			}}
		>
			<Text
				style={{
					marginBottom: 10,
					color: "white",
					textAlign: "center",
					fontSize: 16,
				}}
			>
				Order By Rating
			</Text>
			<Picker
				selectedValue={option}
				onValueChange={(e) => handleAll(e)}
				style={{
					marginBottom: 10,
					width: "100%",
					backgroundColor: "#fff",
				}}
			>
				<Picker.Item label="Any" value="Any" />
				<Picker.Item label="Max-Min" value="Max-Min" />
				<Picker.Item label="Min-Max" value="Min-Max" />
			</Picker>
		</View>
	);
};

export default OrderRating;
