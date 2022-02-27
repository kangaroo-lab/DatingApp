import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import OfficialTalkBoardGround from '../components/OfficialTalkBoardGround';

export default function OfficialTalkBoard(){
    return(
    <View style={styles.container}>
        {/* Talk画面全体の表示 */}
        <KeyboardAvoidingView
        behavior='padding'
        style={styles.TalkContainer}
        >
            <OfficialTalkBoardGround/>
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
