import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image, TextInput } from 'react-native'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { List } from 'react-native-paper';
import { Global } from '../../Global';

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
        id: 0,
        name: 'Antalya Merkez'
    },
    {
        id: 1,
        name: 'Muratpaşa'
    },
    {
        id: 2,
        name: 'Lara'
    },
    {
        id: 3,
        name: 'Kaş'
    },
    {
        id: 4,
        name: 'Manavgat'
    },
    {
        id: 5,
        name: 'Altınkum'
    },
    {
        id: 6,
        name: 'Şirinyalı'
    },
    {
        id: 7,
        name: 'Alanya'
    },
    {
        id: 8,
        name: 'Zümrütova'
    },
    {
        id: 9,
        name: 'Doğu Garajı'
    },
    {
        id: 10,
        name: 'Kültür'
    },
    {
        id: 11,
        name: 'Özgürlük'
    },
    {
        id: 12,
        name: 'Kemer'
    },
    {
        id: 13,
        name: 'Kumluca'
    },
    {
        id: 14,
        name: 'Kale'
    },
    {
        id: 15,
        name: 'Fener'
    },
    {
        id: 16,
        name: 'Serik'
    },
    {
        id: 17,
        name: 'Özdilek'
    },
    {
        id: 18,
        name: 'Finike'
    },
    {
        id: 19,
        name: 'Alanya'
    },
    {
        id: 20,
        name: 'Korkuteli'
    },
    {
        id: 21,
        name: 'Kepez'
    },
    {
        id: 22,
        name: 'Demre'
    },
    {
        id: 23,
        name: 'Belek'
    },
    {
        id: 12,
        name: 'Döşemealtı'
    },
    {
        id: 24,
        name: 'Beldibi'
    },
    {
        id: 25,
        name: 'Gazipaşa'
    },
]

export function AIReport({route, navigation }) {

    const {isLogin} = route.params;
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

            {Global.isLogin ?
                <ScrollView style={{ marginTop: 50 }}>
                    <View style={[styles.TextInputContainer, { backgroundColor: '#fff', width: '92%' }]}>
                        <Ionicons name="restaurant" size={24} color="black" style={{ alignSelf: 'center' }} />
                        <TextInput
                            style={styles.InputStyle}
                            placeholder={"Restoran ismi giriniz"}
                            name={"restoran"}
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
                            {SemtData.map((item, index) => (
                                <List.Item
                                    key={index}
                                    title={item.name}
                                    onPress={() => {
                                        alert(item.name)
                                    }}
                                />
                            ))}

                        </List.Accordion>
                    </List.Section>

                    <View style={{ width: '100%', marginTop: 30, marginBottom: 30 }}>
                        <TouchableOpacity style={[styles.ButtonStyle, { width: '92%', backgroundColor: '#d07440' }]}>
                            <Text style={[styles.ButtonTextStyle, { color: '#fff' }]}>Gönder</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
                :
                <View style={{ marginTop: 50, padding: 20 , height:"60%", width:'100%', justifyContent:'center'}}>
                    <Text style={styles.DangerMessageTitle}>Yapayzeka Puanlamasını görmek için lütfen üye olunuz.</Text>

                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('LoginRegister', {
                                    name: 'Login'
                                })
                            }}
                            style={styles.ButtonStyleAIPart}>
                            <Text style={styles.ButtonTextStyleAIPart}>Giriş Yap</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('LoginRegister', {
                                    name: 'Register'
                                })
                            }}
                            style={[styles.ButtonStyleAIPart, { backgroundColor: '#fff', borderWidth: 2, borderColor: '#d07440' }]}>
                            <Text style={[styles.ButtonTextStyleAIPart, { color: '#d07440' }]}>Kayıt Ol</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

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
    },
    DangerMessageTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',

    },

    ButtonContainer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        width: '100%',
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
    
})