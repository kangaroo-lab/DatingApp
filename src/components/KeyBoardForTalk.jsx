import React,{useState} from 'react';
import { StyleSheet, Text, View, Image,Button,TextInput, TouchableOpacity,KeyboardAvoidingView } from 'react-native';

import MessageHistory from '../data/MessageHistory'

export default function KeyBoardForTalk(){
    const [bodyText, setBodyText] = useState('');
    {/* トーク画面に表示されるキーボードの要素
    1: 写真
    2: 打ち込み画面
    3: Sendのボタン
    */}
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
                                style={styles.textInput}
                                value={bodyText}
                                placeholder='メッセージを入力'
                                onChangeText={(text)=>{setBodyText(text);}}
                            />
                        </View>
                    </View>
                    <View style={styles.contentsView}>
                        <TouchableOpacity
                            onPress={()=>MessageHistory(bodyText)}
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
        justifyContent:'flex-start'
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
        height:30,
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
