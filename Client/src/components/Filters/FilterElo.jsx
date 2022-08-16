import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { orderByElo } from "../../redux/actions";

const FilterElo = ({ elo }) => {
	const [option, setOption] = useState("All");
	const dispatch = useDispatch();
	const state = useSelector((state) => state.games.elo);

	function handleAll(e) {
		setOption(e);
		dispatch(orderByElo(e));
	}

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
				Filter By Elo
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
				{elo.length > 0 &&
					elo.map((data) => (
						<Picker.Item key={data} label={data} value={data} />
					))}
			</Picker>
		</View>
	);
};

export default FilterElo;
