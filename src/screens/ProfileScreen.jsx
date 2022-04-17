import React,{useState} from 'react';
import { StyleSheet, Text, View, Button, Alert,Image,ScrollView, TouchableOpacity,Animated} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import User from '../data/user';

import Hobbys from '../components/profile/Hobbys';
import Values from '../components/profile/Values';
import BasicInfo from '../components/profile/BasicInfo';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function profile(){
    //rooter to EditScreen
    const navigation = useNavigation();
    const Profile = User.profile
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.BasicArea}>
                    <Text style={styles.name}>{Profile.name}</Text>
                    <Text style={styles.age}>({Profile.age})</Text>
                </View>
                <View style={styles.introduction}>
                    <Text style={styles.Title}>プロフィール</Text>
                    <View style={styles.Detail}>
                        <Text style={styles.profileDetail}>
                            {Profile.brief}
                        </Text>
                    </View>
                    <View style={styles.PencilButtonCntainer}>
                        <TouchableOpacity
                         style={styles.button}
                         onPress={()=>{navigation.navigate('BriefEdit',{userBrief:Profile.brief})}}
                        >
                            <Entypo name="pencil" size={25} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.introduction}>
                    <Text style={styles.Title}>趣味</Text>
                    <View style={styles.Detail}>
                        <Hobbys hobbies={Profile.hobbies}/>
                    </View>
                </View>
                <View style={styles.introduction}>
                    <Text style={styles.Title}>価値観</Text>
                    <View style={styles.Detail}>
                        <Values values={Profile.values}/>
                    </View>
                </View>
                <View style={styles.introduction}>
                    <Text style={styles.Title}>基本情報</Text>
                    <View style={styles.Detail}>
                        <BasicInfo
                            user={Profile}
                        />
                    </View>
                </View>
            </ScrollView>
            <Animated.View　style={styles.animatedHeader}>
                <View style={styles.image}>
                    <View style={styles.CameraButtonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Feather name="camera" size={25} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        marginHorizontal:30,
        backgroundColor:'rgba(0,0,0,0.30)',
        width:40,
        height:40,
        borderRadius:30,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    Detail:{
        paddingHorizontal:3,
        paddingVertical:10
    },
    container: {
        flex: 1,
    },
    animatedHeader:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
    },
    image:{
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BasicArea:{
        marginTop: HEADER_MAX_HEIGHT,
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
        borderBottomWidth:1,
        borderBottomColor:'rgba(0,0,0,0.25)',
        paddingVertical:10,
        paddingHorizontal:10,
        flexWrap:'nowrap',
    },
    ValueContainer:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    Title:{
        fontSize:18,
        fontWeight:'bold'
    },
    profileDetail:{
        fontSize:15
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
    },
    CameraButtonContainer:{
        position:'absolute',
        right:0,
        bottom:'5%',
    },
    PencilButtonCntainer:{
        position:'absolute',
        right:0,
        bottom:'5%',
    },
    PlusButtonContainer:{

    },

})
