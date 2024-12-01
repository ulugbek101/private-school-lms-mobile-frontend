import { useContext, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Container from "../components/Layouts/Container";
import LoadingOverlay from "../components/LoadingOverlay";
import Button from "../components/UI/Button";
import { baseURL, mediaURL } from "../constants";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../store/auth-context";
import { userStatuses } from "../utils/user-statuses";

function ProfileScreen() {
	const { user, setUser } = useContext(AuthContext);
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [email, setEmail] = useState(user.email);
	const axiosInstance = useAxios();
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		setFirstName(user.first_name)
		setLastName(user.last_name)
		setEmail(user.email)
	}, [user.first_name, user.last_name, user.email])

	async function onFormSubmit() {
		if (!firstName || firstName.length < 3) {
			setErrors(prevErrors => ({
				...prevErrors,
				firstName: "Ism eng kamida 3 ta belgidan iborat bo'lishi shart",
			}));
		} else {
			delete errors.firstName;
		}
		if (!lastName || lastName.length < 3) {
			setErrors(prevErrors => ({
				...prevErrors,
				lastName: "Familiya eng kamida 3 ta belgidan iborat bo'lishi shart",
			}));
		} else {
			delete errors.lastName;
		}
		if (!email || !email.includes("@")) {
			setErrors(prevErrors => ({
				...prevErrors,
				email: "Email manzil to'g'ri kiritilmadi",
			}));
		} else {
			delete errors.email;
		}

		if (!errors) return;

		setIsLoading(true);
		const formData = {
			first_name: firstName[0].toUpperCase() + firstName.slice(1).toLowerCase(),
			last_name: lastName[0].toUpperCase() + lastName.slice(1).toLowerCase(),
			email: email.toLowerCase(),
		};

		try {
			const response = await axiosInstance.patch(
				`${baseURL}/users/${user.id}/`,
				formData
			);
			setUser(response.data);
			Alert.alert("Ma'lumotlar muvaffaqiyatli yangilandi !");
		} catch (error) {
			if (error.status === 400 && error.response.data.email) {
				setErrors(prevErrors => ({
					...prevErrors,
					email: "Email manzil noto'g'ri kiritilgan",
				}));
			} else {
				Alert.alert(
					"Ma'lumotlarni yangilashda xatolik yuz berdi, status: " + error.status
				);
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Container>
			<View style={styles.profileImageContainer}>
				<Image
					source={{
						uri: `${!user.profile_image.includes("http") ? mediaURL : ""}${
							user.profile_image
						}`,
					}}
					style={styles.profileImage}
				/>
				<View style={styles.profileInfoContainer}>
					<Text style={styles.fullName}>
						{user.first_name} {user.last_name}
					</Text>
					<Text style={styles.email}>{user.email}</Text>
					<Text style={styles.status}>{userStatuses[user.role]}</Text>
				</View>
			</View>
			<View style={styles.form}>
				<TextInput
					value={firstName}
					onChangeText={value => setFirstName(value)}
					style={styles.input}
					placeholder="Ism"
					autoCapitalize="words"
					autoCorrect={false}
				/>
				{errors.firstName && (
					<Text style={styles.errorText}>{errors.firstName}</Text>
				)}
				<TextInput
					value={lastName}
					onChangeText={value => setLastName(value)}
					style={styles.input}
					placeholder="Familiya"
					autoCapitalize="words"
					autoCorrect={false}
				/>
				{errors.lastName && (
					<Text style={styles.errorText}>{errors.lastName}</Text>
				)}
				<TextInput
					value={email}
					onChangeText={value => setEmail(value)}
					style={styles.input}
					keyboardType="email-address"
					placeholder="E-mail manzil"
					autoCapitalize="none"
					autoCorrect={false}
				/>
				{errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
				<Button
					onPress={onFormSubmit}
					btnStyle={styles.btnStyle}
					text="Yangilash"
				/>
			</View>
			{isLoading && <LoadingOverlay visible={true} />}
		</Container>
	);
}

const styles = StyleSheet.create({
	profileImage: {
		width: 100,
		height: 100,
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: "50%",
		padding: 5,
	},
	profileImageContainer: {
		alignItems: "center",
	},
	fullName: {
		fontWeight: 600,
		fontSize: 20,
		marginTop: 10,
	},
	status: {
		marginTop: 5,
		fontWeight: 600,
	},
	email: {
		marginTop: 5,
		fontWeight: 600,
		fontSize: 15,
	},
	profileInfoContainer: {
		alignItems: "center",
	},
	form: {
		marginTop: 15,
		gap: 10,
	},
	input: {
		color: "black",
		fontSize: 18,
		paddingVertical: 10,
		paddingHorizontal: 10,
		paddingRight: 60,
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 5,
		fontWeight: 600,
	},
	btnStyle: {
		textAlign: "center",
		paddingVertical: 12,
		backgroundColor: "#232323",
	},
	errorText: {
		fontWeight: 600,
		fontSize: 14,
		color: "red",
		marginTop: 2,
	},
});

export default ProfileScreen;
