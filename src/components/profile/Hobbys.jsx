import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Chip } from 'react-native-paper';

export default function Hobbys(hobbies){
    const hobbyChipColumn=({item})=>{
        if(item.title){
            return(
                    <Chip
                        style={styles.hobbyDetailChips}
                    >
                        {item.title}
                    </Chip>
            )
        }else{
            return(
                    <Chip
                        style={[styles.hobbyDetailChips,{backgroundColor:'rgba(0,0,0,0.30)'}]}
                    >
                        +
                    </Chip>
            )
        }
    }

    const hobbyChipRow=({item})=>{
        return(
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <FlatList
                    data={item}
                    renderItem={hobbyChipColumn}
                    style={{flexDirection:'row',justifyContent:'flex-start',marginBottom:5}}
                />
            </View>
        )
    }

    return(
        <View style={styles.HobbyContainer}>
            <View style={{flexDirection:'column',justifyContent:'flex-start'}}>
                    <FlatList
                        data={hobbies.hobbies}
                        renderItem={hobbyChipRow}
                    />
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
    hobbyDetailChips:{
        marginHorizontal:5,
        marginBottom:3,
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
