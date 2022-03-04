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

export default MessageHistory
