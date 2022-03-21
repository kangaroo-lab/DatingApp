import React from 'react';
import { StyleSheet, Text, View, Button, Alert,Image,ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import userInfo from '../../data/userInfo';

export default function BasicInfo(){
    for(let i=0;i<10;i++){
        console.log('>>>',userInfo.info[i].title)
    }

    const InfoRender=({item})=>{
        return(
            <View style={styles.infoDataContainer}>
                <Text>{item.title}</Text>
            </View>
        )
    }


    return(
        <View style={styles.container}>
            <FlatList
                data={userInfo.info}
                renderItem={InfoRender}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:5,
        flexDirection:'column',
        justifyContent:'flex-end',
    },
    infoDataContainer:{
        borderBottomColor:'rgba(0,0,0,0.25)',
        borderBottomWidth:1,
        paddingVertical:10
    }
})
