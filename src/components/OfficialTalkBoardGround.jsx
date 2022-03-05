import React from'react';
import { string, func, shape } from 'prop-types';
import { StyleSheet, Text, View, Button, Alert, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView,FlatList } from 'react-native';

import KeyBoardForTalk from './KeyBoardForTalk';
import SendMessage from './sendMessage';
import CatchMessage from './catchMessage';

export default function OfficialTalkBoardGround({MessageHistory}){

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
    },
    footer:{
        flex:1
    },
    footerFill:{
        height:18
    }
})
