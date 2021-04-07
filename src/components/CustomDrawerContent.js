import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
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
                                props.navigation.navigate('Main')
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
                        style={styles.LoginRegisterButton}>
                        <Text style={[styles.LoginRegisterButtonText, {color:'white'}]}>Giriş Yap</Text>

                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', }}>
                    <TouchableOpacity
                        style={[styles.LoginRegisterButton, 
                            {backgroundColor:'#fff', borderWidth:2, borderColor:'#d07440', borderRadius:8}]}>
                        <Text style={[styles.LoginRegisterButtonText, {color:'#d07440'}]}>Kayıt Ol</Text>
                    </TouchableOpacity>
                </View>
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
    LoginRegisterContainer:{
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