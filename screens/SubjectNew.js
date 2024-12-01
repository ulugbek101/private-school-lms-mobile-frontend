import { useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import Container from "../components/Layouts/Container";
import LoadingOverlay from "../components/LoadingOverlay";
import Button from "../components/UI/Button";
import useAxios from "../hooks/useAxios";

function SubjectNew({ route, navigation }) {
	const [subjectName, setSubjectName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const axiosInstance = useAxios();

	async function onNewSubjectAdd() {
		setIsLoading(true);
		try {
			await axiosInstance.post("/subjects/", {
				name: subjectName,
			});
			setIsLoading(false);
			navigation.goBack();
            route.params.fetchSubjects()
		} catch (error) {
			if (error.status === 400 && error.response.data.name) {
				Alert.alert("Xatolik", "Fan nomi bo'sh bo'lishi mumkin emas")
			}
			else if (error.status === 400) {
				Alert.alert("Xatolik", "Bunday nomga ega fan allaqachon mavjud");
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Container>
			<TextInput
				value={subjectName}
				onChangeText={text => setSubjectName(text)}
				style={styles.input}
				placeholder="Fan nomi"
				autoFocus={true}
				autoComplete="off"
				autoCapitalize="words"
				autoCorrect={false}
			/>
			<Button
				onPress={onNewSubjectAdd}
				btnStyle={styles.button}
				text="Fanni qo'shish"
			/>
			<LoadingOverlay visible={isLoading} />
		</Container>
	);
}

const styles = StyleSheet.create({
	input: {
		color: "black",
		fontSize: 18,
		paddingVertical: 12,
		paddingHorizontal: 18,
		borderWidth: 1,
		borderColor: "#232323",
		borderRadius: 8,
		paddingRight: 60,
		fontWeight: "bold",
	},
	button: {
		textAlign: "center",
		paddingVertical: 8,
		backgroundColor: "#232323",
		marginVertical: 15,
	},
});

export default SubjectNew;
