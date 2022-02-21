import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/header';
import KeyBoardForTalk from '../components/KeyBoardForTalk';
import SendMessage from '../components/sendMessage';
import CatchMessage from '../components/catchMessage';
import TalkBoardGround from '../components/TalkBoardGround';


export default function TalkBoard(){
    return(
    <View style={styles.container}>

        {/* Header部分の表示 */}
        <LinearGradient
          colors={['#80D2FF', 'rgba(128,210,255,0.30)']}
          style={styles.header}
        >
            <View style={styles.headerLeft}>
                <Text style={styles.back}>Back</Text>
                <Image source={require('../ハートのマーク.png')} style={styles.image}/>
            </View>
            <View style={styles.headerRight}>
                <Image source={require('../電話の受話器のアイコン素材.png')} style={styles.image}/>
                <Image source={require('../無料の設定歯車アイコン.png')} style={styles.image}/>
            </View>
        </LinearGradient>

        {/* Talk画面全体の表示 */}
        <KeyboardAvoidingView
        behavior='padding'
        style={styles.TalkContainer}
        >
            <TalkBoardGround/>
        </KeyboardAvoidingView>
        <View style={styles.footerFill}/>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height:'100%',
        width:'100%'
    },
    header:{
        height:90,
        flexDirection:'column',
        alignItems: 'flex-start',
    },
    TalkContainer:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center'
    },
    headerLeft:{
        flexDirection:'row',
        alignItems: 'center',
        position:'absolute',
        top:40,
        left:22
    },
    headerRight:{
        flexDirection:'row',
        alignItems: 'center',
        position:'absolute',
        top:40,
        left:250
    },
    back:{
        fontSize:24,
    },
    image:{
        marginHorizontal:15,
        width: 34,
        height:34,
    },
    TalkBoard:{
        flex:1,
        height:'100%',
        width:'100%',
        flexDirection:'column',
    },
    footer:{
        flex:1
    },
    footerFill:{
        height:18
    }
});
