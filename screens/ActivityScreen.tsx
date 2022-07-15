import { Button, Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import React from 'react';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UpdateData } from 'firebase/firestore';

const DATA = [
  {
    id: '1',
    title: 'Sam Oliver',
    amount: '$1200.20',
    date: '12/12/2019',
    time: '12:00',
    status: 'Paid',
    type: 'Rent',
    icon: 'cash-fast',
    color: 'green',
  },
  {
    id: '2',
    title: 'Sam Oliver',
    amount: '$353.03',
    date: '12/12/2019',
    time: '12:00',
    status: 'Paid',
    type: 'Down Payment',
    icon: 'arrow-collapse-down',   
    color: '#f55142',
  },
  {
    id: '3',
    title: 'Sam Oliver',
    amount: '$920.00',
    date: '12/12/2019',
    time: '12:00',
    status: 'Paid',
    type: 'Fee',
    icon: 'atom-variant',
    color: 'blue',
  },
  {
    id: '4',
    title: 'Sam Oliver',
    amount: '$1320.00',
    date: '12/12/2019',
    time: '12:00',
    status: 'Paid',
    type: 'Rent',
    icon: 'cash-fast',
    color: 'green',
  },
];


const ActivityScreen = () => {
  
  return (
    <ScrollView style={styles.container}  bounces={false}>
      <View style={styles.chartContainer}>
        <ValueLineChart />
      </View>
      <View style={styles.info}>
        <LinearGradient colors={['#f55142','#f57542']} style={styles.card}>
          <Text style={styles.text}>Earned </Text>
          <Text style={styles.text}>+$20,003.00</Text>
          <Text style={styles.text}>Earned this month</Text>
        </LinearGradient>
        <LinearGradient colors={['#f65142','#f53532']} style={styles.card}>         
         <Text style={styles.text}>Spent</Text>
          <Text style={styles.text}>4.32%</Text>
          <Text style={styles.text}>Spent this month</Text>
        </LinearGradient>
        </View>

      <View style={styles.activity}>
        <Text>Activity</Text>
        <View style={styles.activityCard}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.activityItem}>
                <MaterialCommunityIcons name={item.icon} size={25} color={item.color}  style={{marginTop: 5}}/>  
                <View style={styles.activityItemInfo}>
                
                <Text style={{fontSize: 18, fontWeight: '300'}}>{item.title}</Text>
                <Text style={{fontSize: 10, fontWeight: '300'}}>{item.date} {item.time}PM</Text>
                </View>
                <View style={styles.activityItemAmount}>
                 <Text style={{fontSize: 18, fontWeight: '300'}}>+{item.amount}</Text>
                 <Text style={{fontSize: 10, fontWeight: '300'}}>{item.type}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      </View>

        


    </ScrollView>
  )
}



export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fb8c00',
    paddingTop: 50,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activityItemInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  activityItemAmount: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
   activity: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    marginHorizontal: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
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
  activityCard: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    height: Dimensions.get('window').height * 0.43,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    borderRadius: 10,
},
activityItem: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 5,
  marginHorizontal: 0,
  paddingVertical: 10,
  paddingHorizontal: 10,
  backgroundColor: '#fff',
  justifyContent: 'space-between',
  borderBottomWidth: 1,
  borderBottomColor: '#e0e0e0',
},
 text: {
  fontWeight: '300',
  color: '#fff',
  textAlign: 'center',
 },
})


const ValueLineChart = () => {
  return (
<View style={{marginTop: 10,}}>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={350} // from react-native
    height={200}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#fb8c00",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      
    }}
  />
</View>

  )
}

const ValuePieChart = () => {
  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  return (
    <PieChart
  data={data}
  width={Dimensions.get("window").width}
  height={220}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  paddingLeft={"15"}
  center={[10, 50]}
  absolute
/>
  )
}