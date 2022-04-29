import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, FlatList } from 'react-native';
import {useNavigation,useIsFocused} from '@react-navigation/native';

import User from '../data/user'

export default function OfficialMessageList(){
    //routeの設定
    const navigation = useNavigation();

    const isFocused = useIsFocused();
    // Listを作る関数
    function makeTalkList(TestUsers){
        let UserData = [];
        for(let i=0; i<TestUsers.length; i++){
            if(TestUsers[i].level=='official'){
                let n = 0;
                let j = 0;
                while(TestUsers[i].talk.list[j].sendBy==TestUsers[i].match.profile.name){
                    n++;
                    j++;
                }
                UserData.push( {
                    id:UserData.length-1,
                    userName:User.profile.name,
                    name:TestUsers[i].match.profile.name,
                    message:TestUsers[i].talk.list[0].message ,
                    list:TestUsers[i].talk,
                    date:'2021/3/9',
                    photo:TestUsers[i].match.profile.photo,
                    count:n
                })
            }
        }
        return UserData
    }

    // Listに表示される内容をデータから獲得 → FaltListでデータを表示できるようにする
    const TalkElement=({item})=>{
        //未返信メッセージの個数を反映→未読メッセージにした方がストレスない？
        if(item.count==0){
            return (
                // OfficialStackNavigator内のTalkBoardへ画面遷移
                <TouchableOpacity
                    onPress={()=>
                        navigation.navigate(
                            'OfficialTalkBoard',{
                                MessageHistory:item.list,
                                UserName:item.userName
                            })}
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
        }else{
            return(
                <TouchableOpacity
                onPress={()=>
                    navigation.navigate(
                        'OfficialTalkBoard',{
                            MessageHistory:item.list,
                            UserName:item.userName
                        })}
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
                            <View style={styles.messageCountArea}>
                                <View style={styles.messageCountBox}>
                                    <Text　style={styles.messageCount}>{item.count}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

      // Listの返し
      if(isFocused){
        const TestUsers = User.matchList;
        const users = makeTalkList(TestUsers)
        return(
            <View style={styles.messageList}>
                <FlatList
                data={users}
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
