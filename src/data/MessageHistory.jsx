import React from 'react';
import { string, func, shape } from 'prop-types';
import { StyleSheet, Text, View, Button, Alert, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView,FlatList } from 'react-native';

// データをまとめる

const MessageHistory =[
        {id:0, type:'send',message:'一番目'},
        {id:1, type:'catch',message:'に番目'},
        {id:2, type:'send',message:'3番目'},
        {id:3, type:'send',message:'4番目'},
        {id:4, type:'catch',message:'5番目'},
        {id:5, type:'catch',message:'6番目'},
        {id:6, type:'send',message:'7番目'},
    ]

export default function MessageHistoryAdd(props){
    // textデータの獲得
    const {getMessage} = props

    // textの保存
    const AddMessage={id:MessageHistory.length,type:'send',message:{getMessage}}
    MessageHistory.push(AddMessage)


    return console.log('　取得したお　',MessageHistory)
}

MessageHistoryAdd.propTypes={
    getMessage:string,
}
