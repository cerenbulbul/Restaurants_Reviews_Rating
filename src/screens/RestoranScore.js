import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Global } from '../../Global'
import AsyncStorage from '@react-native-community/async-storage'
//import { BarChart, Grid } from 'react-native-svg-charts'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

export function RestoranScore({ navigation }) {

    const [getGrade, setGrade] = React.useState();
    const [isDetail, setDetail] = React.useState(false);
    const [getRestoranData, setRestoranData] = React.useState();
    const [getLoading, setLoading] = React.useState(true)

    const fill = 'rgb(134, 65, 244)'
    //   const data = [300, 800, 700, 100, 80, 50, 10, 0]

    const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6']
    const keys = ['apples', 'bananas', 'cherries', 'dates']


    const data = {
        labels: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80"],
        datasets: [
            {
                data: [300, 818, 736, 235, 153, 120, 11, 3],
                color: (opacity = 1) => "#853203", // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Puana gore Restoran Sayisi"] // optional
    };

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('SELECTED_ITEM');
            console.log(value)
            if (value !== null) {
                setRestoranData(JSON.parse(value))
                setLoading(false)
            }
            else {
                console.log('Data ulasilamadi')
            }
        } catch (e) {
            console.log('Failed to save the data to the storage')
        }
    }



    React.useEffect(() => {
        getData();
    }, [])

    return (
        <View style={styles.Container}>

            {getLoading ?
                <ActivityIndicator size="large" color="#000" />
                :
                null}
            {console.log(getRestoranData)}
            {getRestoranData !== undefined &&
                <ScrollView style={{ padding: 20 }}>

                    <View style={styles.CardContainer}>
                        <View style={styles.RestoranInfoContainer}>

                            <View style={styles.RestoranPuanContainer}>
                                {getRestoranData.logo !== "" ?
                                    <Image
                                        style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center' }}
                                        source={{ uri: getRestoranData.logo }}
                                    />
                                    :
                                    <Image
                                        style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center' }}
                                        source={{ uri: 'https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png' }}
                                    />
                                }

                                <Text style={styles.PuanText}>{getRestoranData.grade.toString().substring(0, 5)} puan</Text>

                            </View>

                            <View style={styles.RestoranInfo}>
                                <Text style={styles.RestoranInfoTitle}>{getRestoranData.restaurant}</Text>
                                <Text style={styles.RestoranInfoAdress}>{getRestoranData.address}</Text>

                                <View style={styles.RestoranInfoSoicalMedya}>
                                    <View style={styles.RestoranInfoSoicalMedyaItem}>
                                        <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                                        <Text style={styles.SocialMediaText}>{getRestoranData.Facebook.grade} puan</Text>
                                        <Text style={styles.SocialMediaText}>{getRestoranData.Facebook.review} yorum</Text>
                                    </View>

                                    <View style={styles.RestoranInfoSoicalMedyaItem}>
                                        <Ionicons name="logo-foursquare" size={24} color="#FA4779" />
                                        <Text style={styles.SocialMediaText}>{getRestoranData.Foursquare.grade} puan</Text>
                                        <Text style={styles.SocialMediaText}>{getRestoranData.Foursquare.review} yorum</Text>
                                    </View>

                                    <View style={styles.RestoranInfoSoicalMedyaItem}>
                                        <Ionicons name="ios-logo-google" size={24} color="#4285F4" />
                                        <Text style={styles.SocialMediaText}>{getRestoranData.Google.grade} puan</Text>
                                        <Text style={styles.SocialMediaText}>{getRestoranData.Google.grade} yorum</Text>
                                    </View>
                                </View>

                                <View style={styles.RestoranInfoSoicalMedya}>
                                    <View style={styles.RestoranInfoSoicalMedyaItem}>
                                        <FontAwesome name="tripadvisor" size={24} color="#00AF87" />
                                        <Text style={styles.SocialMediaText}>{getRestoranData.Tripadvisor.grade} puan</Text>
                                        <Text style={styles.SocialMediaText}>{getRestoranData.Tripadvisor.grade} yorum</Text>
                                    </View>

                                    <View style={styles.RestoranInfoSoicalMedyaItem}>
                                        <Image
                                            style={{ width: 24, height: 24 }}
                                            source={{ uri: 'data:image/png;base64,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' }} />
                                        <Text style={styles.SocialMediaText}>{getRestoranData.Zomato.grade} puan</Text>
                                        <Text style={styles.SocialMediaText}>{getRestoranData.Zomato.grade} yorum</Text>
                                    </View>
                                </View>

                            </View>
                        </View>


                    </View>

                    <TouchableOpacity
                        style={styles.DetailButton}
                        onPress={() => {
                            setDetail(!isDetail);
                        }}
                    >
                        {isDetail ?
                            <Text style={styles.DetailButtonText}>Ayrıntılı Rapor Gizle</Text>
                            :
                            <Text style={styles.DetailButtonText}>Ayrıntılı Rapor Göster</Text>
                        }

                    </TouchableOpacity>

                    {isDetail ?
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.DetailTitle}>2376 restoranın içinden 117. oldunuz!</Text>

                            <Text style={styles.DetailSubtitle}>Bağıl Puan Dağılımları</Text>
                            <View style={[styles.DataTableHeader, { marginTop: 20 }]}>
                                <Text style={styles.DataTableHeaderTitle}>Ugulamalar</Text>
                                <Text style={styles.DataTableHeaderTitle}>{getRestoranData.restaurant} Puanları</Text>
                            </View>

                            <View
                                style={styles.DataTableRow}>
                                <Text style={styles.DataTableRowText}>Zomato</Text>
                                <Text style={styles.DataTableRowText}>{getRestoranData.Zomato.minmax_grade.toString().substring(0,5)}/100</Text>
                            </View>

                            <View
                                style={styles.DataTableRow}>
                                <Text style={styles.DataTableRowText}>Tripadvisor</Text>
                                <Text style={styles.DataTableRowText}>{getRestoranData.Tripadvisor.minmax_grade.toString().substring(0,5)}/100</Text>
                            </View>

                            <View
                                style={styles.DataTableRow}>
                                <Text style={styles.DataTableRowText}>Google</Text>
                                <Text style={styles.DataTableRowText}>{getRestoranData.Google.minmax_grade.toString().substring(0,5)}/100</Text>
                            </View>

                            <View
                                style={styles.DataTableRow}>
                                <Text style={styles.DataTableRowText}>Foursquare</Text>
                                <Text style={styles.DataTableRowText}>{getRestoranData.Foursquare.minmax_grade.toString().substring(0,5)}/100</Text>
                            </View>

                            <View
                                style={styles.DataTableRow}>
                                <Text style={styles.DataTableRowText}>Facebook</Text>
                                <Text style={styles.DataTableRowText}>{getRestoranData.Facebook.minmax_grade.toString().substring(0,5)}/100</Text>
                            </View>

                            <View >

                            </View>

                            <Text style={styles.DetailSubtitle}>Bağıl Puan Dağılımları</Text>

                            <ScrollView horizontal showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                <BarChart
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                    showBarTops={true}
                                    showValuesOnTopOfBars={true}
                                    withInnerLines={true}
                                    segments={3}
                                    data={data}
                                    hideLabelsAtIndex={[3, 4]}
                                    width={Dimensions.get('window').width}
                                    height={350}
                                    chartConfig={
                                        {
                                            backgroundGradientFrom: '#Ffffff',
                                            backgroundGradientTo: '#ffffff',
                                            barPercentage: 1,
                                            decimalPlaces: 0, // optional, defaults to 2dp
                                            color: (opacity = 1) => "#333",
                                            labelColor: (opacity = 1) => "#333",
                                            fillShadowGradient: '#d07440', // THIS
                                            fillShadowGradientOpacity: 2, // THIS
                                            style: {
                                                borderRadius: 16,
                                                fontFamily: 'Bogle-Regular',
                                            },
                                            propsForBackgroundLines: {
                                                strokeWidth: 1,
                                                stroke: '#efefef',
                                                strokeDasharray: '0',

                                            },
                                            propsForLabels: {
                                                fontFamily: 'Bogle-Regular',
                                                fontSize: 7,

                                            },
                                        }
                                    }
                                    fromZero={true}
                                    labelStyle={{ height: 500, window: 10 }}

                                />

                            </ScrollView>

                            <View style={{ marginBottom: 50 }}>
                                <LineChart
                                    data={data}
                                    width={Dimensions.get('screen').width}
                                    height={220}
                                    chartConfig={
                                        {
                                            backgroundGradientFrom: '#Ffffff',
                                            backgroundGradientTo: '#ffffff',
                                            barPercentage: 1,
                                            decimalPlaces: 0, // optional, defaults to 2dp
                                            color: (opacity = 1) => "#333",
                                            labelColor: (opacity = 1) => "#333",
                                            fillShadowGradient: '#d07440', // THIS
                                            fillShadowGradientOpacity: 2, // THIS
                                            style: {
                                                borderRadius: 16,
                                                fontFamily: 'Bogle-Regular',
                                            },
                                            propsForBackgroundLines: {
                                                strokeWidth: 1,
                                                stroke: '#efefef',
                                                strokeDasharray: '0',

                                            },
                                            propsForLabels: {
                                                fontFamily: 'Bogle-Regular',
                                                fontSize: 7,

                                            },
                                        }
                                    }
                                />

                            </View>



                        </View>
                        :
                        null}

                </ScrollView>

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
    HeaderTitle: {
        fontSize: 20,
        color: '#d07440',
        fontWeight: 'bold'
    },
    CardContainer: {
        marginTop: 30,
        width: '100%'
    },
    RestoranInfoContainer: {
        flexDirection: 'row'
    },
    RestoranPuanContainer: {
        alignSelf: 'center'
    },
    PuanText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    RestoranInfo: {
        marginLeft: 20
    },
    RestoranInfoSoicalMedya: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '70%'
    },
    RestoranInfoTitle: {
        fontSize: 18,
        width: '90%'
    },
    RestoranInfoAdress: {
        fontSize: 14,
        marginTop: 5,
        width: '80%'
    },
    SocialMediaText: {
        fontSize: 9,
        width: '60%'
    },
    RestoranInfoSoicalMedyaItem: {
        alignSelf: 'center',
        width: '35%',
        justifyContent: 'space-between'
    },
    DetailButton: {
        width: '70%',
        backgroundColor: '#d07440',
        padding: 10,
        borderRadius: 8,
        elevation: 8,
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 30

    },
    DetailButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'normal',
        color: '#fff'
    },
    DetailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    DataTableHeader: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#cde1fa'
    },
    DataTableHeaderTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        width: '50%',
        textAlign: 'center',
        borderWidth: 0.5,
        padding: 5,
        borderColor: 'silver'
    },
    DataTableRow: {
        width: '100%',
        flexDirection: 'row',
    },
    DataTableRowText: {
        fontSize: 12,
        width: '50%',
        textAlign: 'center',
        borderWidth: 0.5,
        padding: 5,
        borderColor: 'silver',
    },
    DetailSubtitle: {
        textAlign: 'center',
        color: '#89959b',
        marginTop: 40,
        fontSize: 16,
        fontWeight: 'bold'
    }
})


/*



*/