import { Button, Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import PropertyTypes from '../components/PropertyTypes';
import RecentPayments from '../components/RecentPayments';
import  auth, { getAuth }  from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

const barData = {
  labels: ["Jan", "Feb", "March", "April", "May", "June"],
  datasets: [
    {
      data: [10, 12, 28, 30, 12, 8]
    }
  ]
};

const chartConfig = {
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#fb8c00",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Fix Landry',
      icon: 'home-floor-0',
      priority: 'High',
      assigned: true,
      completed: false,
      date: '2020-01-01',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Baseboard Repair',
      icon: 'home-floor-0',
      priority: 'Medium',
      assigned: false,
      completed: true,
      date: '2020-01-01',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Bathroom Repair',
      icon: 'home-floor-0',
      priority: 'Low',
      assigned: false,
      completed: false,
      date: '2020-01-01',
    },
    {
       id: '58694a0f-3da1-471f-bd96-1455723e29d72',
       title: 'Kitchen Repair',
       icon: 'home-floor-0',
       priority: 'Low',
       assigned: true,
       completed: true,
       date: '2020-01-01',
      },
    
  ];

const Item = ({ title, priority, assigned, completed }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Feather name="clock" size={20} color={assigned ?  "orange": "gray"} />
          <Feather name="check-circle" size={20} color={completed ?  "green": "gray"} />
          <Text style={styles.priority}>{priority}</Text>
        </View>
);

    
const MaintenaceScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <BarChart
      style={styles.chart}
      data={barData}
      width={Dimensions.get('window').width}
      height={200}
      yAxisLabel=""
      chartConfig={chartConfig}
      showValuesOnTopOfBars	= {true}
    />
    <View style={styles.statsContainer}>
        <View style={styles.stats}><Text>High 3</Text></View>
        <View style={styles.stats}><Text>Medium 6</Text></View>
        <View style={styles.stats}><Text>Low 12</Text></View>
    </View>
      <View style={styles.addContainer}>
        <Text>Reports</Text>
        <TouchableOpacity style={styles.addBtn}>
            <Text>Add Maintenance</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Root', { screen: 'Add' })} style={styles.addIcon}>
      <Feather name="pen-tool" size={24} color="black"  />
      </TouchableOpacity>
      <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.activityItem}>
                <View style={styles.activityItemInfo}>
                
                <Text style={{fontSize: 18, fontWeight: '300'}}>{item.title}</Text>
                <Text style={{fontSize: 10, fontWeight: '300'}}>{item.date} {item.priority}</Text>
                </View>
                <View style={styles.activityItemAmount}>
                 <MaterialCommunityIcons name="check-circle" size={20} color="green" />
                 <MaterialCommunityIcons name="check-circle" size={20} color="green" />
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
    </View>
  )
}

export default MaintenaceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    backgroundColor: '#fff',
    elevation: 1,
    marginBottom: 10,
  },
  activityItemAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    backgroundColor: '#fff',
    elevation: 1,
    marginBottom: 10,
  },
  right:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  activityItemInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '300',
    color: '#000',
  },
  
   card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginHorizontal: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
},
stats: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eaeaea',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginTop: 0,
    borderRadius: 10,
},
statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
},
addContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
},
addBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  title: {
    fontSize: 15,
    marginRight: 50,
  },
    priority: {
    fontSize: 15,
    marginLeft: 50,
  },
  addIcon: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    bottom: 100,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  chart: {
   
   

  },
})

