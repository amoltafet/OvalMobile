import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import  {StyleSheet, Pressable, TextInput, Image, TouchableOpacity, Modal, KeyboardAvoidingView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { SearchBar } from 'react-native-screens';
import { LinearGradient } from 'expo-linear-gradient';
import { DocumentData, getFirestore, QueryDocumentSnapshot } from 'firebase/firestore'
import { getApp } from 'firebase/app';
import { collection, addDoc, getDocs, doc, onSnapshot } from "firebase/firestore"; 
import { ActivityIndicator } from 'react-native';


export default function TenantsScreen({ navigation }: RootTabScreenProps<'Tenants'>) {
  const [modalVisible, setModalVisible] = useState(false);  
  const [loading, setLoading] = useState(true); 
  const [tenants, setTenants] = useState([]);

  const [tenantEmail, setTenantEmail] = useState('')
  const [tenantName, setTenantName] = useState('')
  const [tenantAddress, setTenantAddress] = useState('')

  const app = getApp()
  const db = getFirestore(app)

  useEffect(() => {
    const col = collection(db, 'tenants')
    const unsubscribe = onSnapshot(col, (snapshot) => {
      const tenants: React.SetStateAction<null> | QueryDocumentSnapshot<DocumentData>[] = [];
      snapshot.forEach((doc) => {
        tenants.push(doc.data() as QueryDocumentSnapshot)
      });

      setTenants(tenants);
      setLoading(false);
    } );
    

    // Unsubscribe from events when no longer in use
    return () => unsubscribe();
  }, []);
  

  if (loading) {
    return <ActivityIndicator />;
  }

  const addNewTenant = async () => {
    try {
      const docRef = await addDoc(collection(db, "tenants"), {
        tenantName: tenantName,
        tenantEmail: tenantEmail,
        tenantAddress: tenantAddress
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setModalVisible(false)
    setTenantAddress('')
    setTenantEmail('')
    setTenantName('')
  }

  const addTenant = (
    <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" >
              <View style={styles.inputContainer}>
                <Text style={styles.modalText}>Tenant Info</Text>
                <TextInput
                    placeholder="Full Name"
                    value={tenantName}
                    onChangeText={text => setTenantName(text)}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Email"
                    value={tenantEmail}
                    onChangeText={text => setTenantEmail(text)}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Property Address"
                    value={tenantAddress}
                    onChangeText={text => setTenantAddress(text)}
                    style={styles.input}
                  />
              </View>
              <View style={styles.buttonView}>
                <Pressable style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.buttonClose]}
                  onPress={() => addNewTenant()}>
                  <Text style={styles.textStyle}>Add Tenant</Text>
                </Pressable>
              </View>
           </KeyboardAvoidingView>
          </View>
        </Modal>
        
      </View>
  );
  
  return (
      <View style={styles.container}>
      <View style={styles.manageTenant}>
        <Text>Request Payment</Text>
        <Text>Request Info</Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.addIcon}>
      <Feather name="user-plus" size={24} color="black"  />
      </TouchableOpacity>
       {addTenant}
      <FlatList
      numColumns={1}
      scrollsToTop={true}
      data={tenants}
      renderItem={({ item }) => (
    
      <View style={styles.card}> 
          <View style={styles.left}>
            <Text style={styles.cardText}>{item.tenantName}</Text>
            <Image style={styles.cardImage} source={require('../assets/images/profile.png')} />
          </View>
           
         <Text style={styles.text}>{item.tenantAddress}</Text>
         <Text style={styles.text}>{item.tenantEmail}</Text>
         <Text style={styles.text}>{item.tenantName}</Text>
        </View> 
        
      )}
      keyExtractor={(item, index) => index.toString()}
      />
      </View>
      
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  manageTenant: {
    flex: 1,
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    justifyContent: 'space-between',
    borderRadius: 10,
},
right:{
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginLeft: 10,
},
left: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 15,
  paddingVertical: 15,
},
cardText: {
  fontSize: 15,
  fontWeight: '300',
  color: '#000',
},
cardImage: {
  width: 50,
  height: 50,
  borderRadius: 25,
  padding: 5,
},
text: {
  fontWeight: '300',
  textAlign: 'center',
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
  centeredView: {
    flex: 1,
    marginTop: 400,
    borderRadius: 40,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,

  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "300",
    textAlign: "center"
  },
  inputContainer: {
    width: '100%'
    
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5,
  },

});
