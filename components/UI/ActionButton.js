import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";

function ActionButton({ onPress, iconContainerStyle, name, size, color }) {
	return (
		<TouchableOpacity onPress={onPress} style={[styles.icon, iconContainerStyle]}>
			<Ionicons name={name} size={size} color={color} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	icon: {
		borderRadius: 4,
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
});

export default ActionButton;
