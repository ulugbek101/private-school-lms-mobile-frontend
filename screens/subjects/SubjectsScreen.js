import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Container from "../../components/Layouts/Container";
import LoadingOverlay from "../../components/LoadingOverlay";
import Button from "../../components/UI/Button";

import SubjectTableItem from "../../components/Subjects/SubjectTableItem";
import useAxios from "../../hooks/useAxios";

function SubjectsScreen() {
	const [subjects, setSubjects] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const axiosInstance = useAxios();
	const navigation = useNavigation();

	async function fetchSubjects() {
		setIsLoading(true);
		try {
			const response = await axiosInstance.get("/subjects/");
			setSubjects(response.data);
		} catch (error) {
			Alert.alert(
				"Xatolik",
				"Sessiya vaqti tugadi, iltimos, qayatadan tizimga kiring"
			);
			navigation.navigate("login");
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchSubjects();
	}, []);

	function handleNewSubject() {
		navigation.navigate("subject-new", { fetchSubjects: fetchSubjects });
	}

	return (
		<Container>
			<View style={styles.header}>
				<Button
					onPress={handleNewSubject}
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
							<Text style={[styles.columnText, styles.headerRowText]}>
								Fan nomi
							</Text>
						</View>
						<View style={[styles.column, { flex: 3 }]}>{/* Icons here */}</View>
					</View>
					{isLoading && <LoadingOverlay visible={isLoading} />}
					{!isLoading && (
						<FlatList
							alwaysBounceVertical={false}
							data={subjects}
							renderItem={({ item, index }) => (
								<SubjectTableItem
									item={item}
									index={index}
									fetchSubjects={fetchSubjects}
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

export default SubjectsScreen;
