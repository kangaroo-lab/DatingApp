import React,{useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Keyboard,
    InputAccessoryView
} from 'react-native';
import firebase from 'firebase';

export default function NameEdit(props){
    const navigation = props.navigation;
    const {user,id} = props.route.params;
    const [name, setName] = useState(user);
    const inputAccessoryViewID = 'uniqueID';

    function handlePress(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`).doc(id);
        ref.update({
            name:{
                title:'name',
                value:name
            }
        })
        .then(()=>{
            navigation.reset({
                index:0,
                routes:[{name:'Profile'}]
            })
        })
        .catch(()=>{
            alert('名前の変更に失敗したお')
        })
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
                            handlePress()
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

