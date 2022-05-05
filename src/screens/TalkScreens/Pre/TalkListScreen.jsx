import React,{useEffect,useState} from 'react';
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import MessageList from '../../../components/TalkList';

export default function TalkList(){
    const [data, setData] = useState([]);
    const [partner, setPartner] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        let unsubscribe = getTalkRef()
            .onSnapshot((snapShot)=>{
                snapShot.forEach((doc)=>{
                    getRoomRef(doc.data().key)
                });
            });
        return unsubscribe;
    },[]);

    function getUserRef(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        return db.collection(`users/${currentUser.uid}/userInfo`);
    };


    function getTalkRef(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        return db.collection(`users/${currentUser.uid}/talkLists`);
    }

    function getRoomRef(key){
        const db = firebase.firestore();
        const ref = db.collection(`talkRooms`);
        const {currentUser} = firebase.auth();
        ref.onSnapshot((snapShot)=>{
            snapShot.forEach((doc)=>{
                let partnerId = '';
                if(currentUser.uid==doc.data().memberA){
                    partnerId=doc.data().memberB
                }else if(currentUser.uid==doc.data().memberB){
                    partnerId=doc.data().memberA;
                }else{
                    console.log('ERROR IN GET ROOM REF IN TALKLIST SCREEN')
                }
                getPartnerRef(partnerId);
                getRoomContents(key);
                setCount(count+1)
            });
        });
    }

    function getRoomContents(key){
        const room = [];
        const db = firebase.firestore();
        const ref = db.collection(`talkRooms`);
        ref.doc(key).collection('talkRoom')
            .onSnapshot((snapShot)=>{
                snapShot.forEach((doc)=>{
                    room.push({
                        message:doc.data().message,
                        date:doc.data().time.toDate(),
                        key:key
                    })
                });
                console.log(room)
                setData(room)
            });
    }

    function getPartnerRef(id){
        const db = firebase.firestore();
        const user = []
        db.collection(`users/${id}/userInfo`)
            .onSnapshot((snapShot)=>{
                snapShot.forEach((doc)=>{
                    const userInfo = doc.data();
                    user.push({
                        name:userInfo.name.value,
                        img:userInfo.url
                    });
                });
                console.log(user)
                setPartner(user)
            });
    }

    function makeDataToScreen(){
    }

    return(
    <View
        style={{
            flex:1
        }}
    >
        <MessageList style={styles.MessageList} user={partner} message={data}/>

    </View>
    );
}
    const styles = StyleSheet.create({

});
