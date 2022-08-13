import { useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { filterByPosition } from "../../redux/actions";
import { connect } from "react-redux";


const FilterPosition = ({position, handlePosition}) => {


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
                onValueChange={ (e)=> handlePosition(e)}
                style={{
                    marginBottom: 10,
                    width: "100%",
                    backgroundColor: "#fff",
                }}
            >
                <Picker.Item label="All" value="All" />
                {position.length > 0 &&
                    position.map((data) => (
                        <Picker.Item key={data} label={data} value={data} />
                    ))}
            </Picker>
        </View>
    );
};

export default FilterPosition;
