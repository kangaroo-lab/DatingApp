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
import {useNavigation} from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';

export default function Top2(){

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [hobby, setHobby] = useState([]);
  const [partners, setPartners] = useState([]);
  const [matched,setMatched] = useState(false)
  //検索の動作を決めるbool変数
  const [flag,setFlag]=useState(false);

  useEffect(()=>{
    const userInfo = []
    const hobbyInfo = []
    const partnersInfo = []
    const db = firebase.firestore();
    const {currentUser} = firebase.auth();
    const ref = db.collection(`users/${currentUser.uid}/userInfo`);
    let unsubscribe =  ref.onSnapshot((snapShot)=>{
      snapShot.forEach((doc)=>{
        const data = doc.data()
        userInfo.push({
          id: doc.id,
          userId:currentUser.uid,
          partner: data.partnerGender,
          key:data.appManagerKey,
          address:data.address.value,
          gender:data.gender
        });
      });
      ref.doc(userInfo[0].id).collection('hobby').onSnapshot((snapShot)=>{
        snapShot.forEach((doc)=>{
          const data = doc.data().hobby;
          data.forEach((elem)=>{
            if(elem.status){
              const hobbys = [];
              elem.list.forEach((h)=>{
                if(h.status){
                  hobbys.push(h.id)
                };
              });
              hobbyInfo.push(
                elem.id,
              );
            };
          });
        });
        setHobby(hobbyInfo)
      });
      const refTalkLists = db.collection(`users/${currentUser.uid}/talkLists`);
      refTalkLists.onSnapshot((snapShot)=>{
        if(!snapShot.empty){
          snapShot.forEach((doc)=>{
            partnersInfo.push(
              doc.data().partner
            );
          });
        };
        setPartners(partnersInfo)
      });
      setData(userInfo[0])
    });
    return unsubscribe
  },[])


  //appmanagerからonline状態の人を数える
  //if(allOnline%2==0)ならserchをtrueにそうじゃないならwaitをtrueにする
  //waitがtrueならserchに引っかかったタイミングでjointheroomをonにする
  async function searchCounter(){
    const db = firebase.firestore();
    const ref = db.collection(`AppManager/${data.gender}/${data.address}`);
    ref.onSnapshot(async(snapShot)=>{
      let n = 0;
      await Promise.all(snapShot.docs.map(async(doc)=>{
        if(doc.data().search){
          console.log(doc.data().id)
          n+=1
        };
        console.log(n)
        setCount(n);
      }))
      .then(()=>{
        whichSorW()
      })
      .catch((err)=>{
        console.log('SOMETHIN WRONG',err)
      })
    })};

  function whichSorW(){
    if(count%2==0){
      const db = firebase.firestore();
      const ref = db.collection(`AppManager/${data.gender}/${data.address}`);
      ref.doc(data.key).update({
          search:true
        })
      console.log('Searcher',count)
      let value = 0;
      ref.doc(data.key).onSnapshot((snapShot)=>{
        value = snapShot.data().value;
        serchForMatch(value)
      })
    }else{
      const db = firebase.firestore();
      const ref = db.collection(`AppManager/${data.gender}/${data.address}`);
      ref.doc(data.key)
        .update({
          wait:true
      });
      console.log('Waiter',count)
    }
  }


  //SEARCH側のコード

  //TalkRoomの制作
    async function makeRoom(partner){
      console.log('KEY ON')
      const sleep = () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(1)
          }, 1000)
        })
      }

      await sleep()
      const db = firebase.firestore();
      const ref = db.collection('talkRooms');
      const {currentUser} = firebase.auth();
      ref.add({
        member:[{
          id:currentUser.uid,
        },{
          id:partner.id,
        }],
        message:[{
          time:new Date(),
          message:'メッセージを送ってみましょう！',
          user:'アプリ公式',
          read:[{
            id:currentUser.uid,
            read:false
          },{
            id:partner.id,
            read:false
          }]
        }],
        requested:false,
        status:false
      })
      //->相手のmatchをtrueにする+talkroomのkeyを付与する
      .then((docRef)=>{
        console.log('CLEAR THE KEY')
        controlSendKeys(docRef.id,partner)
      })
      .catch((err)=>{
        console.error(err);
      })
    }

    async function controlSendKeys(key,partnerData){
        await getKey(key,partnerData)
        //マッチしたことをpartnerに伝える
        await pushMatchForPartner(partnerData.keyId);
        await sendKey(partnerData.id,key)
    }

    async function getKey(key,partnerData){
      const db = firebase.firestore();
      const {currentUser} = firebase.auth();
      const ref = db.collection(`users/${currentUser.uid}/talkLists`);
      ref.add({
        key:key,
        requset:false,
        partner:partnerData.id
      })
      .then(console.log('GET KEY'))
      .catch((err)=>console.log(err))
    }

    //partnerの操作
    //(partnerに鍵を付与して、マッチしたことを伝える)
    async function sendKey(partnerId,key){
      const db = firebase.firestore();
      const ref = db.collection(`users/${partnerId}/talkLists`);
      ref.add({
        key:key,
        requset:false,
        partner:data.userId
      })
      .then(console.log('SEND KEY'))
      .catch(console.log('ERROR ON SEND KEY'))
    }

    //partnerにマッチしたことを通知
    async function pushMatchForPartner(partnerKeyId){
      const db = firebase.firestore();
      const ref = db.collection(`AppManager/${data.partner}/${data.address}`).doc(partnerKeyId);
      ref.update({
        match:true
      })
      .catch((err)=>{
        console.log(err)
      })
    }


  //  -> 検索条件いあうひとだけを残す
  //    -> 趣味の合うひとを検索(カテゴリが同じ人だけでフィルターにする)
  //      -> 趣味の内容で被る人がいたらマッチングしちゃおう(マッチは、相手にkeyを送る形で実現する)
  async function filter(array){
    const sleep = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(1)
        }, 3000)
      })
    }
    console.log('ON FILTER')
    await sleep()
    const db = firebase.firestore();
    for(let i=0; i<array.length;i++ ){
      if(array[i]==0){
        continue
      }
      console.log(array[i].id)
      for(let j=0;j<array[i].hobby.length;j++){
        console.log(j)
        if(hobby.includes(array[i].hobby[j])){
          return array[i]
        };
      };
    };
    return null
  };

  //appmanagerより、性別と場所で検索
  //-> 価値観の数値で近い人を配列に入れる
  async function serchForMatch(n){
    const sleep = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(1)
        }, 2000)
      })
    }

    await sleep()
    console.log(n)
    const db = firebase.firestore();
    const ref = db.collection(`AppManager/${data.partner}/${data.address}`);
    const equal = [...Array(20)].map(()=>0);
    const high = [...Array(20)].map(()=>0);
    const low = [...Array(20)].map(()=>0);
    const about = [...Array(20)].map(()=>0);
    let i=0;
    let k=0;
    let j=19;
    ref.orderBy('value','asc').onSnapshot(async(snapShot)=>{
      snapShot.forEach((doc)=>{
        if(doc.data().wait&&!partners.includes(doc.data().id)){
          console.log(doc.data().id)
          const data = {
            keyId:doc.id,
            id: doc.data().id,
            value:doc.data().value,
            hobby:doc.data().hobby
          }
          if(doc.data().value==n){
            if(i<20){
              equal[i]=data
              i+=1
            }
          }else if(doc.data().value>n){
            if(j>0){
              high[j]=data;
              j-=1
            }
          }else{
            if(k<20){
              low[k]=data
              k+=1
            }
          };
        };
      });

      for(let i=0;i<20;i++){
        if(high[0]==0){
          high.shift();
        }
      };

      let x=0;
      let y=0;
      for(let i=0;i<20;i++){
        if(i%2==0){
          about[i]=high[x];
          x+=1;
        }else{
          about[i]=low[y];
          y+=1;
        };
      };
      // 配列で価値観の近いお相手をソートした
      // ->趣味が一つでも被っている相手を探索して、マッチのお相手を決定！
      let partnerData = await filter(equal);
      if(partnerData!=null){
        await sleep()
        console.log('WILL MATCH PARTNER IS',partnerData.keyId);
        //マッチが決定したらroomを制作
        const roomKey = await makeRoom(partnerData)
        .then(matchedAlert(partnerData))
        console.log('KEY IS ', roomKey);
      }else{
        partnerData = await filter(about);
        if(partnerData!=null){
          await sleep()
          console.log('WILL MATCH PARTNER IS IN NEXT ',partnerData.keyId);
          const roomKey = await makeRoom(partnerData)
          .then(matchedAlert(partnerData))
          console.log('KEY IS ', roomKey);
        };
      };
    });
  };


  async function matchedAlert(partnerData){
    const sleep = () =>{
      return new Promise(resolve =>{
        setTimeout(()=>{
          resolve(1)
        },2000)
      })
    }
    await sleep()
    await accessDb({
      gender:data.partner,
      address:data.address,
      id:partnerData.keyId
    });
    await accessDb({
      gender:data.gender,
      address:data.address,
      id:data.key
    });
    searching()
    alert(`${partnerData.id}とマッチしました`)
  }

  async function accessDb(data){
    const db = firebase.firestore();
    const ref = db.collection(`AppManager/${data.gender}/${data.address}`).doc(data.id);
    ref.update({
      wait:false,
      search:false,
      match:true
    });
  }

  //検索中の波形アニメーションを実装(アニメーションはViewタッチで発火)
  async function searching(){
    //Searchingアニメーションの開始＋検索のプログラム
    if(!flag){
        console.log('NOW SEARC')
        ring.value=withRepeat(
          withTiming(1, {
            duration: 3000,
          }),
          -1,
          false
        );
        await searchCounter();
      return setFlag(true);;
    }
    //Searchingアニメーションの終了＋検索のストップ
    else{
      ring.value=0;
      return setFlag(false);;
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
