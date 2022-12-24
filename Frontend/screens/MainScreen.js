import { Dimensions, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default function MainScreen({ route }) {
  const query = route.params.topic

  const [data, setData] = useState([])

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=395fb06c3bda4679b9f617965fdc30d8`);
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
      <View>
        <Text style={{ color: 'white', fontSize: 35, fontWeight: '700', top: 35, marginBottom: 40, left: 15, margin: 20 }}>
          {query}
        </Text>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={{
                  marginTop: 22, marginRight: 20, width: width, backgroundColor: 'rgb(93, 110, 94)', shadowColor: 'black', shadowOffset: {
                    height: 50,
                    width: 15
                  },
                  shadowOpacity: 0.26
                }}>
                  <Image
                    source={{ uri: item.urlToImage }}
                    style={{ height: 250, width: width - 20, left: 10,top:8,bottom:8 ,borderRadius:20}}
                  />
                  <Text style={{ fontSize: 25, fontWeight: '600', margin: 12, color: 'white' }}>
                    TITLE : {item.title}
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: '600', margin: 12, color: 'white' }}>
                    {item.content}
                  </Text>
                  <TouchableOpacity style={{width:width-100,height:50,justifyContent:'center',alignItems:'center',backgroundColor:'#2AAA8A',borderRadius:30,left:47,marginBottom:20}}
                  onPress={()=>{
                    Linking.openURL(item.url)
                  }}
                  >
                  <Text style={{ fontSize: 18, fontWeight: '600', margin: 12, color: 'white' }}>
                    Read More
                  </Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262020',
    // justifyContent:'center',
    // alignItems:'center',
  },
});
