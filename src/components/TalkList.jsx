import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, FlatList } from 'react-native';
import {useNavigation,useIsFocused} from '@react-navigation/native';
import { format } from 'date-fns';

export default function MessageList({user,message}){

    function fixData(){
        const newData = [];
        user.forEach((item,index) => {
            newData.push({
                name:item.name,
                message:message[index].message,
                img:item.img,
                date:format(message[index].date,'MM/dd'),
                key:message[index].key
            })
        });
        return (newData);
    }

    //routeの設定
    const navigation = useNavigation();

    //画面の再レンダリングのbool
    const isFocused = useIsFocused();

    // Listに表示される内容をデータから獲得 → FaltListでデータを表示できるようにする
    const TalkElement=({item})=>{
            return (
                <TouchableOpacity
                    onPress={()=>
                        navigation.navigate(
                            'TalkBoard',{key:item.key}
                            )}
                >
                    <View style={styles.messageListElement}>
                        <View>
                            <Image source={{uri:item.img}} style={styles.image}/>
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
    //再レンダリングのデータを取得する

    // Listの返し
    if(isFocused){
        const data=fixData()
        return(
            <View style={styles.messageList}>
                <FlatList
                data={data}
                renderItem={TalkElement}
                />
            </View>
        )
    }else{
        return(
            <View/>
        )
    }
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
        flexDirection:'column',
        justifyContent:'flex-start'
    },
    date:{
        fontSize:16,
    },
    messageCountArea:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:5,
    },
    messageCountBox:{
        flexDirection:'row',
        justifyContent:'center',
        textAlign:'center',
        backgroundColor:'tomato',
        width:23,
        height:23,
        borderRadius:20,
        textAlign:'auto'
    },
    messageCount:{
        fontSize:15,
        color:'#ffffff'
    }
})
