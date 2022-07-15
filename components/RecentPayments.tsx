import React from "react";
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from "react-native";
import { Octicons } from '@expo/vector-icons'; 
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";

export default function RecentPayments() {
    return (
        <>
         <TouchableOpacity style={styles.container}>
            <Octicons name="feed-rocket" size={24} color="white" />     
         <View style={{flex: 1, marginLeft: 10}}>
          
         <Text style={styles.title}>Incoming Rent</Text> 
         <Text style={styles.subtitle}>Next rent collection</Text>
         </View>
         <Text style={styles.amount}>$4,000.00</Text>
         </TouchableOpacity>

        <TouchableOpacity style={styles.container}>
       <Octicons name="arrow-switch" size={24} color="white" />         
         <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.title}>Transactions</Text>
            <Text style={styles.subtitle}>View your recent transactions</Text>
         </View>

        <Octicons name="arrow-right" size={20} color="white" style={styles.image}/>
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.blue.background,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
    }, 
    image: {
        width: 30,
        height: 30,
        marginTop: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: '300',
        marginTop: 5,
        marginLeft: 5,
        color: 'white',
    },
    subtitle: {
        fontSize: 10,
        fontWeight: '300',
        marginTop: 5,
        marginLeft: 5,
        color: 'white',
    },
    amount: {
        fontSize: 15,
        fontWeight: '300',
        marginTop: 5,
        marginRight: 5,
        color: 'white',
    }
   
});