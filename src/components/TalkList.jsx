import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, FlatList } from 'react-native';
import {useNavigation,useIsFocused} from '@react-navigation/native';
import { format } from 'date-fns';

export default function MessageList({users,messages}){

    function reFixData(){
        const result = []
        users.forEach((item,index)=>{
            result.push({
                name:item.name,
                message:messages[index].message,
                img:item.img,
                date:format(messages[index].date,'MM/dd'),
                key:messages[index].key,
                unRead:messages[index].unReads
            })
        })
        return result
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
                        <View style={styles.messageCountArea}>
                            <View style={item.unRead===0?{}:styles.messageCountBox}>
                                <Text style={styles.messageCount}>{item.unRead===0?'':item.unRead}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
    }

    // Listの返し
    if(isFocused){
        const newData = reFixData()
        return(
            <View style={styles.messageList}>
                <FlatList
                data={newData}
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
