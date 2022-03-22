import React from'react';
import { string, func, shape } from 'prop-types';
import { StyleSheet, Text, View, Button, Alert, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView,FlatList } from 'react-native';

import KeyBoardForTalk from './KeyBoardForTalk';
import SendMessage from './sendMessage';
import CatchMessage from './catchMessage';

export default function OfficialTalkBoardGround({MessageHistory,UserName}){
    //Send or Catch
    //属性でmessageの形変えながらフラットリストを順番に返せるようにする
    const GetTalkElem=({item})=>{
        if(item.sendBy==UserName){
            return <SendMessage message={item.message}/>
        }else{
            return <CatchMessage message={item.message}/>
        }
    }

    //TalkBoardの返し
    return(
    <View style={styles.container}>
        <FlatList
            data={MessageHistory.list}
            extraData={MessageHistory.ListUpdate}
            renderItem={GetTalkElem}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-end',
    },
})
