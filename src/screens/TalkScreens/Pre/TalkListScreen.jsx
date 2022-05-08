import React,{useEffect,useState} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import firebase from 'firebase';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment'

import MessageList from '../../../components/TalkList';

export default function TalkList(){
    const [data, setData] = useState([]);
    const [partner, setPartner] = useState([]);
    const [unReads,setUnReads] = useState([]);

    useEffect(()=>{
        let unsubscribe = getTalkRef()
            .onSnapshot((snapShot)=>{
                snapShot.forEach((doc)=>{
                    getRoomRef(doc.data().key);
                });
            });
        return unsubscribe;
    },[]);

    function getTalkRef(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        return db.collection(`users/${currentUser.uid}/talkLists`);
    }

    //パートナーの情報とトークの情報をゲット
    function getRoomRef(key){
        const db = firebase.firestore();
        const ref = db.collection(`talkRooms`);
        const {currentUser} = firebase.auth();
        ref.onSnapshot((snapShot)=>{
            snapShot.forEach((doc)=>{
                if(!doc.data().status){
                    doc.data().member.forEach((elem)=>{
                        const partnerId = []
                        if(currentUser.uid!==elem.id){
                            partnerId.push({
                                id:elem.id,
                            });
                        }
                        getPartnerRef(partnerId);
                        getRoomContents(key);
                    });
                };
            });
        });
    }

    function getRoomContents(key){
        let room = [];
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`talkRooms`);
        let n = 0;
        ref.doc(key)
            .onSnapshot((snapShot)=>{
                const data = snapShot.data().message;
                data.forEach((element)=>{
                    room.push({
                        message:element.message,
                        date:element.time.toDate(),
                        key:key,
                        unReads:0
                    });
                    element.read.forEach((member)=>{
                        if(member.id==currentUser.uid&&!member.read){
                            room[0].unReads+=1;
                        }
                    })
                });
                // room = unReadCount(room)
                setData(room)
            });
    };

    function getPartnerRef(ids){
        const db = firebase.firestore();
        const user = []
        ids.forEach((id)=>{
            db.collection(`users/${id.id}/userInfo`)
                .onSnapshot((snapShot)=>{
                    snapShot.forEach((doc)=>{
                        const userInfo = doc.data();
                        user.push({
                            name:userInfo.name.value,
                            img:userInfo.url
                        });
                    });
                setPartner(user)
            });
        });
    }


    const isFocused = useIsFocused();

    if(!isFocused){
        return(
            <View>

            </View>
        )
    }

    return(
    <View
        style={{
            flex:1
        }}
    >
        <MessageList style={styles.MessageList} user={partner} message={data} count={unReads}/>

    </View>
    );
}
    const styles = StyleSheet.create({

});
