import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView,StatusBar } from 'react-native';

import TalkBoardGround from '../components/TalkBoardGround';

//navigationのheaderを無視するための数字！
const KEYBOARD_VERTICAL_OFFSET = 90 + StatusBar.currentHeight;

export default function TalkBoard(){
    return(
    <View style={styles.container}>
        {/* Talk画面全体の表示 */}
        <KeyboardAvoidingView
        behavior='padding'
        style={styles.TalkContainer}
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
        >
            <TalkBoardGround/>
        </KeyboardAvoidingView>
        <View style={styles.footerFill}/>
    </View>
    );
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
