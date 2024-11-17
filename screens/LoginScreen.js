import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import Button from "../components/UI/Button";

import { Ionicons } from "react-native-vector-icons"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../store/auth-context"

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const { login } = useContext(AuthContext)

    useEffect(() => {
        if (error === 401) {
            Alert.alert("Xatolik", "E-mail manzil yoki Parol xato terilgan");
        }
        else if (error === 500) {
            Alert.alert("Server xatoligi", "Serverga ulanib bo'lmayapti, internetingiz yoniqligiga ishonch hosil qiling");
        }
        else if (error == 400) {
            Alert.alert("Forma noto'g'ri to'ldirilgan", "E-mail manzil to'liq bo'lishi va '@' belgisi bilan yozilishi shart va Parol ham bo'lsh bo'lmasligi kerak")
        }
    }, [error])

    function handleLogin() {
        setError(null);
        if (email.trim().length <= 0 ||
            password.trim().length <= 0 ||
            !email.includes("@")
        ) {
            setError(400)
            return;
        }
        login(email, password, setError);
    }

	return (
        <ImageBackground style={styles.background} source={require("../assets/login.jpg")}>
            <View style={styles.container}>
                <Image source={require("../assets/login_icon.jpg")} style={styles.icon} />
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Ionicons style={styles.inputIcon} size={30} name="person-outline" color="white" />
                        <TextInput value={email} onChangeText={email => setEmail(email)} keyboardType="email-address" style={styles.input} placeholder="E-mail manzil" placeholderTextColor="white" autoCapitalize="none" autoCorrect={false} autoFocus={true} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity onPress={() => setPasswordIsVisible(!passwordIsVisible)} style={styles.inputIcon}>
                            <Ionicons size={30} name={!passwordIsVisible ? 'eye-outline' : 'eye-off-outline'} color="white" autoCapitalize="none" autoCorrect={false} />
                        </TouchableOpacity>
                        <TextInput value={password} onChangeText={password => setPassword(password)} style={styles.input} placeholder="Parol" placeholderTextColor="white" secureTextEntry={!passwordIsVisible} />
                    </View>
                    <Button onPress={handleLogin} text="Tizimga kirish" btnStyle={styles.btnStyle} />
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 100,
        width: "80%",
    },
    background: {
        flex: 1,
        alignItems: "center",
    },
    icon: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    form: {
        width: "100%",
        gap: 10,
        marginTop: 40,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },
    input: {
        flex: 1,
        color: "white",
        fontSize: 18,
        paddingVertical: 12,
        paddingHorizontal: 18,
        paddingRight: 60,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: 8,
        fontWeight: "bold",
    },
    inputIcon: {
        position: "absolute",
        right: 18,
        zIndex: 2,
    },
    btnStyle: {
        textAlign: "center",
        paddingVertical: 12,
        backgroundColor: "#232323",
    },
})

export default LoginScreen;
