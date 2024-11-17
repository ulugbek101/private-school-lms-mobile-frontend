import { StyleSheet, Text } from "react-native";
import Container from "../components/Layouts/Container";

function StudentsScreen() {
	return (
		<Container>
			<Text style={styles.text}>Students screen</Text>
		</Container>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "#232323",
	},
});

export default StudentsScreen;
