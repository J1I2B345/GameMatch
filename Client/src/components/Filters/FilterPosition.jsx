import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { orderByPosition } from "../../redux/actions";

const FilterPosition = ({ position }) => {
	const [option, setOption] = useState("All");
	const dispatch = useDispatch();
	const state = useSelector((state) => state.games.position);

	function handleAll(e) {
		setOption(e);
		dispatch(orderByPosition(e));
	}

	useEffect(() => {
		setOption(state);
	}, []);

	return (
		<View
			style={{
				width: "40%",
				color: "white",
				textAlign: "center",
				justifyContent: "center",
				marginLeft: 30,
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
				Filter By Position
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
				<Picker.Item label="All" value="All" />
				{position.length > 0 &&
					position.map((data) => <Picker.Item key={data} label={data} value={data} />)}
			</Picker>
		</View>
	);
};

export default FilterPosition;
