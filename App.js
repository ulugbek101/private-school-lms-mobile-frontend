import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "react-native-vector-icons"
import { DrawerToggleButton } from "@react-navigation/drawer";


import LoginScreen from "./screens/LoginScreen"
import ProfileScreen from "./screens/ProfileScreen"
import AuthContextProvider, { AuthContext } from "./store/auth-context"
import { useContext } from "react"

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator({ route }) {
	const { logout } = useContext(AuthContext);
	
	return (
		<Drawer.Navigator initialRouteName="profile" screenOptions={{
			headerRight: () => <Ionicons onPress={logout} style={{ marginRight: 12 }} size={24} name="log-out-outline" color="#232323" />,
		}}>
			<Drawer.Screen name="profile" component={ProfileScreen} />
		</Drawer.Navigator>
	);
}

function App() {
	return (
		<NavigationContainer>
			<AuthContextProvider>
				<Stack.Navigator initialRouteName="drawer">
					<Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
					<Stack.Screen name="drawer" component={DrawerNavigator} options={{ headerShown: false }} />
				</Stack.Navigator>
			</AuthContextProvider>
		</NavigationContainer>
	);
}

export default App;
