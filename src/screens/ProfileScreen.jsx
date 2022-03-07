import React from 'react';
import { StyleSheet, Text, View, Button, Alert,Image,ScrollView } from 'react-native';

import Head from '../components/header';

export default function profile(){
    const Profile = {
        photo:require('../IMG_6689.jpg'),
        name:'K',
        age:'23',
        brief:'わしの名前はケンゴだぞ!\n学術名は「ケンゴケンゴケンゴ」！！\nけ、け、ケンゴ！！！！！',
        hobbies:'スポーツ',
        values:'やりもくでござる！'
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <Image source={Profile.photo}style={styles.image}/>
                <View style={styles.BasicArea}>
                    <Text style={styles.name}>{Profile.name}</Text>
                    <Text style={styles.age}>({Profile.age})</Text>
                </View>
                <View style={styles.introduction}>
                    <Text style={styles.Title}>プロフィール</Text>
                    <Text style={styles.profileDetail}>
                        {Profile.brief}
                    </Text>
                </View>
                <View style={styles.introduction}>
                    <Text style={styles.Title}>
                        趣味
                    </Text>
                    <View style={styles.ElementBox}>
                        <Text style={styles.element}>{Profile.hobbies}</Text>
                    </View>
                </View>
                <View style={styles.introduction}>
                    <Text style={styles.Title}>価値観</Text>
                    <View style={styles.ElementBox}>
                        <Text style={styles.element}>{Profile.values}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'relative',
        bottom: 30,
    },
    image:{
        width: 'auto',
        height: 509
    },
    BasicArea:{
        flexDirection:'row',
        justifyContent:'flex-end',
        height:65,
        width: 'auto',
    },
    name:{
        fontSize:64,
        paddingBottom:5,
        fontWeight:'bold',
    },
    age:{
        fontSize:24,
        alignSelf:'flex-end',
        marginHorizontal:20,
        fontWeight:'bold'
    },
    introduction:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.25)',
        paddingVertical:10,
        paddingHorizontal:20,
        flexWrap:'nowrap',
    },
    Title:{
        fontSize:24,
        fontWeight:'bold'
    },
    profileDetail:{
        fontSize:18
    },
    ElementBox:{
        flexDirection:'row',
    },
    element:{
        flexDirection:'column',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:20,
        width:'auto',
        paddingHorizontal:10,
        height:36,
        borderColor:'rgba(0,0,0,0.25)',
        fontSize:18,
        textAlign:'center',
        marginVertical:5,
    }
})
