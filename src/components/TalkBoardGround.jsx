import React,{useState,useEffect} from'react';
import { string } from 'prop-types';
import { StyleSheet,View,FlatList,TouchableOpacity,Text,Image,TextInput } from 'react-native';

import SendMessage from './sendMessage';
import CatchMessage from './catchMessage';

export default function TalkBoardGround({MessageHistory,UserName}){
    //リアルタイムでチャットを更新できるように、hooksを利用する
        /*
            問題点：データが更新されたタイミングでスクリーンがリフレッシュされない
                →　データの変更を受け取るプログラムをくむ
                    -> キーボードを中に入れてしまう！！
        */
    const [inputHeight, setInputHeight] = useState(0);
    const [bodyText, setBodyText] = useState('');
    const [data, setData] = useState([])

    useEffect(()=>{
        setData(MessageHistory)
    },[])

    //Send or Catch
    //属性でmessageの形変えながらフラットリストを順番に返せるようにする
    const GetTalkElem=({item})=>{
        if(item.sendBy==UserName){
            return <SendMessage message={item.message}/>
        }else{
            return <CatchMessage message={item.message}/>
        }
    }

    //Messageをデータに追加する
    function MessageAdd(bodyText){
        const AddMessage={id:data.list.length,type:'send',message:bodyText,sendBy:UserName}
        data.list.unshift(AddMessage)
        data.listUpdate+=1
        setData(data)
        setBodyText('')
    }

    //TalkBoardの返し
    return(
    <View style={styles.container}>
        <FlatList
            removeClippedSubviews={false}
            data={data.list}
            renderItem={GetTalkElem}
            contentContainerStyle={{paddingBottom:20}}
            inverted
            keyExtractor={(item)=>(item.id)}
        />

        <View>
            <View style={styles.footerContainer}>
                <View style={styles.contentsView}>
                    <TouchableOpacity>
                        <View>
                            <Image source={require('../img/camera.png')} style={styles.image}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentsView}>
                    <View style={styles.textInputView}>
                        <TextInput
                                multiline={true}
                                style={styles.textInput,{height:inputHeight}}
                                value={bodyText}
                                placeholder='メッセージを入力'
                                onChangeText={(text)=>{setBodyText(text);}}
                                onContentSizeChange={(event) => {
                                  setInputHeight(event.nativeEvent.contentSize.height);
                                }}
                        />
                    </View>
                </View>
                <View style={styles.contentsView}>
                    <TouchableOpacity
                        onPress={()=>MessageAdd(bodyText)}
                    >
                        <View style={styles.button}>
                            <Image source={require('../img/submit.png')}style={styles.submit}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
    )
}

TalkBoardGround.propTypes={
    getMessage:string,
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start'
    },
    footer:{
        flexDirection:'row',
        justifyContent:'center'
    },
    footerContainer:{
        height:50,
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical:10,
        paddingHorizontal:20,
    },
    contentsView:{
        flexDirection:'column',
        justifyContent:'flex-end'
    },
    image:{
        width: 30,
        height:30,
    },
    submit:{
        width: 28,
        height:28,
    },
    textInputView:{
        width:250,
        marginHorizontal:20,
        paddingHorizontal:10,
        borderRadius:20,
        backgroundColor:'rgba(0,0,0,0.05)',
        paddingVertical:5,
    },
    textInput:{
        fontSize:15,
    },
})
