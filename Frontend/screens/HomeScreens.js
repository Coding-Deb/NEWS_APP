import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const Images = require('../FrontendApi/Most_Selling')

import NewsAppsApi from "../FrontendApi/NewsAppsApi";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



export default function MainScreen() {
  const [data, setData] = useState([])
  // const [imagedata, setImagedata] = useState([])
  const navigation = useNavigation()
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=395fb06c3bda4679b9f617965fdc30d8');
        const mydata = await data.json();
        setData(mydata.articles)
      } catch (error) {
        console.log(error);
      }
    }
    getUserData()
  }, [])


  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 22, marginTop: 42, flexDirection: 'row' }}>
        <Image
          source={require('../assets/Deb2.jpg')}
          style={{
            width: 120,
            height: 100,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#d35647',
            resizeMode: 'contain',
            margin: 8
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', top: 27, left: 50 }}>
            Search News Here
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ right: 60 }}>
            <FontAwesome name="search" size={28} color="white" style={{ left: 120, marginTop: 25 }} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: '700', color: 'white', margin: 20 }}>
            Find Your News By topic
          </Text>
          {/* <FlatList
          data={Images}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                navigation.navigate('Main', {
                  topic: item.type
                })
              }}>
                <Image
                  source={item.src}
                  style={{
                    width: 250,
                    height: 150,
                    borderWidth: 2,
                    borderColor: '#d35647',
                    resizeMode: 'contain',
                    margin: 8,
                    opacity: 0.45,
                    position: 'relative'
                  }}
                />
                <Text style={{ color: 'white', position: 'absolute', fontSize: 22 }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )
          }}
        /> */}

          {
            Images.map((item) => {
              return (
                <ScrollView style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 2, marginBottom: 15 }} horizontal={true}>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                    navigation.navigate('Main', {
                      topic: item.type
                    })
                  }}>
                    <Image
                      source={item.src}
                      style={{
                        width: width - 30,
                        height: 150,
                        borderWidth: 2,
                        borderColor: '#d35647',
                        resizeMode: 'contain',
                        margin: 8,
                        opacity: 0.45,
                        position: 'relative'
                      }}
                    />
                    <Text style={{ color: 'white', position: 'absolute', fontSize: 22 }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              )
            })
          }

        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={{ fontSize: 25, fontWeight: '700', color: 'white', margin: 15 }}>
            Find News By Famous News Apps
          </Text>
          {/* <FlatList
          data={NewsAppsApi}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('AppNews', {
                    news: item.type,
                    name: item.name
                  })
                }}>
                  <Image
                    source={item.src}
                    style={{ height: 150, width: 200, left: 12, marginRight: 20, marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </View>
            )
          }}
        /> */}

          {
            NewsAppsApi.map((item) => {
              return (
                <TouchableOpacity onPress={() => {
                  navigation.navigate('AppNews', {
                    news: item.type,
                    name: item.name
                  })
                }}>
                  <View style={{ borderColor: 'white', borderWidth: 2, justifyContent: 'center', alignItems: 'center',marginBottom:15,padding:15 }}>
                    <Image
                      source={item.src}
                      style={{ height: 150, width: width - 50}}
                    />
                  </View>
                </TouchableOpacity>
              )
            })
          }

        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={{ fontSize: 25, fontWeight: '700', color: 'white', margin: 20 }}>
            Top News
          </Text>
          {/* <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                <View style={{
                  marginTop: 22, marginRight: 20, width: width, backgroundColor: 'rgb(93, 110, 94)', shadowColor: 'black', shadowOffset: {
                    height: 50,
                    width: 15
                  },
                  shadowOpacity: 0.26
                }}>
                  <Text style={{ fontSize: 17, fontWeight: '600', margin: 12, color: 'white' }}>
                    TITLE : {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}
        /> */}

          {
            data.map((item) => {
              return (
                <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                  <View style={{
                    marginTop: 22, width: width-12, backgroundColor: 'rgb(93, 110, 94)', shadowColor: 'black', shadowOffset: {
                      height: 50,
                      width: 15
                    },
                    shadowOpacity: 0.26
                  }}>
                    <Text style={{ fontSize: 17, fontWeight: '600', margin: 20, color: 'white' }}>
                      TITLE : {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }

        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    backgroundColor: '#262020',
  },
});