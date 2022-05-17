import React,{useState,useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import
  Animated,
{
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import {useNavigation,useIsFocused} from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';

export default function Top2(){
  const isFocused = useIsFocused();
  if(!isFocused){
    return(
        <View/>
    )
}

  const [key, setKey] = useState('6E3yrZUp4lfYPTDQb6d6');
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

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
          partner: data.partnerGender,
          key:data.appManagerKey,
          address:data.address.value,
          gender:data.gender
        });
      });
      setData(userInfo[0])
    });
    return unsubscribe
  },[])

  //検索の動作を決めるbool変数
  let flag=0;

  //appmanagerからonline状態の人を数える
  //if(allOnline%2==0)ならserchをtrueにそうじゃないならwaitをtrueにする
  //waitがtrueならserchに引っかかったタイミングでjointheroomをonにする
  function searchCounter(){
    const db = firebase.firestore();
    const ref = db.collection(`AppManager/${data.gender}/${data.address}`);
    let n = 0
    ref.onSnapshot((snapShot)=>{
      snapShot.forEach((doc)=>{
        if(doc.data().search){
          n+=1
        };
      });
    });
    setCount(n)
    whichSorW()
  };

  function whichSorW(){
    if(count%2==0){
      const db = firebase.firestore();
      const ref = db.collection(`AppManager/${data.gender}/${data.address}`);
      // ref.doc(data.key).update({
      //     search:true
      //   })
      console.log('Searcher',count)
      let value = 0;
      ref.doc(data.key).onSnapshot((snapShot)=>{
        value = snapShot.data().value;
        console.log('Value Is ',value);
        serchForMatch(value)
      })
    }else{
      const db = firebase.firestore();
      const ref = db.collection(`AppManager/${data.gender}/${data.address}`);
      // ref.doc(data.key)
      //   .update({
      //     wait:true
      // });
      console.log('Waiter',count)
    }
  }

  //appmanagerより、性別と場所で検索
  //-> 価値観の数値で近い人を配列に入れる
  function serchForMatch(n){
    console.log(n)
    const db = firebase.firestore();
    const ref = db.collection(`AppManager/${data.partner}/${data.address}`);
    const equal = [];
    const high = [];
    const low = [];
    ref.orderBy('value','asc').onSnapshot((snapShot)=>{
      snapShot.forEach((doc)=>{
        if(doc.data().wait){
          // const data = {
          //   id: doc.data().id,
          //   value:doc.data().value,
          //   hobby:doc.data().hobby
          // }
          const data = doc.data().value
          if(doc.data().value==n){
            equal.push(data)
          }else if(doc.data().value>n){
            high.unshift(data)
          }else{
            low.push(data)
          };
        };
      });
      console.log(`VALUE IS ${n}\nEQUAL: ${equal}\nLOW: ${low}\nHIGH: ${high}`);
    });
  };

  //  -> 検索条件いあうひとだけを残す
  //    -> 趣味の合うひとを検索(カテゴリが同じ人だけでフィルターにする)
  //      -> 趣味の内容で被る人がいたらマッチングしちゃおう(マッチは、相手にkeyを送る形で実現する)

  function filter(array){
    const db = firebase.firestore();

  }


  // 仮作成:TalkRoomに参加させる
  function joinRoom(){
    const db = firebase.firestore();
    const ref = db.collection(`talkRooms`);
    const {currentUser} = firebase.auth();
    const data = ref.doc(key).get().member
      ref.doc(key).update({
        member:data.push({id:currentUser.uid}),
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
        member:[{id:currentUser.uid,}],
        message:[{
          time:new Date(),
          message:'メッセージを送ってみましょう！',
          user:'アプリ公式',
          }],
        requested:false,
        status:false
      })
      .then((docRef)=>{
        getKey(docRef.id)
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
        requset:false
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
        // joinRoom()
        // makeRoom()
        searchCounter()
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
