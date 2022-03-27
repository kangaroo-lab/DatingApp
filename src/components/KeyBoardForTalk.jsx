import React,{useState} from 'react';
import { StyleSheet, Text, View, Image,Button,TextInput, TouchableOpacity,KeyboardAvoidingView } from 'react-native';


export default function KeyBoardForTalk({MessageHistory,name}){
    const [bodyText, setBodyText] = useState('');
    const [inputHeight, setInputHeight] = useState(0);

    const [data, setData] = useState(MessageHistory)

    {/* トーク画面に表示されるキーボードの要素
    1: 写真
    2: 打ち込み画面
    3: Sendのボタン
    */}
    // data追加のfunction

    function MessageAdd(bodyText){
        const AddMessage={id:data.list.length,type:'send',message:bodyText,sendBy:name}
        data.list.unshift(AddMessage)
        data.listUpdate+=1
        setData(data)
        setBodyText('')
    }
    return(
            <View style={styles.footer}>
                <View style={styles.footerContainer}>
                    <View style={styles.contentsView}>
                        <TouchableOpacity>
                            <View>
                                <Image source={require('../camera.png')} style={styles.image}/>
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
                                <Image source={require('../submit.png')}style={styles.submit}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:'100%',
        width:'100%',
        flexDirection:'column',
        borderWidth:0.5,
        justifyContent:'flex-end',
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
    sendButton:{

    },
})
