import { StyleSheet, Text, View } from "react-native";
import ActionButton from "../UI/ActionButton";

function SubjectTableItem({ item, index }) {
	return (
		<View style={styles.row}>
			<View style={[styles.column, { flex: 1 }]}>
				<Text style={styles.columnText}>{index + 1}</Text>
			</View>
			<View style={[styles.column, { flex: 8 }]}>
				<Text style={styles.columnText}>{item.name}</Text>
			</View>
			<View style={[styles.column, { flex: 3, flexDirection: "row", gap: 4 }]}>
				<ActionButton
					name="pencil-outline"
					size={20}
					color="white"
					iconContainerStyle={{ backgroundColor: "orange" }}
				/>
				<ActionButton
					name="trash-outline"
					size={20}
					color="white"
					iconContainerStyle={{ backgroundColor: "red" }}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#232323",
	},
	column: {
		// borderBottomWidth: 1,
		// borderBottomColor: "#232323",
	},
	columnText: {
		fontSize: 16,
		textAlign: "center",
	},

	icon: {
		borderRadius: 4,
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
});

export default SubjectTableItem;
