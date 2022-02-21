import React from'react';
import { string, func, shape } from 'prop-types';
import { StyleSheet, Text, View, Button, Alert, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView,FlatList } from 'react-native';

export default function SendMessage(props){
    // メッセージの獲得
    const {message} = props;

    // messageのテキストボックスを作る
    const MessageText = ({message}) =>{
        return (
        <View style={styles.sendedMessage}>
            <Text style={styles.messageText}>{message}</Text>
        </View>
        )
    }

    // messageのテキストを右よせにする
    return(
        <View  style={styles.sendedMessageArea}>
            <MessageText
                message={message}
            />
        </View>
    )
}

SendMessage.propTypes={
    message:string,
};

const styles=StyleSheet.create({
    sendedMessageArea:{
        marginLeft:'auto',
        flexDirection:'column',
        width:'75%',
        marginVertical:1,
    },
    sendedMessage:{
        marginLeft:'auto',
        alignSelf:'flex-start',
        borderWidth:0.2,
        borderColor:'rgba(0,0,0,0.50)',
        padding:8,
        margin:3,
        borderRadius:10,
        backgroundColor:'#ffffff',
        paddingVertical:8,
    },
    messageText:{
        fontSize:15,
    }
})
