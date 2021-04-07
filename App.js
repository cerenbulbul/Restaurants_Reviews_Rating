import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import auth from 'firebase/auth'
import db from 'firebase/database'

// Initialize Firebase
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

export default function App() {
  const [todos, setTodos] = React.useState([]);
  const ref = firebase.firestore().collection("restaurants")
  React.useEffect(() => {



    return ref.onSnapshot(querySnapshot => {
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
    });

  });

  return (
    <View style={styles.container}>

      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
