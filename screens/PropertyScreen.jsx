import {View, Text} from 'react-native';

function PropertyScreen({ route, navigation }) {
    const { propertyType, otherParam } = route.params;

  return (
   <View>
        <Text>PropertyScreen {propertyType}</Text>
   </View>
  );
}

export default PropertyScreen;