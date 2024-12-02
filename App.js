import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "react-native-vector-icons";

import LoginScreen from "./screens/LoginScreen";

import { useContext } from "react";
import SubjectNew from "./screens/subjects/SubjectNew";
import SubjectUpdate from "./screens/subjects/SubjectUpdate";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { DrawerLinks } from "./utils/drawer-links";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator({ route, navigation }) {
	const { user, logout } = useContext(AuthContext);
	const role = user?.role;
	const drawerLinks = DrawerLinks(role);

	if (!user) {
		return null;
	}

	return (
		<Drawer.Navigator
			screenOptions={{
				headerRight: () => (
					<Ionicons
						onPress={logout}
						style={{ marginRight: 12 }}
						size={24}
						name="log-out-outline"
						color="#232323"
					/>
				),
				drawerItemStyle: { borderRadius: 8 },
			}}
		>
			{drawerLinks &&
				drawerLinks.map((link, index) => (
					<Drawer.Screen key={index} {...link} />
				))}
		</Drawer.Navigator>
	);
}

function App() {
	return (
		<NavigationContainer>
			<AuthContextProvider>
				<Stack.Navigator initialRouteName="drawer">
					<Stack.Screen
						name="login"
						component={LoginScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="drawer"
						component={DrawerNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="subject-new"
						component={SubjectNew}
						options={{
							headerTitle: "Yangi fan",
							headerBackTitle: "Fanlar",
							headerTitleAlign: "center",
						}}
					/>
					<Stack.Screen
						name="subject-update"
						component={SubjectUpdate}
						options={{
							headerTitle: "Fanni yangilash",
							headerBackTitle: "Fanlar",
							headerTitleAlign: "center",
						}}
					/>
				</Stack.Navigator>
			</AuthContextProvider>
		</NavigationContainer>
	);
}

export default App;
