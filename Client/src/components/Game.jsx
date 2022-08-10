import { Image, View } from "react-native";
import { Link } from "react-router-native";

export default function Game ({id, image}) {
    return (
        <View>
            <Link to={`/form/${id}`} style={{ margin: 5,}} activeOpacity={1} underlayColor={""}>
                <Image style={{width: 340, height: 180, borderRadius: 20 }} source={{uri: image}}/>
            </Link>
        </View>
    )
}