import { StyleSheet, Text } from "react-native";
import Container from "../components/Layouts/Container";

function ProfileScreen() {
	return (
		<Container>
			<Text style={styles.text}>Profile screen</Text>
		</Container>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "#232323",
	},
});

export default ProfileScreen;
