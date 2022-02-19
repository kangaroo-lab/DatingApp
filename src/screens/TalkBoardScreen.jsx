import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/header';


export default function TalkBoard(){
    return(
    <View>
        <LinearGradient
          colors={['#80D2FF', 'rgba(128,210,255,0.30)']}
          style={styles.header}
        >
            <View style={styles.headerLeft}>
                <Text style={styles.back}>Back</Text>
                <Image source={require('../ハートのマーク.png')} style={styles.image}/>
            </View>
            <View style={styles.headerRight}>
                <Image source={require('../電話の受話器のアイコン素材.png')} style={styles.image}/>
                <Image source={require('../無料の設定歯車アイコン.png')} style={styles.image}/>
            </View>
        </LinearGradient>
        <ScrollView style={styles.TalkBoard}>
            <View style={styles.catchMessageArea}>
                <View style={styles.catchMessage}>
                    <Text style={styles.messageText}>ニンニク食べて元気100倍</Text>
                </View>
            </View>
            <View style={styles.sendedMessageArea}>
                <View style={styles.sendedMessage}>
                    <Text style={styles.messageText}>息草の</Text>
                </View>
                <View style={styles.sendedMessage}>
                    <Text style={styles.messageText}>男の肌の汚れとは</Text>
                </View>
            </View>
            <View style={styles.catchMessageArea}>
                <View style={styles.catchMessage}>
                    <Text style={styles.messageText}>醜く思い　メンズ図スキンケア！</Text>
                </View>
                <View style={styles.catchMessage}>
                    <Text style={styles.messageText}>これでもかという怒りの前歯が{'\n'}まじビッパ可愛いよね</Text>
                </View>
            </View>
        </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    header:{
        height:90,
        flexDirection:'row',
        alignItems: 'center',
        position:'relative',
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
        height:'100%',
        width:'100%',
        paddingTop:30,
        borderWidth:0.5,
        flexDirection:'column',
    },
    sendedMessageArea:{
        marginLeft:'auto',
        flexDirection:'column',
        width:'75%',
        marginVertical:1,
    },
    catchMessageArea:{
        width:'75%',
        marginVertical:1,
    },
    catchMessage:{
        alignSelf:'flex-start',
        borderWidth:0.2,
        borderColor:'rgba(0,0,0,0.50)',
        padding:10,
        margin:3,
        borderRadius:10,
        backgroundColor:'#C4C4C4',
        paddingVertical:10,
        paddingBottom:10,
    },
    sendedMessage:{
        marginLeft:'auto',
        alignSelf:'flex-start',
        borderWidth:0.2,
        borderColor:'rgba(0,0,0,0.50)',
        padding:10,
        margin:3,
        borderRadius:10,
        backgroundColor:'#ffffff',
        paddingVertical:10,
        paddingBottom:10,
    },
    messageText:{
        fontSize:18,
    }
});
