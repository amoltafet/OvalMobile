import { Button, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import PropertyTypes from '../components/PropertyTypes';
import RecentPayments from '../components/RecentPayments';
import  auth, { getAuth }  from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

const HomeScreen = () => {
  
  return (
    <ScrollView style={styles.scrollView} bounces={false}>
     <LinearGradient colors={[Colors.blue.gradiantStart,Colors.blue.gradiantEnd]} style={{ flex: 1, alignItems: "center", paddingBottom:80 }} >
      <Text style={styles.title}>Welcome John, </Text>
      <Text style={styles.assets}>$720,003.00</Text>
     </LinearGradient>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="home-floor-0" size={30} color={Colors.blue.background}  style={{marginTop: 5}}/>
          <Text style={{marginTop: 5, marginLeft: 5}}>Vacants</Text>
        </View> 
            <View style={styles.card}>
                    <MaterialCommunityIcons name="home-floor-1" size={30} color={Colors.blue.background} style={{marginTop: 5}}/>
                    <Text style={{marginTop: 5, marginLeft: 5}}>Occupied</Text>
             </View> 
          </View>
      <PropertyTypes />
        <RecentPayments />
        <View style={styles.row}>
          <TouchableOpacity style={styles.card2}>
            <MaterialCommunityIcons name="bell-circle-outline" size={30} color={Colors.blue.background} style={{marginTop: 5, paddingRight: 5,}}/>
            <Text style={styles.text}>Create an Announcement</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.card2}>
            <MaterialCommunityIcons name="human-edit" size={30} color={Colors.blue.background} style={{marginTop: 5, paddingRight: 5,}}/>
            <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity> 
        </View>
        <View style={styles.card3}>
            <Image source={require('../assets/images/hard-money.png')} style={{width: 300, height: 185}} />
            <TouchableOpacity><Text style={styles.text}>Become a hard money lender</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.text}>View hard money lenders</Text></TouchableOpacity>
            <TouchableOpacity  style={{position: 'absolute', right: 15, marginTop: 5}}><MaterialCommunityIcons name="alert-circle-outline" size={30} color={Colors.blue.background}  /></TouchableOpacity>
        </View> 
       
      
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 20,
    color: '#fff',
    fontSize: 30,
    fontWeight: '300',
  },
  assets: {
    marginTop: 20,
    color: '#fff',
    fontSize: 50,
    fontWeight: '300',
  },
  linearGradiant: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -40,
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
},
card2: {
  flex: 1,
  width: '50%',
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 10,
  marginHorizontal: 8,
  paddingVertical: 20,
  paddingHorizontal: 20,
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
},
card3: {
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  paddingVertical: 20,
  paddingHorizontal: 20,
  marginTop: 10,
  marginHorizontal: 5,
  backgroundColor: '#fff',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
},
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  text: {
    fontWeight: '300',
    fontSize: 16,
  },
  scrollView: {
    marginBottom: 85,
    backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
})

