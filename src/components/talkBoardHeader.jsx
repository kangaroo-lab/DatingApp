import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { AntDesign,Entypo,Ionicons } from '@expo/vector-icons';

export default function TalkBoardHeader(){
    return(
        <View style={styles.container}>
            <View style={styles.iconBox}>
                <TouchableOpacity>
                    <AntDesign name="heart" size={24} color="black"/>
                </TouchableOpacity>
            </View>
            <View style={styles.iconBox}>
                <TouchableOpacity>
                    <Entypo name="phone" size={24} color="black"/>
                </TouchableOpacity>
            </View>
            <View style={styles.iconBox}>
                <TouchableOpacity>
                    <Ionicons name="settings" size={24} color="black"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    iconBox:{
        marginHorizontal:10,
    }
})
