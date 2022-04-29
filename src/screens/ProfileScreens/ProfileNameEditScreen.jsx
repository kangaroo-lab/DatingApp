import React,{useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Keyboard,InputAccessoryView } from 'react-native';

import User from '../../data/user';

export default function NameEdit(props){
    const navigation = props.navigation;
    const userName = props.route.params
    const [name, setName] = useState(userName.user);
    const inputAccessoryViewID = 'uniqueID';
    function ReflectEditFile(newName){
        User.profile.name=User.profile.profileList[0].container=newName;
    }

    return(
        <View>
            <View>
                <View>
                    <TextInput
                        style={{height:30,backgroundColor:'#ffffff',fontSize:15,paddingVertical:5,paddingHorizontal:15,marginVertical:20,marginHorizontal:25,borderRadius:15,borderColor:'rgba(0,0,0,0.25)'}}
                        value={name}
                        onChangeText={(text)=>setName(text)}
                        inputAccessoryViewID={inputAccessoryViewID}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={()=>{
                            ReflectEditFile(name)
                            navigation.navigate('Profile',{'name':name})
                        }}
                    >
                        <View style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>決定</Text>
                        </View>
                    </TouchableOpacity>
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
        </View>
    )
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
        borderRadius:20,
        marginHorizontal:20
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

