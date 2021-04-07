import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import auth from 'firebase/auth'
import db from 'firebase/database'
import AsyncStorage from '@react-native-community/async-storage'
import { Global } from './Global';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { Main } from './src/screens/Main';
import { Restorants } from './src/screens/Restorants'
import { LoginRegister } from './src/screens/LoginRegister'
import { RestoranScore } from './src/screens/RestoranScore'
import { AIReport } from './src/screens/AIReport'
import { Profile } from './src/screens/Profile'

import { CustomDrawerContent } from './src/components/CustomDrawerContent'
import { Color } from './src/Helper/Color'

// Initialize Firebase


const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [todos, setTodos] = React.useState([]);
  //const ref = firebase.firestore().collection("restaurants")




  const AuthStack = createStackNavigator();
  const AuthStackScreen = () => (
    <AuthStack.Navigator
      mode={"modal"}
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}>

      <AuthStack.Screen
        name={"Main"}
        component={Main}
      />

      <AuthStack.Screen
        name={"Restorants"}
        component={Restorants}
      />

      <AuthStack.Screen
        name={"RestoranScore"}
        component={RestoranScore}
      />

      <AuthStack.Screen
        name={"AIReport"}
        component={AIReport}
      />

    </AuthStack.Navigator>
  );

  const ProfileStack = createStackNavigator();
  const ProfileStackScreen = () => (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name={"Profil"} component={Profile} />
      <ProfileStack.Screen name={"AIReport"} component={AIReport} />
    </ProfileStack.Navigator>

  );

  const TabScreen = () => {
    return (
      <Tab.Navigator
        initialRouteName="Auth"
        activeTintColor="#d07440"
        tabBarOptions={{
          activeTintColor: '#d07440',
        }}
        barStyle={{
          backgroundColor: '#853203'
        }}

        options={{
          keyboardHidesTabBar: true,
          tabBarOptions: {
            activeTintColor: '#d07440',
            showLabel: true,
          },
        }}
      >

        <Tab.Screen
          name={"Auth"}
          component={AuthStackScreen}
          options={{
            title: "Anasayfa",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={18} color={color} />
            )
          }}
        />


        <Tab.Screen
          name={"Profil"}
          component={ProfileStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} style={{ alignSelf: 'center' }} />
            )
          }}
        />


      </Tab.Navigator>
    );
  }



  return (


    <NavigationContainer>
      <Drawer.Navigator
        hideStatusBar={false}
        drawerContent={props => <CustomDrawerContent {...props} />}
        headerShown={true}
        initialRouteName="Tab"
        drawerContentOptions={{
          activeTintColor: '#2e3f6e',
          itemStyle: {
            marginVertical: 10
          },
        }}
        drawerType="front"
      >


        <Drawer.Screen
          name="Tab"
          component={TabScreen}
          options={{
            headerShown: true,
            headerTitle: () => (
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold'
              }}>Restoran Rapor</Text>
            ),
            headerStyle: {
              backgroundColor: '#fff',

            },
            headerTitleStyle: {
              fontWeight: '500',
              fontSize: 24
            },
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 20 }}>
                <Ionicons name="cog" size={32} color="#222" />
              </TouchableOpacity>
            ),
          }}>

        </Drawer.Screen>

        <Drawer.Screen
          options={{
            headerShown: true,
            headerTitle: () => (
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold'
              }}>Restoran Rapor</Text>
            ),
            headerStyle: {
              backgroundColor: '#fff',

            },
            headerTitleStyle: {
              fontWeight: '500',
              fontSize: 24
            },
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 20 }}>
                <Ionicons name="cog" size={32} color="#222" />
              </TouchableOpacity>
            ),
          }}
          name="LoginRegister"
          component={LoginRegister}>

        </Drawer.Screen>



      </Drawer.Navigator>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


/*




      <TouchableOpacity
        onPress={() => {
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
            saveData(list)
            Global.Data = list;
          });

        }}>
        <Text>
          Load Data
        </Text>
      </TouchableOpacity>



*/