import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView,StatusBar, Button, TouchableOpacity } from 'react-native';
import {array} from 'prop-types'

import TalkBoardGround from '../components/TalkBoardGround';
import KeyBoardForTalk from '../components/KeyBoardForTalk';

//navigationのheaderを無視するための数字！
const KEYBOARD_VERTICAL_OFFSET = 90 + StatusBar.currentHeight;

export default function TalkBoard(props){
    //データの追加に伴って再レンダリングを行う
    const {MessageHistory,UserName} = props.route.params;
    const [data,setData] = useState(MessageHistory)
    const name = UserName

    return(
    <View style={styles.container}>
        {/* Talk画面全体の表示 */}
        <KeyboardAvoidingView
        behavior='padding'
        style={styles.TalkContainer}
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
        >
            <TalkBoardGround
                MessageHistory={data}
                UserName={name}
            />
        </KeyboardAvoidingView>
        <View style={styles.footerFill}/>
    </View>
    );
}

TalkBoard.propTypes = {
    MessageHistory:array,
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height:'100%',
        width:'100%'
    },
    TalkContainer:{
        flex:1,
        marginHorizontal:10
    },
    image:{
        marginHorizontal:15,
        width: 34,
        height:34,
    },
    footerFill:{
        height:18
    }
});
