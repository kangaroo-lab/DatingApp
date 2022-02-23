import React from'react';
import { string, func, shape } from 'prop-types';
import { StyleSheet, Text, View, Button, Alert, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView,FlatList } from 'react-native';

import KeyBoardForTalk from './KeyBoardForTalk';
import SendMessage from './sendMessage';
import CatchMessage from './catchMessage'

export default function TalkBoardGround(){
    //Talkの履歴を配列にして、SendかCatchか

    //属性でmessageの形変えながらフラットリストを順番に返せるようにする

    //TalkBoardの返し
    return(
    <View style={styles.container}>
            <ScrollView>
                <View  style={styles.TalkBoard}>
                    <CatchMessage message='これならどう？'/>
                    <SendMessage message='これは機能してるか？'/>
                </View>
            </ScrollView>
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
    },
    footer:{
        flex:1
    },
    footerFill:{
        height:18
    }
})
