import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { baseURL } from "../constants";

export const AuthContext = createContext({
	user: null,
	authTokens: null,
	login: () => {},
	logout: () => {},
});

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [authTokens, setAuthTokens] = useState(null);
	const navigation = useNavigation();

	useEffect(() => {
		async function checkAuthTokens() {
			try {
				const tokens = await AsyncStorage.getItem("authTokens");

				if (tokens) {
					setAuthTokens(JSON.parse(tokens));
					setUser(jwtDecode(JSON.parse(tokens).access));
					navigation.navigate("drawer");
				} else {
					navigation.reset({
						index: 0,
						routes: [{ name: "login" }],
					});
				}
			} catch (error) {
				console.error("Error checking auth tokens, error description:", error);
				navigation.reset({
					index: 0,
					routes: [{ name: "login" }],
				});
			}
		}

		checkAuthTokens();
	}, [navigation]);

	async function login(email, password, setError, setIsLoading) {
		try {
			const response = await axios.post(`${baseURL}/token/`, {
				email,
				password,
			});
			const tokens = response.data;
			const user = tokens.access;
			const decodedUser = jwtDecode(user);

			await AsyncStorage.setItem("authTokens", JSON.stringify(tokens));
			setUser(decodedUser);
			setAuthTokens(tokens);

			navigation.navigate("drawer");
		} catch (error) {
			console.log(error);
			if (error.status === 401) {
				setError(401);
			} else if (error.status == 404) {
				setError(404);
			} else {
				setError(500);
			}
		} finally {
			setIsLoading(false);
		}
	}

	async function logout() {
		setUser(null);
		setAuthTokens(null);
		await AsyncStorage.removeItem("authTokens");
		navigation.reset({
			index: 0,
			routes: [{ name: "login" }],
		});
	}

	const value = {
		user,
		setUser,
		authTokens,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
