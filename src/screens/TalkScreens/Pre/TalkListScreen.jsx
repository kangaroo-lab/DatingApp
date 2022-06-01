import React,{useEffect,useState} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import firebase from 'firebase';
import {useIsFocused} from '@react-navigation/native';

import MessageList from '../../../components/TalkList';

export default function TalkList(){
    const [data, setData] = useState([]);
    const [partner, setPartner] = useState([]);
    const [partners,setPartners] = useState([]);
    const [messages,setMessages] = useState([])

    useEffect(()=>{
        const keys = []
        let unsubscribe = getTalkRef()
            .onSnapshot(async(snapShot)=>{
                snapShot.forEach((doc)=>{
                    keys.push(doc.data().key)
                });
                await getRoomRef(keys);
            });
        return unsubscribe;
    },[]);

    function getTalkRef(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        return db.collection(`users/${currentUser.uid}/talkLists`);
    }

    //パートナーの情報とトークの情報をゲット
    async function getRoomRef(keys){
        const db = firebase.firestore();
        const ref = await db.collection(`talkRooms`);
        const {currentUser} = firebase.auth();
        const test = []
        ref.onSnapshot(async(snapShot)=>{
            snapShot.forEach((doc)=>{
                if(!doc.data().status){
                    const partnerId = []
                    doc.data().member.forEach(async(elem)=>{
                        if(currentUser.uid!==elem.id&&!test.includes(elem.id)){
                            test.push(elem.id)
                            partnerId.push({
                                id:elem.id,
                            });
                        }
                    });
                };
            });
            //配列を複数にまとめてる
            await getPartnerRefs(test)
            await getAllRoomContents(keys)
        });
    }

    //パートナーの情報をゲット(修正版)
    async function getPartnerRefs(ids){
        const db = firebase.firestore();
        const user = []
        await ids.forEach(async(id)=>{
            await Promise.all(db.collection(`users/${id}/userInfo`)
                .onSnapshot((snapShot)=>{
                    snapShot.forEach((doc)=>{
                        const userInfo = doc.data();
                        user.push({
                            name:userInfo.name.value,
                            img:userInfo.url
                        });
                    });
            setPartners(user)
            }));
        });
    }

    //talkroomの情報を獲得(修正版)
    async function getAllRoomContents(keys){
        let room = [];
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`talkRooms`);
        let n = 0;
        keys.forEach((key)=>{
            ref.doc(key)
            .onSnapshot((snapShot)=>{
                const data = snapShot.data().message;
                let i = 0;
                data.forEach((element)=>{
                    element.read.forEach((member)=>{
                        if(member.id==currentUser.uid&&!member.read){
                            i+=1;
                        }
                    })
                    room.push({
                        message:element.message,
                        date:element.time.toDate(),
                        key:key,
                        unReads:i
                    });
                });
            setMessages(room)
            });
        });
    };




    const isFocused = useIsFocused();

    return(
    <View
        style={{
            flex:1
        }}
    >
        <MessageList style={styles.MessageList} users={partners} messages={messages}/>

    </View>
    );
}
    const styles = StyleSheet.create({

});
