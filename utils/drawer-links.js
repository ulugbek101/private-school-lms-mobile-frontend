import AnalyticsScreen from "../screens/AnalyticsScreen";
import GroupsScreen from "../screens/GroupsScreen";
import PaymentsScreen from "../screens/PaymentsScreen";
import StudentsScreen from "../screens/StudentsScreen";
import SubjectsScreen from "../screens/SubjectsScreen";
import TeachersScreen from "../screens/TeachersScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { Ionicons } from "react-native-vector-icons"


function DrawerIcons(status, name, focused, size, color) {
	const iconMap = {
		SUPERUSER: {
			subjects: focused ? "book" : "book-outline",
			teachers: focused ? "people" : "people-outline",
			groups: focused ? "list" : "list-outline",
			students: focused ? "school" : "school-outline",
			analytics: focused ? "bar-chart" : "bar-chart-outline",
			payments: focused ? "cash" : "cash-outline",
			profile: focused ? "person" : "person-outline",
		},
	};

	return <Ionicons name={iconMap[status][name]} size={size} color={color} />;
}

export function DrawerLinks(status) {
	const DrawerLinks = {
		SUPERUSER: [
			{
				name: "subjects",
				component: SubjectsScreen,
				options: {
					drawerIcon: ({ size, color, focused }) =>
						DrawerIcons(status, "subjects", focused, size, color),
					title: "Fanlar",
					headerTitleAlign: "center",
				},
			},
			{
				name: "teachers",
				component: TeachersScreen,
				options: {
					drawerIcon: ({ size, color, focused }) =>
						DrawerIcons(status, "teachers", focused, size, color),
					title: "Ustozlar",
					headerTitleAlign: "center",
				},
			},
			{
				name: "groups",
				component: GroupsScreen,
				options: {
					drawerIcon: ({ size, color, focused }) =>
						DrawerIcons(status, "groups", focused, size, color),
					title: "Guruhlar",
					headerTitleAlign: "center",
				},
			},
			{
				name: "students",
				component: StudentsScreen,
				options: {
					drawerIcon: ({ size, color, focused }) =>
						DrawerIcons(status, "students", focused, size, color),
					title: "O'quvchilar",
					headerTitleAlign: "center",
				},
			},
			{
				name: "analytics",
				component: AnalyticsScreen,
				options: {
					drawerIcon: ({ size, color, focused }) =>
						DrawerIcons(status, "analytics", focused, size, color),
					title: "Analitika",
					headerTitleAlign: "center",
				},
			},
			{
				name: "payments",
				component: PaymentsScreen,
				options: {
					drawerIcon: ({ size, color, focused }) =>
						DrawerIcons(status, "payments", focused, size, color),
					title: "To'lovlar",
					headerTitleAlign: "center",
				},
			},
			{
				name: "profile",
				component: ProfileScreen,
				options: {
					drawerIcon: ({ size, color, focused }) =>
						DrawerIcons(status, "profile", focused, size, color),
					title: "Shaxsiy kabinet",
					headerTitleAlign: "center",
				},
			},
		],
	};

	return DrawerLinks[status];
}
