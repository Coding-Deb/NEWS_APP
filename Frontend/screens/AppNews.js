import { Dimensions, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default function AppNews({ route }) {
  const [data, setData] = useState([])
  const news = route.params.news
  const Name = route.params.name

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetch(`https://newsapi.org/v2/everything?q=${news}&apiKey=395fb06c3bda4679b9f617965fdc30d8`);
        const mydata = await data.json();
        setData(mydata.articles)
      } catch (error) {
        console.log(error);
      }
    }
    getUserData()
  }, [])
  return (
    <View style={{ backgroundColor: '#262020', height: height, width: width }}>
      <Text style={{ color: 'white', fontSize: 35, fontWeight: '700', top: 35, marginBottom: 40, left: 15, margin: 20 }}>
        {Name}
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={()=>Linking.openURL(item.url)}>
              <View style={{
                marginTop: 22, marginRight: 20, width: width, backgroundColor: 'rgb(93, 110, 94)', shadowColor: 'black', shadowOffset: {
                  height: 50,
                  width: 15
                },
                shadowOpacity: 0.26
              }}>
                <Image
                  source={{ uri: item.urlToImage }}
                  style={{ height: 150, width: width - 20, left: 10, top: 8, bottom: 8, borderRadius: 20,padding:50 }}
                />
                <Text style={{ fontSize: 17, fontWeight: '600', margin: 12, color: 'white' }}>
                  TITLE : {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})