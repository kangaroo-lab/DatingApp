import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image,TouchableOpacity, FlatList } from 'react-native';
import { string, func, shape } from 'prop-types';
import {useNavigation} from '@react-navigation/native';

export default function OfficialMessageList(){
    //routeの設定
    const navigation = useNavigation();
    // Listの相手を動的にしていく
    const users = [
        {id: 0, name: 'Official', message: 'これは正式', date: '2022/02/21'},
        {id: 1, name: 'バブ', message: 'アルセウスがやりたい', date: '2022/02/18'},
    ]

    // Listに表示される内容をデータから獲得 → FaltListでデータを表示できるようにする
    const TalkElement=({item})=>{
        return (
            // OfficialStackNavigator内のTalkBoardへ画面遷移
            <TouchableOpacity
                onPress={()=> navigation.navigate('OfficialTalkBoard')}
            >
                <View style={styles.messageListElement}>
                    <View>
                        <Image source={require('../IMG_6689.jpg')}style={styles.image}/>
                    </View>
                    <View style={styles.messageInner}>
                        <View style={styles.messageTextBox}>
                            <View style={styles.nameBox}>
                                <Text style={styles.name}>{item.name}</Text>
                            </View>
                            <View style={styles.messageBox}>
                                <Text style={styles.message}>{item.message}</Text>
                            </View>
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
        marginTop:90
    },
    messageListElement:{
        position:'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 19,
    },
    image:{
        width: 55,
        height: 57.78,
        borderRadius: 50,
    },
    messageInner:{
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
        paddingLeft:10,
        flex:1,
    },
    messageTextBox:{
    },
    nameBox:{

    },
    name:{
        fontSize: 18,
    },
    messageBox:{
        width:250,
        height:30,
    },
    message:{
        fontSize:15,
        color:'rgba(0,0,0,0.50)',
    },
    dateBox:{
        textAlign: 'right',
    },
    date:{
        fontSize:16,
    }
})
