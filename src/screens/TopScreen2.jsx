import React,{useState,useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import
  Animated,{
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';

export default function Top2(){
  const [key, setKey] = useState('6E3yrZUp4lfYPTDQb6d6');

  useEffect(()=>{
    const userInfo = []
    const hobbyInfo = []
    const db = firebase.firestore();
    const {currentUser} = firebase.auth();
    const ref = db.collection(`users/${currentUser.uid}/userInfo`);
    let unsubscribe =  ref.onSnapshot((snapShot)=>{
      snapShot.forEach((doc)=>{
        const data = doc.data()
        userInfo.push({
          id: doc.id,
          name: data.name
        });
        ref.doc(`${doc.id}`).collection('hobby')
          .onSnapshot((snapShot)=>{
            snapShot.forEach((doc)=>{
              const hData = doc.data().hobby
              for(let i = 0; i<hData.length; i++){
                if(hData[i].status){
                  hobbyInfo.push({
                    title:hData[i].title,
                    list:hData[i].list
                  })
                };
              };
            })
          })
      })
    });
    return unsubscribe
  },[])

  //検索の動作を決めるbool変数
  let flag=0;

  // 仮作成:TalkRoomに参加させる
  function joinRoom(){
    const db = firebase.firestore();
    const ref = db.collection(`talkRooms`);
    const {currentUser} = firebase.auth();
    ref.doc(key)
      .update({
        memberB:currentUser.uid,
      })
      .then(()=>{
        getKey(key);
      })
  }

  // 仮作成:TalkRoomを作成して、アクセスを可能にする
  function makeRoom(){
    const db = firebase.firestore();
    const ref = db.collection(`talkRooms`);
    const {currentUser} = firebase.auth()
    ref
      .add({
        memberA:currentUser.uid,
      })
      .then((docRef)=>{
        getKey(docRef.id);
        setKey(docRef.id);
        ref.doc(docRef.id).collection('talkRoom')
          .add({
            time:new Date(),
            message:'メッセージを送ってみましょう！',
            user:'アプリ公式',
          })
      })
  }

  // roomkeyをuserInfoに追加して、userがroomに参加できるようにする
  function getKey(roomKey){
    const db = firebase.firestore();
    const {currentUser} = firebase.auth()
    const ref = db.collection(`users/${currentUser.uid}/talkLists`);
    ref
      .add({
        key:roomKey,
      })
  }

  //検索中の波形アニメーションを実装(アニメーションはViewタッチで発火)
  function searching(){
    //Searchingアニメーションの開始＋検索のプログラム
    if(flag==0){
      flag+=1;
        ring.value=withRepeat(
          withTiming(1, {
            duration: 3000,
          }),
          -1,
          false
        );
        joinRoom()

        // makeRoom()
      return console.log();
    }
    //Searchingアニメーションの終了＋検索のストップ
    else{
      flag=0;
      ring.value=0;
      return console.log('out ',ring.value);
    }
    };

  //navigation
  const navigation = useNavigation();
  //アニメーションの定義
  const ring = useSharedValue(0);
  const style = useAnimatedStyle(()=>{
    return {
      opacity:0.8-ring.value,
      transform:[
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ]
    };
  })

  //全体の表記
  return(
    <View style={styles.container}>
      <View style={styles.menuBar}>
        <TouchableOpacity
          onPress={()=>{
            navigation.openDrawer()
          }}
        >
          <Ionicons name="md-menu" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContain}>
        <View style={styles.mainContainRow}>
          <TouchableOpacity
            disabled={true}
            style={styles.circleButton}
            onPress={()=>{
              console.log('push');
              searching();
            }}
          >
            <View style={styles.circleButton}>
              <Animated.View style={[styles.circleButton,style]}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems: 'center',
    },
    mainContain:{
    },
    mainContainRow:{
    },
    menuBar:{
      position:'absolute',
      top:0,
      left:0,
      marginHorizontal:30,
      marginVertical:50,
    },
    circleButton:{
      borderColor:'#4169E1',
      borderWidth:5,
      width:179,
      height:179,
      borderRadius:500,
      justifyContent:'center',
      alignItems:'center',
    },
    buttonCircleText:{
      color:'rgba(0,0,0,0.55)',
    }
  });
