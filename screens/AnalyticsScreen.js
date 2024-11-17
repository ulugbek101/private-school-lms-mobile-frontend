import { StyleSheet, Text } from "react-native";
import Container from "../components/Layouts/Container";

function AnalyticsScreen() {
	return (
		<Container>
			<Text style={styles.text}>Analytics screen</Text>
		</Container>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "#232323",
	},
});

export default AnalyticsScreen;
