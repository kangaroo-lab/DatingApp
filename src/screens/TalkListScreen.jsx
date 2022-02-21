import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image,TouchableOpacity } from 'react-native';

import Header from '../components/header';
import MessageList from '../components/TalkList';

export default function TalkList(){
    return(
    <View>
        <Header/>
        <MessageList/>
    </View>
    );
}
    const styles = StyleSheet.create({
        messageboard:{
            marginTop: 100,
        },
        messageListElem: {
            position:'relative',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 19,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.15)',
        },
        image: {
            width: 55,
            height: 57.78,
            borderRadius: 50,
        },
        name:{
            fontSize: 23,
        },
        message:{
            fontSize:18,
            color:'rgba(0,0,0,0.15)',
        },
        dateBox:{
            textAlign: 'right',

        },
        date:{
            fontSize:16,
        },
        messageInner:{
            paddingLeft:10,
            flex:1,
        }
});
