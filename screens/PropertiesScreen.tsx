import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, Modal, Dimensions, Pressable, Alert, FlatList, AppRegistry } from 'react-native';
import { Text, View } from '../components/Themed';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import Panel from '../components/Panel';

const data = [
  {
    title: '101 E Main St, Spokane WA, 99218',
    bed: 3,
    bath: 2,
    sqft: 1864,
    value: 354311,
    type: 'Apartment',
    occupied: false,
    generated: 124212,
    due: 124212,
  },
  {
    title: '142 N Maple St, Seattle WA, 55002',
    text: "fafsfsafsaf asfasfasfsaf",
    bed: 2,
    bath: 1,
    sqft: 1124,
    value: 3214311,
    type: 'Duplex',
    occupied: true,
    generated: 12321,
    due: 12321,
    


  },
]


export default function PropertiesScreen() {
   const [modalVisible, setModalVisible] = useState(false);  

  const addProperty = (
    <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
              <TouchableOpacity  onPress={() => {
                setModalVisible(!modalVisible);
              }
              }>
                <Ionicons name="ios-close" size={30} />
              </TouchableOpacity>
          </View>
        </Modal>
        
      </View>
  );
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.addIcon}>
      <MaterialCommunityIcons name="home-plus-outline" size={30}  />
      </TouchableOpacity>
       {addProperty}
      <FlatList
        data={data}
        renderItem={({ item }) => <Panel {...item} />}
        keyExtractor={item => item.title}
      />
      </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 18,
    marginHorizontal: 16,
  },
  itemProperty: {
    fontSize: 32,
  },
  text: {
    fontSize: 16,
  },
  addIcon: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    top: 600,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },

  
});



AppRegistry.registerComponent('PropertiesScreen', () => PropertiesScreen);
