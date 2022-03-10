import React, { useState } from 'react';
import { StyleSheet,View,KeyboardAvoidingView,StatusBar } from 'react-native';
import { Message } from 'react-native-gifted-chat';
import {array} from 'prop-types'
import KeyBoardForTalk from '../components/KeyBoardForTalk';

import OfficialTalkBoardGround from '../components/OfficialTalkBoardGround';

//navigationのheaderを無視するための数字！
const KEYBOARD_VERTICAL_OFFSET = 90 + StatusBar.currentHeight;

export default function OfficialTalkBoard(props){
    const MessageHistory = props.route.params;
    const [data, setData] = useState(MessageHistory)

    return(
    <View style={styles.container}>
        {/* Talk画面全体の表示 */}
        <KeyboardAvoidingView
        behavior='padding'
        style={styles.TalkContainer}
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
        >
            <OfficialTalkBoardGround
                MessageHistory={data}
            />
            <KeyBoardForTalk
                MessageHistory={data}
            />
        </KeyboardAvoidingView>
        <View style={styles.footerFill}/>
    </View>
    );
}

OfficialTalkBoard.propTypes ={
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
    header:{
        height:90,
        flexDirection:'column',
        alignItems: 'flex-start',
    },
    TalkContainer:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        marginHorizontal:10
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
