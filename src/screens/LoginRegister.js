import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase/app';
import 'firebase/firestore';
import auth from 'firebase/auth'
import db from 'firebase/database'
import AsyncStorage from '@react-native-community/async-storage'

import { Global } from '../../Global'


export function LoginRegister({ route, navigation }) {

    const { name } = route.params;

    const [getLoginMail, setLoginMail] = React.useState('')
    const [getLoginPassword, setLoginPassword] = React.useState('')

    const [getRegisterMail, setRegisterMail] = React.useState('')
    const [getName, setName] = React.useState('');
    const [getRegisterPassword, setRegisterPassword] = React.useState('')
    const [getRegisterPasswordAgain, setRegisterPasswordAgain] = React.useState('')

    React.useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            console.log(Global.isLogin)

        });

        return () => {
            unsubscribe;
        };
    }, [navigation]);

    const createUser = async (email, password) => {
        try {
            let response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            if (response) {
                console.log("Basarili")
                alert("Kaydınız yapıldı, giriş yapabilirsiniz.")
                navigation.navigate('LoginRegister', {
                    name: "Login"
                })
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    const saveUser = async () => {
        try {
            const value = await AsyncStorage.setItem('USER', "user");
        } catch (e) {
            console.log('Failed to save the data to the storage')
        }
    }

    const loginUser = async (email, password) => {
        try {
            firebase.auth().signInWithEmailAndPassword(email, password);
            firebase.auth().onAuthStateChanged(user => {
                saveUser();
                alert("Basariyla Giris yapildi");
                navigation.navigate("Main", {
                    isLogin: true
                })
                Global.isLogin = true
            })
        } catch (error) {
            console.log(error.toString(error));
        }
    }


    return (
        <View style={styles.Container}>

            {name === "Login" ?
                <View>
                    <Image
                        style={{ width: '100%', height: Dimensions.get('screen').height, position: 'absolute' }}
                        source={{
                            uri: 'https://i.pinimg.com/originals/bd/34/c7/bd34c7cb7363d44af5f9902374b14d88.png'
                        }}
                    />
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: Dimensions.get('screen').height, position: 'absolute', marginTop: 0 }} />

                    <View style={styles.LoginScreenContainer}>
                        <View style={[styles.TextInputContainer]}>
                            <Ionicons name="mail" size={24} color="black" style={{ alignSelf: 'center' }} />
                            <TextInput
                                style={styles.InputStyle}
                                placeholder={"E-posta adresinizi giriniz"}
                                name={"Mail"}
                                keyboardType="email-address"
                                value={getLoginMail}
                                onChangeText={setLoginMail}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            <Ionicons name="key" size={24} color="black" style={{ alignSelf: 'center' }} />
                            <TextInput
                                style={styles.InputStyle}
                                placeholder={"Şifrenizi giriniz"}
                                name={"Password"}
                                keyboardType="numeric"
                                secureTextEntry={true}
                                value={getLoginPassword}
                                onChangeText={setLoginPassword}
                            />
                        </View>

                        <View style={{ width: '85%', marginTop: 10 }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('LoginRegister', {
                                    name: 'Register'
                                })
                            }}>
                                <Text style={{ fontSize: 16, color: '#fff' }}>
                                    <Text>Hesabınız Yok mu? </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Kayıt Ol</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '100%', marginTop: 30 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    loginUser(getLoginMail, getLoginPassword)

                                }}
                                style={styles.ButtonStyle}>
                                <Text style={styles.ButtonTextStyle}>Giriş Yap</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
                :
                <View>

                    <Image
                        style={{ width: '100%', height: 200 }}
                        source={{
                            uri: 'https://i.pinimg.com/originals/bd/34/c7/bd34c7cb7363d44af5f9902374b14d88.png'
                        }} />

                    <View style={{ marginTop: 20 }}>
                        <View style={[styles.TextInputContainer, { backgroundColor: '#fff', width: '92%' }]}>
                            <Ionicons name="mail" size={24} color="black" style={{ alignSelf: 'center' }} />
                            <TextInput
                                style={styles.InputStyle}
                                placeholder={"E-posta adresinizi giriniz"}
                                name={"Mail"}
                                keyboardType="email-address"
                                value={getRegisterMail}
                                onChangeText={setRegisterMail}
                            />
                        </View>

                        <View style={[styles.TextInputContainer, { backgroundColor: '#fff', width: '92%' }]}>
                            <FontAwesome name="user" size={24} color="black" style={{ alignSelf: 'center' }} />
                            <TextInput
                                style={styles.InputStyle}
                                placeholder={"İsminizi giriniz"}
                                name={"name"}
                                keyboardType="email-address"
                                value={getName}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={[styles.TextInputContainer, { backgroundColor: '#fff', width: '92%' }]}>
                            <Ionicons name="key" size={24} color="black" style={{ alignSelf: 'center' }} />
                            <TextInput
                                style={styles.InputStyle}
                                placeholder={"Şifrenizi giriniz"}
                                name={"Password"}
                                keyboardType="numeric"
                                secureTextEntry={true}
                                value={getRegisterPassword}
                                onChangeText={setRegisterPassword}
                            />
                        </View>
                    </View>
                    <View style={[styles.TextInputContainer, { backgroundColor: '#fff', width: '92%' }]}>
                        <Ionicons name="key" size={24} color="black" style={{ alignSelf: 'center' }} />
                        <TextInput
                            style={styles.InputStyle}
                            placeholder={"Şifrenizi Tekrar giriniz"}
                            name={"PasswordAgain"}
                            keyboardType="numeric"
                            secureTextEntry={true}
                            value={getRegisterPasswordAgain}
                            onChangeText={setRegisterPasswordAgain}
                        />
                    </View>

                    <View style={{ width: '100%', marginTop: 30 }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (getRegisterMail === "" || getName === "" || getRegisterPassword === "" || getRegisterPasswordAgain === "") {
                                    alert('Lutfen gerekli alanlari doldurunuz')
                                }
                                else {
                                    if (getRegisterPassword.length < 6) {
                                        alert("Şifreniz en az 6 haneli olmalıdır.")
                                    }
                                    else if (getRegisterPassword !== getRegisterPasswordAgain) {
                                        alert("Şifreler aynı değildir.")
                                    }
                                    else {
                                        createUser(getRegisterMail, getRegisterPassword)
                                    }


                                }
                            }}
                            style={[styles.ButtonStyle, { width: '92%', backgroundColor: '#d07440' }]}>
                            <Text style={[styles.ButtonTextStyle, { color: '#fff' }]}>Kayıt Ol</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('LoginRegister', {
                                    name: "Login"
                                })
                            }}
                            style={{ marginTop: 20, width: '100%' }}>
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>Zaten Hesabım Var</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            }

        </View >
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    TextInputStyle: {
        backgroundColor: '#e8e8e8',
        width: '90%',
        paddingLeft: 20,
        padding: 15,
        borderRadius: 8,
        fontSize: 16,
        margin: 0
    },
    LoginScreenContainer: {
        padding: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextInputContainer: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 8,
        flexDirection: 'row',
        marginVertical: 5,
        width: '85%',
        alignSelf: 'center',
        backgroundColor: '#e8e8e8',
    },

    InputStyle: {
        marginVertical: 5,
        width: '85%',
        paddingLeft: 20,
        fontSize: 18,
        margin: 0,
        color: '#000'
    },
    ButtonStyle: {
        padding: 15,
        backgroundColor: '#e8e8e8',
        borderRadius: 8,
        elevation: 8,
        width: '85%',
        alignSelf: 'center'
    },
    ButtonTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})