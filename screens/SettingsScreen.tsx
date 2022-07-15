import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import  auth, { getAuth }  from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

export default function SettingsScreen() {
  const navigation = useNavigation()
  const auth = getAuth()
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }
  return (
    <View style={styles.container}>
    <Text>Email: {auth.currentUser?.email}</Text>
    <TouchableOpacity
      onPress={handleSignOut}
      style={styles.button}
    >
     
      <Text style={styles.buttonText}>Sign out  <Feather name="log-out" size={15} color="white"/></Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
