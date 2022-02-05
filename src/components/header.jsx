import React from 'react';
import { StyleSheet, Text, View, Button, Alert,Image } from 'react-native';

export default function Header(){
    return(
        <View style={styles.container}>
            <View style={styles.circle}></View>
            <View style={styles.circle}></View>
            <View style={styles.circle}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex:1,
        flexDirection:'row',
        marginHorizontal: 85,
        paddingTop:20,
        alignContent:'center',
        justifyContent:'center',
    },
    circle:{
        flexDirection:'row',
        lineHeight: 32,
        margin: 30,
        backgroundColor:'#C4C4C4',
        borderRadius:50,
        height:13,
        width:13,
    },
  });

