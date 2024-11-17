import { Pressable, StyleSheet, Text } from "react-native";
function Button({ btnContainerStyle, btnStyle, text, onPress }) {
	return (
		<Pressable style={({ pressed }) => [pressed ? { opacity: 0.6 } : null, btnContainerStyle]} onPress={onPress}>
			<Text style={[styles.btn, btnStyle]}>{text}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	btn: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 4,
		fontSize: 16,
		backgroundColor: "blue",
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
	},
});

export default Button;
