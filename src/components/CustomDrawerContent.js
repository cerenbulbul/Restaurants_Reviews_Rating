import React, { useCallback } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Linking } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import ColorHelper from '../Helper/Color'
import { ListItem } from 'react-native-elements'

const drawerItemList = [
    {
        name: 'Anasayfa',
        icon: '',
    },
    {
        name: 'Tatlıcı',
        icon: '',
    },
    {
        name: 'Bar',
        icon: '',
    },
    {
        name: 'Meyhane',
        icon: '',
    },
    {
        name: 'Restoran',
        icon: '',
    },
    {
        name: 'Kafe',
        icon: '',
    },
    {
        name: 'Ye ve Kalk',
        icon: '',
    },
]

export function CustomDrawerContent(props, navigation) {

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

        return <TouchableOpacity
            onPress={() => {
                handlePress()
            }}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="web" size={24} color="black" />
            <Text style={{ fontSize: 14, marginLeft: 5, alignSelf: 'center' }}>Web sitemizi ziyaret etmek için tıklayınız.</Text>
        </TouchableOpacity>;
    };


    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.ProfileContainer}>

                <TouchableOpacity
                    style={{ width: '80%' }}
                    onPress={() => {
                        props.navigation.navigate('Main')
                    }}>
                    <Text style={styles.DrawerTitle}>Restoran Rapor</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        props.navigation.closeDrawer();
                    }}>
                    <Ionicons name="close" size={26} color="#96999c" />
                </TouchableOpacity>
            </View>

            <View style={styles.DrawerItemContainer}>
                {
                    drawerItemList.map((item, index) => (
                        <ListItem key={index} bottomDivider
                            onPress={() => {
                                if (item.name === "Anasayfa") {
                                    props.navigation.navigate('Main')
                                }
                                else {
                                    props.navigation.navigate('Restorants', {
                                        name: item.name
                                    })
                                }
                            }}>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }
            </View>

            <View
                style={styles.LoginRegisterContainer}>
                <View style={{ width: '100%' }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('LoginRegister', {
                                name: 'Login'
                            })
                        }}
                        style={styles.LoginRegisterButton}>
                        <Text style={[styles.LoginRegisterButtonText, { color: 'white' }]}>Giriş Yap</Text>

                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('LoginRegister', {
                                name: 'Register'
                            })
                        }}
                        style={[styles.LoginRegisterButton,
                        { backgroundColor: '#fff', borderWidth: 2, borderColor: '#d07440', borderRadius: 8 }]}>
                        <Text style={[styles.LoginRegisterButtonText, { color: '#d07440' }]}>Kayıt Ol</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ padding: 15, width: '100%' }}>
                <OpenURLButton url="https://restaurantrate-2d435.web.app/" />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    ProfileContainer: {
        width: '100%',
        marginTop: 40,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    DrawerTitle: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#d07440'
    },
    DrawerItemContainer: {
        marginTop: 30
    },
    LoginRegisterContainer: {
        marginVertical: 20,
    },
    LoginRegisterButton: {
        backgroundColor: "#d07440",
        borderRadius: 6,
        margin: 10,
        padding: 10
    },
    LoginRegisterButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: '#352c2a'
    }

})