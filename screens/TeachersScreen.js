import { StyleSheet, Text } from "react-native";
import Container from "../components/Layouts/Container";

function TeachersScreen() {
	return (
		<Container>
			<Text style={styles.text}>Teachers screen</Text>
		</Container>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "#232323",
	},
});

export default TeachersScreen;
