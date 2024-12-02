import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import useAxios from "../../hooks/useAxios";
import LoadingOverlay from "../LoadingOverlay";
import ActionButton from "../UI/ActionButton";
import { useNavigation } from "@react-navigation/native"

function TeacherTableItem({ item, index, fetchTeachers }) {
	const navigation = useNavigation()
	const axiosInstance = useAxios();
	const [isLoading, setIsLoading] = useState(false);

	function confirmSubjectDelete() {
		Alert.alert(
			"Harakatni tasdiqlang",
			`"${item.first_name} ${item.last_name}" ustozni o'chirishga ishonchingiz komilmi ?`,
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
			await axiosInstance.delete(`/teachers/${item.id}/`);
			Alert.alert(`"${item.first_name} ${item.last_name}" ustoz muvaffaqiyatli o'chirildi`);
			fetchTeachers();
		} catch (error) {
			console.error(error);
			Alert.alert("Xatolik", "Ustozni o'chirishda xatolik ketdi");
			fetchTeachers();
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
				<Text style={styles.columnText}>{item.first_name} {item.last_name}</Text>
			</View>
			<View style={[styles.column, { flex: 3, flexDirection: "row", gap: 4 }]}>
				<ActionButton
					// onPress={() => navigation.navigate("subject-update", { subject: item, fetchSubjects: fetchSubjects })}
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

export default TeacherTableItem;
