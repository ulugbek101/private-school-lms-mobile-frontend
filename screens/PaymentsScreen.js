import { StyleSheet, Text } from "react-native";
import Container from "../components/Layouts/Container";

function PaymentsScreen() {
	return (
		<Container>
			<Text style={styles.text}>Payments screen</Text>
		</Container>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "#232323",
	},
});

export default PaymentsScreen;
