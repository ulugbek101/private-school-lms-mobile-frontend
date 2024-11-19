import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { Alert } from "react-native";
import { baseURL } from "../constants";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native"

function useAxios() {
	const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);
    const navigation = useNavigation()

	const axiosInstance = axios.create({
		baseURL,
		headers: {
			Authorization: `Bearer ${authTokens?.access}`,
		},
	});

	axiosInstance.interceptors.request.use(
		async req => {
			let tokens = authTokens;

			// Load tokens from AsyncStorage if not in memory
			if (!tokens) {
				const storedTokens = await AsyncStorage.getItem("authTokens");
				tokens = storedTokens ? JSON.parse(storedTokens) : null;
				req.headers.Authorization = `Bearer ${tokens?.access}`;
			}

			if (tokens?.access) {
				const user = jwtDecode(tokens.access);
				const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

				if (!isExpired) {
					return req; // Token is still valid
				}

				// Refresh the access token
				try {
					const response = await axios.post(`${baseURL}/token/refresh/`, {
						refresh: tokens.refresh,
					});
					// Update tokens in AsyncStorage and context
					await AsyncStorage.setItem(
						"authTokens",
						JSON.stringify(response.data)
					);
					setAuthTokens(response.data);
					setUser(jwtDecode(response.data.access));

					// Set the new access token in the header
					req.headers.Authorization = `Bearer ${response.data.access}`;
				} catch (error) {
					console.error("Token refresh failed:", error);
					setAuthTokens(null);
					setUser(null);
					await AsyncStorage.removeItem("authTokens");
					navigation.navigate("login");
					Alert.alert(
						"Xatolik",
						"Sessiya vaqti tugadi, iltimos, qaytadan tizimga kiring"
					);
				}
			}

			return req;
		},
		error => {
			Alert.alert("Xatolik", "Fanlarni olishda xatolik yuz berdi");
			return Promise.reject(error); // Handle request errors
		}
	);

	return axiosInstance;
}

export default useAxios;
