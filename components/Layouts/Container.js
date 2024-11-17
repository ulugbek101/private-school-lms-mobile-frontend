import { StyleSheet, View } from "react-native";

function Container({ children }) {
	return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
		padding: 25,
	},
});

export default Container;
