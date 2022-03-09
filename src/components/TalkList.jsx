import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image,TouchableOpacity, FlatList } from 'react-native';
import { string, func, shape } from 'prop-types';
import {useNavigation} from '@react-navigation/native';

import User from'../data/user';

export default function MessageList(){
    //routeの設定
    const navigation = useNavigation();
    // Listの相手を動的にしていく
    let UserData = [];
    const TestUsers = User.matchList
    for(let i=0; i<TestUsers.length; i++){
        if(TestUsers[i].level=='pre'){
            UserData.push( {id:UserData.length-1,
                            name:TestUsers[i].match.profile.name,
                            message:TestUsers[i].talk.list[TestUsers[i].talk.list.length-1].message ,
                            date:'2021/3/9',
                            photo:TestUsers[i].match.profile.photo,
                        })
        }
        console.log(TestUsers[i],'\n==================================\n',i,'\n')
    }
    const users = UserData

    // Listに表示される内容をデータから獲得 → FaltListでデータを表示できるようにする
    const TalkElement=({item})=>{
        return (
            <TouchableOpacity
                onPress={()=> navigation.navigate('TalkBoard')}
            >
                <View style={styles.messageListElement}>
                    <View>
                        <Image source={item.photo}style={styles.image}/>
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
