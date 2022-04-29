import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Hobbys({hobbies}){
    return(
        <View style={styles.HobbyContainer}>
            <View style={styles.ElementBox}>
                <Text style={styles.element}>{hobbies}</Text>
            </View>
            <View style={styles.PlusButtonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Entypo name="plus" size={28} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    HobbyContainer:{
        marginHorizontal:5,
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    ElementBox:{
        flexDirection:'row',
    },
    element:{
        flexDirection:'column',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:20,
        width:'auto',
        paddingHorizontal:10,
        height:36,
        borderColor:'rgba(0,0,0,0.25)',
        fontSize:18,
        textAlign:'center',
        marginVertical:5,
    },
    PlusButtonContainer:{

    },
    button:{
        marginHorizontal:30,
        backgroundColor:'rgba(0,0,0,0.30)',
        width:40,
        height:40,
        borderRadius:30,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
})
