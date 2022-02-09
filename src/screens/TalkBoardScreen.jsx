import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import Header from '../components/header';

export default function TalkBoard(){
    return(
    <View>
        <LinearGradient
          colors={['#80D2FF', 'rgba(128,210,255,0.10)']}
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
        <View style={styles.TalkBoard}>
            <View style={styles.catchMessage}>
                <Text style={styles.messageText}>Catch Message</Text>
            </View>
            <View style={styles.sendedMessage}>
                <Text style={styles.messageText}>Send Message</Text>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    header:{
        width:'auto',
        height:90,
        flexDirection:'row',
        alignItems: 'center',
        position:'relative'
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
        paddingTop:30,
        position:'relative'
    },
    catchMessage:{
        borderWidth:0.5,
        borderColor:'rgba(0,0,0,0.50)',
        width:'50%',
        padding:10,
        marginLeft:10,
        borderRadius:20,
        backgroundColor:'#C4C4C4',
    },
    sendedMessage:{
        backgroundColor:'#ffffff',
        borderWidth:0.5,
        borderColor:'rgba(0,0,0,0.50)',
        width:'50%',
        padding:10,
        margin:10,
        borderRadius:20,
        backgroundColor:'#ffffff',
        position:'absolute',
        top:80,
        left:180
    },
    messageText:{
        fontSize:18,
    }
});
