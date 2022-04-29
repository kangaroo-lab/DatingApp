import React from 'react';
import { StyleSheet,View,TouchableOpacity } from 'react-native';
import { AntDesign,Entypo } from '@expo/vector-icons';

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
