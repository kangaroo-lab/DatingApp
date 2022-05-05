import React, { useState ,useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView,StatusBar } from 'react-native';
import {string} from 'prop-types'
import firebase from 'firebase';

import TalkBoardGround from '../../../components/TalkBoardGround';

//navigationのheaderを無視するための数字！
const KEYBOARD_VERTICAL_OFFSET = 90 + StatusBar.currentHeight;

export default function TalkBoard(props){
    //データの追加に伴って再レンダリングを行う
    const {key} = props.route.params;
    const [data,setData] = useState([]);
    const [name,setName] = useState();

    useEffect(()=>{
        let unsubscribe = joinTheRoom()
        return unsubscribe;
    },[]);

    function joinTheRoom(){
        const db = firebase.firestore();
        const ref = db.collection(`talkRooms`).doc(key).collection('talkRoom');
        const saveData = [];
        ref.onSnapshot((snapShot)=>{
            snapShot.forEach((doc)=>{
                saveData.push(doc.data());
            });
            setData(saveData);
        });
        getUserName();
    };

    function getUserName(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`);
        ref.onSnapshot((snapShot)=>{
            snapShot.forEach((doc)=>{
                setName(doc.data().name.value)
            });
        });
    };

    return(
    <View style={styles.container}>
        {/* Talk画面全体の表示 */}
        <KeyboardAvoidingView
            behavior='padding'
            style={styles.TalkContainer}
            keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
        >
            <TalkBoardGround
                MessageHistory={data}
                UserName={name}
            />
        </KeyboardAvoidingView>
        <View style={styles.footerFill}/>
    </View>
    );
}

TalkBoard.propTypes = {
    MessageHistory:string,
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height:'100%',
        width:'100%'
    },
    TalkContainer:{
        flex:1,
        marginHorizontal:10
    },
    image:{
        marginHorizontal:15,
        width: 34,
        height:34,
    },
    footerFill:{
        height:18
    }
});
