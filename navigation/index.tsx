/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, View, StyleSheet, TouchableOpacity, Text, Modal, Alert } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/TenantsScreen';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import PropertiesScreen from '../screens/PropertiesScreen';
import LoginScreen from '../screens/LoginScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import RegistrationScreen from '../screens/RegisterScreen';
import { initializeApp } from 'firebase/app';
import ActivityScreen from '../screens/ActivityScreen';
import MaintenaceScreen from '../screens/MaintenanceScreen';
import PropertyScreen from '../screens/PropertyScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { doc, getFirestore } from 'firebase/firestore';
import Colors from '../constants/Colors';
import TenantsScreen from '../screens/TenantsScreen';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
 
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyC2Q7qFGnrIBQ2ekRuQImxdDQz3slzxEao",
  authDomain: "omi-app-94406.firebaseapp.com",
  projectId: "omi-app-94406",
  storageBucket: "omi-app-94406.appspot.com",
  messagingSenderId: "907664852389",
  appId: "1:907664852389:web:1c373080b2394fd33a144c",
  measurementId: "G-MHV1CTKH93"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)




/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login">
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Property" component={PropertyScreen} />
    </Stack.Navigator>
  );
}

const TabBarCustomButton = ( {children, onPress} ) => {
  return (
    <View>
    <TouchableOpacity
      style={{
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      // onPress show popup modal
     onPress={onPress}>
        <LinearGradient 
           colors={[Colors.blue.gradiantStart, Colors.blue.gradiantEnd]}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
        >{children}</LinearGradient>
    </TouchableOpacity>
    
</View>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors.blue.background,
        tabBarStyle: styles.container,

      }}>
         <BottomTab.Screen
        name="Properties"
        component = {PropertiesScreen}
        options={{
          title: "Properties",
          headerShown: true,
          headerBackground: () => <LinearGradient colors={[Colors.blue.gradiantStart, Colors.blue.gradiantEnd]} style={{ flex: 1 }} />,
          headerTitle: () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '300' }}>My Properties</Text>
          </View>,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-city-outline" color={color} size={25}/>,
        }}/> 
      
      <BottomTab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          title: 'Activity',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="activity" color={color} size={25}/>,
          headerLeft: () => <View>
          </View>,
          headerRight: () => <View>
          </View>,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: "",
          headerBackground: () => <LinearGradient colors={[Colors.blue.gradiantStart, Colors.blue.gradiantStart]} style={{ flex: 1 }} />,
          headerTitle: () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '300' }}></Text>
          </View>,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1,})}>
              <Feather name="settings" size={25} color={"white"} style={{ marginLeft: 15 }}/>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Notifications')}
              style={({ pressed }) => ({opacity: pressed ? 0.5 : 1,})}>
              <Feather name="bell" size={25} color={"white"} style={{ marginRight: 15 }}/>
            </Pressable>
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props}/>,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-roof" color={"white"} size={40} style={{top: 5}}/>,
          
        })}
      />
       
      <BottomTab.Screen
        name="Maintenance"
        component={MaintenaceScreen}
        options={({ navigation }: RootTabScreenProps<'Maintenance'>) => ({
          title: 'Maintenance',
          tabBarIcon: ({ color }) => <Feather name="tool" color={color} size={25} />,
          headerTitle: () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '300' }}>Maintenace</Text>
          </View>,
          headerBackground: () => <LinearGradient colors={[Colors.blue.gradiantStart, Colors.blue.gradiantEnd]} style={{ flex: 1 }} />,
          
        })}
      />
       <BottomTab.Screen
        name="Tenants"
        component={TenantsScreen}
        options={({ navigation }: RootTabScreenProps<'Tenants'>) => ({
          title: 'Tenants',
          tabBarIcon: ({ color }) => <Feather name="users" color={color} size={25} />,
          headerTitle: () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '300' }}>Tenants</Text>
          </View>,
          headerBackground: () => <LinearGradient colors={[Colors.blue.gradiantStart, Colors.blue.gradiantEnd]} style={{ flex: 1 }} />,
          headerLeft: () => (
            <View></View>
          ),
        })}
      />



     
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    bottom: 0,
    left: 0, 
    right: 0, 
    borderRadius: 10,
    paddingTop: 5, 
    // add linear gradient
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
})
