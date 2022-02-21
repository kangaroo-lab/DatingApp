import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image,TouchableOpacity, FlatList } from 'react-native';
import { string, func, shape } from 'prop-types';
import {useNavigation} from '@react-navigation/native';

export default function MessageList(){
    // Listの相手を動的にしていく
    const users = [
        {id: 0, name: 'ko', message: '金がない', date: '2022/02/21'},
        {id: 1, name: 'バブ', message: 'アルセウスがやりたい', date: '2022/02/18'},
        {id: 2, name: 'ビッパ', message:'なぜポケモンはあんなにも面白いのか',date: '2022/02/11'}

    ]

    // Listに表示される内容をデータから獲得 → FaltListでデータを表示できるようにする
    const TalkElement=({item})=>{
        return (
            <TouchableOpacity>
                <View style={styles.messageListElement}>
                    <View>
                        <Image source={require('../IMG_6689.jpg')}style={styles.image}/>
                    </View>
                    <View style={styles.messageInner}>
                        <View style={styles.nameBox}>
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                        <View style={styles.messageBox}>
                            <Text style={styles.message}>{item.message}</Text>
                        </View>
                    </View>
                    <View style={styles.dateBox}>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    // Listの返し
    return(
        <View style={styles.messageList}>
            <FlatList
            data={users}
            renderItem={TalkElement}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    messageList:{
        marginTop: 100,
    },
    messageListElement:{
        position:'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 19,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',
    },
    image:{
        width: 55,
        height: 57.78,
        borderRadius: 50,
    },
    messageInner:{
        paddingLeft:10,
        flex:1,
    },
    nameBox:{

    },
    name:{
        fontSize: 23,
    },
    messageBox:{
        width:250,
        height:40,
    },
    message:{
        fontSize:18,
        color:'rgba(0,0,0,0.15)',
    },
    dateBox:{
        textAlign: 'right',
    },
    date:{
        fontSize:16,
    }
})
