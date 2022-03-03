import React from'react';
import { string, func, shape } from 'prop-types';
import { StyleSheet, Text, View, Button, Alert, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView,FlatList } from 'react-native';

import KeyBoardForTalk from './KeyBoardForTalk';
import SendMessage from './sendMessage';
import CatchMessage from './catchMessage'

export default function TalkBoardGround(){
    //Talkの履歴の配列
    const MessageHistory = [
        {id:0, type:'send',message:'一番目'},
        {id:1, type:'catch',message:'に番目'},
        {id:2, type:'send',message:'3番目'},
        {id:3, type:'send',message:'4番目'},
        {id:4, type:'catch',message:'5番目'},
        {id:5, type:'catch',message:'6番目'},
        {id:6, type:'send',message:'7番目'},
    ]

    //Send or Catch
    //属性でmessageの形変えながらフラットリストを順番に返せるようにする
    const GetTalkElem=({item})=>{
        if(item.type=='send'){
            return <SendMessage message={item.message}/>
        }else{
            return <CatchMessage message={item.message}/>
        }
    }

    //TalkBoardの返し
    return(
    <View style={styles.container}>
        <FlatList
            data={MessageHistory}
            renderItem={GetTalkElem}
        />
        <KeyBoardForTalk/>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-end'
    },
    TalkContainer:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center'
    },
    TalkBoard:{
        flex:1,
        height:'100%',
        width:'100%',
        flexDirection:'column',
        justifyContent:'flex-end'
    },
    footer:{
        flex:1
    },
    footerFill:{
        height:18
    }
})
