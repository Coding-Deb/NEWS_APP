import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreens from './screens/HomeScreens';
import SearchScreen from './screens/SearchScreen';
import MainScreen from './screens/MainScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNews from './screens/AppNews';
// import SplashScreen from './screens/SplashScreen';


// "backgroundColor": "#45B0E5"

// const Tabs = createMaterialBottomTabNavigator()
const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={HomeScreens}/>
        <Stack.Screen name='Main' component={MainScreen}/>
        <Stack.Screen name='Search' component={SearchScreen}/>
        <Stack.Screen name='AppNews' component={AppNews}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262020',
  },
});
