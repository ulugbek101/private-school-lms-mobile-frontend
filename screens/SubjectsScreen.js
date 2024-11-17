import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Container from "../components/Layouts/Container";
import Button from "../components/UI/Button"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { Ionicons } from "react-native-vector-icons"

function SubjectsScreen() {
	const SUBJECTS = [
		{
			id: 1,
			name: "Matematika",
		},
		{
			id: 2,
			name: "Ona tili",
		},
		{
			id: 3,
			name: "Ingliz tili",
		},
	]
	return (
		<Container>
			<View style={styles.header}>
				<Button btnStyle={styles.btn} text="+ Fan qo'shish" />
			</View>
			<View style={styles.tableContainer}>
				<View style={styles.table}>
					<View style={[styles.row, styles.headerRow]}>
						<View style={[styles.column, { flex: 1 }]}>
							<Text style={[styles.columnText, styles.headerRowText]}>№</Text>
						</View>
						<View style={[styles.column, { flex: 8 }]}>
							<Text style={[styles.columnText, styles.headerRowText]}>Fan nomi</Text>
						</View>
						<View style={[styles.column, { flex: 3 }]}>
							{/* Icons here */}
						</View>
					</View>
					<FlatList alwaysBounceVertical={false} data={SUBJECTS} renderItem={({ item, index }) => (
						<View style={styles.row}>
							<View style={[styles.column, { flex: 1 }]}>
								<Text style={styles.columnText}>{index + 1}</Text>
							</View>
							<View style={[styles.column, { flex: 8 }]}>
								<Text style={styles.columnText}>{item.name}</Text>
							</View>
							<View style={[styles.column, { flex: 3, flexDirection: "row", gap: 4 }]}>
								<TouchableOpacity style={[styles.icon, { backgroundColor: "orange" }]}>
									<Ionicons name="pencil-outline" size={20} color="white" />
								</TouchableOpacity>
								<TouchableOpacity style={[styles.icon, { backgroundColor: "red" }]}>
									<Ionicons name="trash-outline" size={20} color="white" />
								</TouchableOpacity>
							</View>
						</View>
					)} />
				</View>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	header: {
		alignItems: "flex-end",
	},
	tableContainer: {
		flex: 1,
		marginTop: 20,
	},
	table: {
		flex: 1,
	},
	headerRow: {
		paddingVertical: 8,
	},
	headerRowText: {
		fontWeight: "bold",
	},
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
	btn: {
		paddingVertical: 8,
		backgroundColor: "#232323"
	},
	icon: {
		borderRadius: 4,
		paddingVertical: 4,
		paddingHorizontal: 8,
	}
});

export default SubjectsScreen;
