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

// Header の高さ獲得-> 画面をふれくしぶるにしていく
const HEADER_MAX_HEIGHT = 550;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function profile(){
    //rooter to EditScreen
    const navigation = useNavigation();
    const Profile = User.profile

    //animated

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.scrollViewContents}>
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
                </View>
            </ScrollView>
            {/*
                ヘッダーにプロフィール画像を表示させて、高さに応じてヘッダーにアニメーションをつける
                    →　画面がリッチな感じになる目的
            */}
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
    container: {
        flex: 1,
    },
    scrollViewContents:{
        marginTop: HEADER_MAX_HEIGHT,
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
        borderBottomWidth:1,
        borderBottomColor:'rgba(0,0,0,0.25)',
        paddingVertical:10,
        paddingHorizontal:10,
        flexWrap:'nowrap',
    },
    Title:{
        fontSize:18,
        fontWeight:'bold'
    },
    profileDetail:{
        fontSize:15
    },
    PencilButtonCntainer:{
        position:'absolute',
        right:0,
        bottom:'5%',
    },
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
    animatedHeader:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
    },
    image:{
        height: HEADER_MAX_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ValueContainer:{
        flexDirection:'row',
        justifyContent:'flex-start'
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
})
