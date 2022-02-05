import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';

import Header from '../components/header';

export default function TalkBoard(){
    return(
    <View>
        <View style={styles.header}>
            <Text style={styles.back}>Back</Text>
            <Text style={styles.good}>Good</Text>
            <Text style={styles.call}>Call</Text>
            <Text style={styles.setting}>Setting</Text>
        </View>
        <View style={styles.TalkBoard}>
            <View style={styles.catchMessage}>
                <Text>Catch Message</Text>
            </View>
            <View style={styles.sendedMessage}>
                <Text>Send Message</Text>
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
        backgroundColor:'#80D2FF',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    back:{
        fontSize:24,
    }
});
