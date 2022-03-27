import React,{useState} from 'react';
import { StyleSheet, Text, View, Button, Alert,Image,ScrollView, TouchableOpacity,TextInput,Keyboard,InputAccessoryView } from 'react-native';
import { string, func, shape } from 'prop-types';

import User from '../data/user';

export default function BriefEdit(props){
    console.log(props)
    const navigation = props.navigation;
    const userBrief = props.route.params
    const [brief, setBrief] = useState(userBrief.userBrief);
    function ReflectEditFile(newBrief){
        User.profile.brief=newBrief
    }
    const inputAccessoryViewID = 'uniqueID';
    return(
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>プロフィール入力</Text>
            </View>
            <View style={styles.inputBox}>
                <View>
                    <TextInput
                     multiline={true}
                     style={{height:'90%',backgroundColor:'#ffffff',fontSize:15,paddingVertical:5,paddingHorizontal:5}}
                     onChangeText={(text)=>setBrief(text)}
                     value={brief}
                     inputAccessoryViewID={inputAccessoryViewID}
                    />
                </View>
                <View style={styles.submitButtonArea}>
                    <TouchableOpacity
                        onPress={()=>{
                            ReflectEditFile(brief)
                            navigation.navigate('Profile',{'brief':brief})
                        }}
                    >
                        <View style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>送信</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor='#EEEEEE'>
                <View style={{alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={()=>{
                        Keyboard.dismiss()
                    }}
                        style={styles.endButton}
                    >
                        <Text style={styles.endButtonText}>完了</Text>
                    </TouchableOpacity>
                </View>
            </InputAccessoryView>
        </View>
    )
}

BriefEdit.propTypes={
    userBrief:string
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
    },
    titleBox:{
        marginHorizontal:10
    },
    title:{
        fontSize:18,
        fontWeight:'bold'
    },
    inputBox:{
        marginHorizontal:10,
        marginVertical:10,
        flexDirection:'column',
        justifyContent:'flex-start'
    },
    submitButtonArea:{
        margin:0
    },
    submitButton:{
        backgroundColor:'#6FCBFF',
        justifyContent:'center',
        flexDirection:'row',
        paddingVertical:10,
        borderRadius:20
    },
    submitButtonText:{
        fontSize:18,
        color:'#ffffff',
        fontWeight:'bold'
    },
    endButton:{
        width:60,
        alignItems: "center",
        padding: 10,
    },
    endButtonText:{
    fontSize: 18,
    fontWeight:'bold',
    color:'hsl(210, 100%, 60%)'
    }
})
