import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

export function Profile({ navigation }) {
    return (
        <View style={styles.Container}>
            <Text>Profile</Text>
            <TouchableOpacity onPress={() => {
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
    }
})