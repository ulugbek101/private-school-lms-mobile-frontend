import React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";

function LoadingOverlay({ visible, text = "Iltimos, kuting ..." }) {
	return (
		<Modal
			transparent={true}
			animationType="fade"
			visible={visible}
			onRequestClose={() => {}}
		>
			<View style={styles.modalBackground}>
				<View style={styles.activityIndicatorContainer}>
					<ActivityIndicator size="large" color="#232323" />
					<Text style={styles.loadingText}>{text}</Text>
				</View>
			</View>
		</Modal>
	);
}

export default LoadingOverlay;

const styles = StyleSheet.create({
	modalBackground: {
        zIndex: 2,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	activityIndicatorContainer: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	loadingText: {
		marginTop: 10,
		fontSize: 16,
		color: "#000",
	},
});
