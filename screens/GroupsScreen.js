import { StyleSheet, Text } from "react-native";
import Container from "../components/Layouts/Container";

function GroupsScreen() {
	return (
		<Container>
			<Text style={styles.text}>Groups screen</Text>
		</Container>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "#232323",
	},
});

export default GroupsScreen;
