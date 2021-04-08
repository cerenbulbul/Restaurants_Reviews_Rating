import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

export function Profile({ navigation }) {
    return (
        <View style={styles.Container}>
            <View style={styles.CardContainer}>
                <Text style={styles.CarContainerTitle}>Ceren Bulbul</Text>
            </View>
            
            <TouchableOpacity 
            onPress={() => {
                navigation.navigate('AIReport')
            }}>
                <Text>AI Report</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    CardContainer:{
        width:'80%',
        padding:20,
        alignSelf:'center',
        marginTop:20
    },
    CarContainerTitle:{
        textAlign:'center',
        fontSize:18,
        fontWeight:'bold'
    }
})