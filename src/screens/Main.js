import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { SearchBar, Tabs, Card, CheckBox, ListItem } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase/app';
import 'firebase/firestore';
import auth from 'firebase/auth'
import db from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyANvsZZPTYeev4ea00D_CdwgeRjpue3Z-k",
    authDomain: "restaurantrate-2d435.firebaseapp.com",
    databaseURL: "https://restaurantrate-2d435.firebaseio.com",
    projectId: "restaurantrate-2d435",
    storageBucket: "restaurantrate-2d435.appspot.com",
    messagingSenderId: "808867548018",
    appId: "1:808867548018:web:18834108e203dc28ebabeb"
};
firebase.initializeApp(firebaseConfig);


export function Main() {

    const [searchValue, setSearchValue] = React.useState('');
    const [getLoader, setLoader] = React.useState(false);
    const [todos, setTodos] = React.useState([]);

    const saveData = async (data) => {
        try {
            const value = await AsyncStorage.getItem('DATA');
            console.log(value)
            if (value === null) {
                await AsyncStorage.setItem('DATA', data)
                console.log('Data successfully saved')
            }
            else {
            }
        } catch (e) {
            console.log('Failed to save the data to the storage')
        }
    }

    const getDataAvaible = async () => {
        try {
            const value = await AsyncStorage.getItem('DATA');
            console.log(value)
            if (value === null) {
                const ref = firebase.firestore().collection("restaurants")
                ref.onSnapshot(querySnapshot => {
                    const list = [];
                    querySnapshot.forEach(doc => {
                        const { restaurant, grade } = doc.data();
                        list.push({
                            id: doc.id,
                            grade,
                            restaurant,
                        });
                    });
                    setTodos(list);
                    console.log(list)
                    saveData(list);
                });
            }
        } catch (e) {
            console.log('Failed to save the data to the storage')
        }
    }
    return (
        <ScrollView style={styles.Container}>
            <Image source={{ uri: 'https://images.squarespace-cdn.com/content/v1/5c5c3833840b161566b02a76/1573133725500-Y5PCN0V04I86HDAT8AT0/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/WBC_7095.jpg?format=2500w' }}
                style={{ width: '100%', height: 300, position: 'absolute', marginTop: 0 }} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: 300, position: 'absolute', marginTop: 0 }}></View>


            <View style={{ marginTop: 30 }}>
                <Text style={styles.HeaderTitleSmall}>Antalya Bölgesinden Restoran Arat</Text>
                <Text style={styles.HeaderTitleBig}>Skorunu Gör</Text>
                <SearchBar
                    placeholder={'Restoran Adı Giriniz'}
                    lightTheme
                    platform="ios"
                    cancelButtonTitle=""
                    inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                    containerStyle={{ backgroundColor: 'transparent', }}
                    inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                    rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                    leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    onSubmitEditing={() => {
                        setLoader(true);
                    }}
                    showLoading={true}
                />

                <TouchableOpacity
                    onPress={() => {
                        getDataAvaible();
                    }}
                    style={styles.SearchButton}>
                    <Text style={styles.SearchButtonText}>Skorunu Gör</Text>
                </TouchableOpacity>

            </View>

            <View style={{ marginTop: 90, backgroundColor: '#ffeade' }}>
                <View style={styles.IconContainer}>
                    <View style={styles.IconLineContainer}>
                        <Image source={{ uri: 'https://image.flaticon.com/icons/png/512/2103/2103626.png' }}
                            style={{ width: 100, height: 100, }} />
                        <Image source={{ uri: 'https://www.pinclipart.com/picdir/big/355-3551153_long-flowing-piece-of-paper-with-pie-charts.png' }}
                            style={{ width: 110, height: 95, }} />
                    </View>

                    <View style={styles.IconLineContainer}>

                        <Image source={{ uri: 'https://cdn0.iconfinder.com/data/icons/seo-and-web-37/256/rangking-512.png' }}
                            style={{ width: 100, height: 100, }} />

                        <Image source={{ uri: 'https://image.flaticon.com/icons/png/512/272/272369.png' }}
                            style={{ width: 100, height: 100, }} />

                    </View>

                </View>

                <Text style={{ marginTop: 20, textAlign: 'center', padding: 20, fontSize: 16 }}>
                    <Text>Aramak istediğiniz restoranın bilgilerini verin, </Text>
                    <Text style={{ fontWeight: 'bold' }}>Yapay Zeka </Text>
                    <Text>puanınızı hesaplasın, semt önerisi versin!</Text>
                </Text>

                <View style={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.ButtonStyleAIPart}>
                        <Text style={styles.ButtonTextStyleAIPart}>Giriş Yap</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.ButtonStyleAIPart, { backgroundColor: '#fff', borderWidth: 2, borderColor: '#d07440' }]}>
                        <Text style={[styles.ButtonTextStyleAIPart, { color: '#d07440' }]}>Kayıt Ol</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    SearchButton: {
        backgroundColor: '#d07440',
        borderRadius: 8,
        elevation: 10,
        padding: 15,
        width: '50%',
        alignSelf: 'center',
        marginTop: 10
    },
    SearchButtonText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#fff',
        textAlign: 'center'
    },
    HeaderTitleSmall: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center'
    },
    HeaderTitleBig: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    IconLineContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    ButtonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        width: '100%'
    },
    ButtonStyleAIPart: {
        padding: 10,
        backgroundColor: '#d07440',
        borderRadius: 8,
        elevation: 10,
    },
    ButtonTextStyleAIPart: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    IconContainer: {
        marginTop: 10
    }
})