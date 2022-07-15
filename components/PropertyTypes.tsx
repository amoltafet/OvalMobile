import React from "react";
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';


export default function PropertyTypes() {
    const navigation = useNavigation()
    const onPress = () => {navigation.navigate('Property', {
        propertyType: 'House' })}
    
    return (
        <View style={{justifyContent: "center", alignItems: "center"}}>
            <ScrollView style={styles.container} horizontal>
                <TouchableOpacity style={styles.card } onPress={onPress}>
                    <Image source={require("../assets/images/house.png")} style={styles.image} />
                    <Text style={styles.address}>102 E Main St</Text>
                    <Text style={styles.rent}>View 25 Tenants</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card } onPress={onPress}>
                    <Image source={require("../assets/images/house.png")} style={styles.image} />
                    <Text style={styles.address}>102 E Main St</Text>
                    <Text style={styles.rent}>View 3 Tenants</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card } onPress={onPress}>
                    <Image source={require("../assets/images/house.png")} style={styles.image} />
                    <Text style={styles.address}>312 E Main St</Text>
                    <Text style={styles.rent}>View 2 Tenants</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card } onPress={onPress}>
                    <Image source={require("../assets/images/house.png")} style={styles.image} />
                    <Text style={styles.address}>42 N Main St</Text>
                    <Text style={styles.rent}>View 3 Tenants</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        marginBottom: -10,
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: 185,
        marginTop: 10,
        marginHorizontal: 5,
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
    },
    image: {
        width: 185,
        height: 100,
        marginTop: 0,
        marginLeft: 0,
        borderRadius: 10,
    },
    address: {
        fontSize: 15,
        fontWeight: '300',
        marginTop: 5,
    },
    rent: {
        fontSize: 15,
        fontWeight: '300',
        marginTop: 5,
        paddingBottom: 15,
    },
});