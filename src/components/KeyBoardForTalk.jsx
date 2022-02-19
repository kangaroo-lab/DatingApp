import React from 'react';
import { StyleSheet, Text, View, Image,Button,TextInput, TouchableOpacity } from 'react-native';

export default function KeyBoardForTalk(){
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
                                placeholder='メッセージを入力'
                            />
                        </View>
                    </View>
                    <View style={styles.contentsView}>
                        <TouchableOpacity>
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
        borderWidth:1,
        justifyContent:'flex-end',
    },
    footer:{
        borderWidth:1,
        height:80,
        flexDirection:'row',
        justifyContent:'center'
    },
    footerContainer:{
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
        paddingHorizontal:5,
        borderRadius:20,
        borderWidth:1,
        paddingVertical:5,
    },
    textInput:{
        fontSize:15,
    },
    sendButton:{

    },
})
