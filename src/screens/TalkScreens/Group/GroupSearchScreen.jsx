import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Keyboard,
    InputAccessoryView,
    Alert
} from 'react-native';
import firebase from 'firebase'
import { Component } from 'react';


export default function(){
    return <GroupSearch/>
}
class GroupSearch extends Component{
    constructor(props){
        super(props);
        this.state={
            uid : "9tfvLANHSQQeC76DdGxZmwvNiAm2",
            key:"",
            name:'',
            address:'',
            partnerAMkey:'',
            partnerGender:'',
            userAMkey:'',
            userGender:'',
            userAddress:'',
            userValue:'',
            userName:'',
            partnerValue:'',
        }
    }

    inputAccessoryViewID = 'uniqueID';

    componentDidMount(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`);
        ref.onSnapshot((snapShot)=>{
            snapShot.forEach((doc)=>{
                const data = doc.data()
                this.setState({userName:data.name.value,userAMkey:data.appManagerKey,userGender:data.gender,userAddress:data.address.value});
                this.getAMRef(data.gender,data.address.value,data.appManagerKey)
                    .get()
                    .then((val)=>{
                        this.setState({userValue:val.data().value})
                    });
            });
        });
    };

    checkBox(){
        const ref =this.getRef();
        ref.onSnapshot((snapShot)=>{
            snapShot.forEach((doc)=>{
                this.setState({name:doc.data().name.value,address:doc.data().address.value,partnerAMkey:doc.data().appManagerKey,partnerGender:doc.data().gender})
            })
            if(this.state.name!=''){
                Alert.alert(
                    `友達検索`,
                    `${this.state.name}さんで間違いありませんか？`,
                    [
                        {text:'YES',onPress:()=>{this.getNewRoom()}},
                        {text:'NO',onPress:()=>{this.setState({uid:''})}}
                    ]
                );
            }
        });
    }

    addNewRoom(ref,key,bool,id){
        ref.add({
            key:key,
            requset:false,
            partner:id,
            leader:bool,
            group:true
          })
    }

    getMyRef(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`users/${currentUser.uid}/talkLists`)
        return ref
    }

    getRef(){
        const db = firebase.firestore();
        const ref = db.collection(`users/${this.state.uid}/userInfo`);
        return ref
    }

    getFriRef(){
        const db = firebase.firestore();
        const ref = db.collection(`users/${this.state.uid}/talkLists`);
        return ref
    }

    getNewRoom(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`talkRooms`);
        ref.add({
        group:true,
        due:new Date(),
        address:this.state.address,
        member:[{
          id:currentUser.uid,
        },{
          id:this.state.uid,
        }],
        message:[{
          time:new Date(),
          message:'メッセージを送ってみましょう！',
          user:'アプリ公式',
          read:[{
            id:currentUser.uid,
            read:false
          },{
            id:this.state.uid,
            read:false
          }]
        }],
        requested:false,
        status:false
        })
        .then(async(docRef)=>{
            await this.addAppManager(docRef.id);
            this.setState({key:docRef.id})
            const myRef = this.getMyRef();
            const frRef = this.getFriRef();
            this.addNewRoom(myRef,docRef.id,true,this.state.uid)
            this.addNewRoom(frRef,docRef.id,false,currentUser.uid)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    addAppManager(id){
        this.getAMRef(this.state.partnerGender,this.state.address,this.state.partnerAMkey)
            .get()
            .then((val)=>{
                this.setState({partnerValue:val.data().value});
                this.makeAppManager(id)
            })
    }

    makeAppManager(id){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`AppManager/Group/${this.state.address}`);
        ref.add({
            id:id,
            value:this.state.partnerValue+this.state.userValue,
            members:[
                {
                    id:this.state.uid,
                    name:this.state.name,
                    gender:this.state.partnerGender
                },
                {
                    id:currentUser.uid,
                    name:this.state.userName,
                    gender:this.state.userGender
                }],
            match:false,
            now:false,
            search:false,
            wait:false
        })
        .then((docRef)=>{
            console.log(docRef.id)
            this.getRoomRef(docRef.id)
        })
        .catch((e)=>console.log(e))
    }

    getRoomRef(id){
        const db = firebase.firestore();
        db.collection('talkRooms').doc(this.state.key).update({
            appManagerKey:id
        })
        .then(()=>console.log('Clear'))
        .catch((e)=>console.log(e))
    }

    getAMRef(gender,address,key){
        const db = firebase.firestore();
        return db.collection(`AppManager/${gender}/${address}`).doc(key)
    }

    render(){
        return(
            <View>
                <Text>Search</Text>
                <View>
                    <TextInput
                        placeholder='ID検索'
                        style={{height:30,backgroundColor:'#ffffff',fontSize:15,paddingVertical:5,paddingHorizontal:15,marginVertical:20,marginHorizontal:25,borderRadius:15,borderColor:'rgba(0,0,0,0.25)'}}
                        inputAccessoryViewID={this.inputAccessoryViewID}
                        value={this.state.uid}
                        onChangeText={(text)=>{this.setState({uid:text})}}
                        autoCapitalize={false}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={()=>{
                            this.checkBox()
                        }}
                        disabled={this.state.uid<10?true:false}
                    >
                        <View style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>決定</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <InputAccessoryView nativeID={this.inputAccessoryViewID} backgroundColor='#EEEEEE'>
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

