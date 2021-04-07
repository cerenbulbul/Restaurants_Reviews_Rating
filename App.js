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
import { Ionicons } from '@expo/vector-icons';

import { Main } from './src/screens/Main';
import { CustomDrawerContent } from './src/components/CustomDrawerContent'
import {Color} from './src/Helper/Color'

// Initialize Firebase


const Drawer = createDrawerNavigator();

export default function App() {
  const [todos, setTodos] = React.useState([]);
  //const ref = firebase.firestore().collection("restaurants")



  const AuthStack = createStackNavigator();
  const AuthStackScreen = () => (
    <AuthStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: false,
      }}>

      <AuthStack.Screen
        name={"Main"}
        component={Main}

        
      />
    </AuthStack.Navigator>
  );

  React.useEffect(() => {

  });

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
         name="Auth"
         component={AuthStackScreen}
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