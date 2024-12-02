import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Container from "../../components/Layouts/Container";
import LoadingOverlay from "../../components/LoadingOverlay";
import TeacherTableItem from "../../components/Teachers/TeacherTableItem";
import Button from "../../components/UI/Button";
import useAxios from "../../hooks/useAxios";

function TeachersScreen() {
	const [teachers, setTeachers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const axiosInstance = useAxios();

	async function fetchTeachers() {
		setIsLoading(true);
		try {
			const response = await axiosInstance.get("/teachers/");
			setTeachers(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	function handleNewTeacher() {}

	useEffect(() => {
		fetchTeachers();
	}, []);

	return (
		<Container>
			<View style={styles.header}>
				<Button
					onPress={handleNewTeacher}
					btnStyle={styles.btn}
					text="+ Fan qo'shish"
				/>
			</View>
			<View style={styles.tableContainer}>
				<View style={styles.table}>
					<View style={[styles.row, styles.headerRow]}>
						<View style={[styles.column, { flex: 1 }]}>
							<Text style={[styles.columnText, styles.headerRowText]}>№</Text>
						</View>
						<View style={[styles.column, { flex: 8 }]}>
							<Text style={[styles.columnText, styles.headerRowText]}>FIO</Text>
						</View>
						<View style={[styles.column, { flex: 3 }]}>{/* Icons here */}</View>
					</View>
					{isLoading && <LoadingOverlay visible={isLoading} />}
					{!isLoading && (
						<FlatList
							alwaysBounceVertical={false}
							data={teachers}
							renderItem={({ item, index }) => (
								<TeacherTableItem
									item={item}
									index={index}
									fetchTeachers={fetchTeachers}
								/>
							)}
						/>
					)}
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
	columnText: {
		fontSize: 16,
		textAlign: "center",
	},
	btn: {
		paddingVertical: 8,
		backgroundColor: "#232323",
	},
});

export default TeachersScreen;
