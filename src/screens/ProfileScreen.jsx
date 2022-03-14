import React from 'react';
import { StyleSheet, Text, View, Button, Alert,Image,ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import User from '../data/user';

export default function profile(){
    const Profile = User.profile
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Image source={Profile.photo}style={styles.image}/>
                    <TouchableOpacity style={styles.button}>
                        <AntDesign name="edit" size={35} color="white" />
                    </TouchableOpacity>
                </View>
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
    button:{
        position:'absolute',
        right:0,
        bottom:'5%',
        marginHorizontal:30,
        backgroundColor:'tomato',
        width:60,
        height:60,
        borderRadius:30,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    container: {
        flex: 1,
        position:'relative',
        flexDirection:'column',
        justifyContent:'center',
        bottom: 30,
    },
    image:{
        width: 'auto',
        height: 509
    },
    BasicArea:{
        flexDirection:'row',
        justifyContent:'flex-end',
        height:50,
        marginLeft:'auto',
    },
    name:{
        fontSize:36,
        alignSelf:'flex-end',
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
