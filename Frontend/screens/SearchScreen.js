import { Dimensions, FlatList, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



export default function SearchScreen() {
    const [filterdata, setfilterdata] = useState([])
    const [masterdata, setmasterdata] = useState([])
    const [search, setsearch] = useState('')

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetch(`https://newsapi.org/v2/everything?q=news&apiKey=395fb06c3bda4679b9f617965fdc30d8`);
                const mydata = await data.json();
                setfilterdata(mydata.articles)
                setmasterdata(mydata.articles)
            } catch (error) {
                console.log(error);
            }
        }
        getUserData()
    }, [])

    const searchFilter = (text) => {
        if (text) {
            const newData = masterdata.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setfilterdata(newData);
            setsearch(text);

        } else {
            setfilterdata(masterdata)
            setsearch(text)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', top: 35, borderRadius: 30, margin: 15, marginBottom: 50 }}>
                <TouchableOpacity>
                    <FontAwesome name="search" size={30} color="black" style={{ margin: 20 }} />
                </TouchableOpacity>
                <TextInput
                    placeholder='Search Here'
                    onChangeText={(text) => { searchFilter(text) }}
                    value={search}
                    style={{
                        height: 50,
                        width: width - 90,
                        right: 15,
                        backgroundColor: 'white',
                        borderRadius: 30,
                        // top: 35,
                        fontSize: 18,
                        fontWeight: '700',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 15,
                        // borderColor:'black',
                        // borderWidth:2,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                />
            </View>
            <FlatList
                data={filterdata}
                // keyExtractor={(index, item) => index.toString()}
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
                                <Text style={{ fontSize: 17, fontWeight: '600', margin: 12, color: 'white' }}>
                                    {item.id}{'. '}{item.title.toUpperCase()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262020',
    },
});