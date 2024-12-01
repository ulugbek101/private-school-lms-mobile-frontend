import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import useAxios from "../../hooks/useAxios";
import LoadingOverlay from "../LoadingOverlay";
import ActionButton from "../UI/ActionButton";
import { useNavigation } from "@react-navigation/native"

function SubjectTableItem({ item, index, fetchSubjects }) {
	const navigation = useNavigation()
	const axiosInstance = useAxios();
	const [isLoading, setIsLoading] = useState(false);

	function confirmSubjectDelete() {
		Alert.alert(
			"Harakatni tasdiqlang",
			`${item.name} fanini o'chirishga ishonchingiz komilmi ?`,
			[
				{
					text: "Bekor qilish",
					style: "destructive",
				},
				{
					text: "Ha",
					onPress: handleSubjectDelete,
				},
			],
			{ cancelable: true }
		);
	}

	async function handleSubjectDelete() {
		setIsLoading(true);
		try {
			const response = await axiosInstance.delete(`/subjects/${item.id}/`);
			Alert.alert(`"${item.name}" fani muvaffaqiyatli o'chirildi`);
			fetchSubjects();
		} catch (error) {
			console.error(error);
			Alert.alert("Xatolik", "Fanni o'chirishda xatolik ketdi");
			fetchSubjects();
		} finally {
			setIsLoading(false);
		}
	}

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
					onPress={() => navigation.navigate("subject-update", { subject: item, fetchSubjects: fetchSubjects })}
					name="pencil-outline"
					size={20}
					color="white"
					iconContainerStyle={{ backgroundColor: "orange" }}
				/>
				<ActionButton
					onPress={confirmSubjectDelete}
					name="trash-outline"
					size={20}
					color="white"
					iconContainerStyle={{ backgroundColor: "red" }}
				/>
			</View>
			<LoadingOverlay visible={isLoading} />
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
