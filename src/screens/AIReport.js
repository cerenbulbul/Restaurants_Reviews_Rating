import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image, TextInput } from 'react-native'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { List } from 'react-native-paper';

const KategoriData = [
    {
        id: 0,
        name: "Tatlıcı"
    },
    {
        id: 1,
        name: "Bar"
    },
    {
        id: 2,
        name: "Meyhane"
    },
    {
        id: 3,
        name: "Restoran"
    },
    {
        id: 4,
        name: "Kafe"
    },
    {
        id: 5,
        name: "Ye ve Kalk"
    },
]

const SemtData = [
    {
        id:0,
        name:''
    }
]

export function AIReport() {

    const [getRestoranIsmi, setRestoranIsmi] = React.useState();
    const [getKategori, setKategori] = React.useState("Kategori Seçiniz");
    const [getSemt, setSemt] = React.useState("Semt Seçiniz");

    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);

    return (
        <View style={styles.Container}>
            <Image
                style={{ width: '100%', height: 170, position: 'absolute', marginTop: 0 }}
                source={{ uri: 'https://jegxdwep1p-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/artificialintelligence-1440x840-1080x675.jpg' }}
            />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: 170, position: 'absolute', marginTop: 0 }} />


            <Text
                style={{ marginTop: 110, color: '#fff', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
                Restoran Bilgilerini Gör
            </Text>

            <ScrollView style={{ marginTop: 50 }}>
                <View style={[styles.TextInputContainer, { backgroundColor: '#fff', width: '92%' }]}>
                    <Ionicons name="restaurant" size={24} color="black" style={{ alignSelf: 'center' }} />
                    <TextInput
                        style={styles.InputStyle}
                        placeholder={"Restoran ismi giriniz"}
                        name={"name"}
                        keyboardType="email-address"
                        value={getRestoranIsmi}
                        onChangeText={setRestoranIsmi}
                    />
                </View>
                <List.Section style={{ marginLeft: 20 }}>
                    <List.Accordion
                        title={getKategori}
                        theme={{ colors: { primary: '#d07440' } }}
                        left={() => <MaterialIcons name="category" size={24} color="black" />}
                    >
                        {KategoriData.map((item, index) => (
                            <List.Item
                                title={item.name}
                                key={index}
                                onPress={() => {
                                    alert(item.name)
                                }} />
                        ))}
                    </List.Accordion>

                    <List.Accordion
                        title={getSemt}
                        theme={{ colors: { primary: '#d07440' } }}
                        left={() => <MaterialCommunityIcons name="city" size={24} color="black" />}>
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>
                </List.Section>

                <View style={{ width: '100%', marginTop: 30, marginBottom: 30 }}>
                    <TouchableOpacity style={[styles.ButtonStyle, { width: '92%', backgroundColor: '#d07440' }]}>
                        <Text style={[styles.ButtonTextStyle, { color: '#fff' }]}>Gönder</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
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