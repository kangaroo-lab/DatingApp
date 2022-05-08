import React,{useState,useEffect} from 'react';
import {
    StyleSheet,
    View ,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import firebase from 'firebase';
import {useIsFocused,useNavigation} from '@react-navigation/native';
import { format } from 'date-fns';
import { concat } from 'react-native-reanimated';


export default function OfficialTalkList(){
    const [data, setData] = useState([]);
    const [partner, setPartner] = useState([]);
    const [count, setCount] = useState(0);
    const [mount, setMount] = useState(false);
    const [perfectData, setPerfectData] = useState([]);

    const navigation = useNavigation();

    useEffect(()=>{
        let unsubscribe = getTalkRef()
            .onSnapshot((snapShot)=>{
                snapShot.forEach((doc)=>{
                    getRoomRef(doc.data().key)
                });
            });
        return unsubscribe;
    },[]);

    useEffect(()=>{
        makeUpData();
    },[data],[partner],[count])

    useEffect(()=>{
        console.log('PARTNER できたみたい！',partner)
        makeUpData()
    },[partner])

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
                if(doc.data().status){
                    console.log('DATA ON',doc.data())
                    doc.data().member.forEach((elem)=>{
                        const partnerId = []
                        if(currentUser.uid!==elem.id){
                            partnerId.push({
                                id:elem.id,
                            });
                        }
                        if(partnerId.length!==0){
                            console.log('PRTNER ID　取れたよ！',partnerId);
                            getPartnerRef(partnerId);
                        }
                        console.log('ここまできたよ！')
                    });
                    getRoomContents(key);
                    setCount(count+1)
                }
            });
        });
    }

    function getRoomContents(key){
        const room = [];
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`talkRooms`);
        ref.doc(key)
            .onSnapshot((snapShot)=>{
                const oneData = []
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
                oneData.push(room)
                setData(oneData)
                console.log('DATA 作れたよ！',data)
            });
    };


    function getPartnerRef(ids){
        console.log('PARTNER のデータ取りに行くよ！')
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
                        if(user.length!==0){
                            console.log('PARTNER 作ったよ！',user)
                            setPartner(user)
                            makeUpData()
                        }else{
                            console.log('PARTNER　作れてないよ！？',userInfo)
                        }
                    });
                });
            })
    }

    const renderDate = [];

    function makeUpData(){
        if(data.length==0||partner.length==0){
            console.log('なんかまだ足りてないみたい…',partner,data)
            return null
        }
        data.forEach((elem,index)=>{
            if(renderDate.length!==0){
                if(renderDate[index].img==partner[index].img){
                    console.log('データが重複してる！')
                }
            }else{
                renderDate.push({
                    name:partner[index].name,
                    message:elem,
                    img:partner[index].img,
                })
            }
        })
        console.log('RENDERDATA * ',renderDate)
        setPerfectData(renderDate)
        setMount(true)
    }

    const isFocused = useIsFocused();

    const TalkElement=({item})=>{
        const message = item.message[0].message;
        const date = format(item.message[0].date,'MM/dd')
        const key = item.message[0].key
        return (
            <TouchableOpacity
                onPress={()=>
                    navigation.navigate(
                        'OfficialTalkBoard',{key:key}
                        )}
            >
                <View style={styles.messageListElement}>
                    <View>
                        <Image source={{uri:item.img}} style={styles.image}/>
                    </View>
                    <View style={styles.messageInner}>
                        <View style={styles.messageTextBox}>
                            <View style={styles.nameBox}>
                                <Text style={styles.name}>{item.name}</Text>
                            </View>
                            <View style={styles.messageBox}>
                                <Text style={styles.message}>{message}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.dateBox}>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                        <View style={styles.messageCountArea}>
                            <View style={item.message[0].unReads===0?{}:styles.messageCountBox}>
                                <Text style={styles.messageCount}>{item.message[0].unReads===0?'':item.message[0].unReads}</Text>
                            </View>
                        </View>
                </View>
            </TouchableOpacity>
        )
    }

    if(perfectData.length==0){
        return<View><Text></Text></View>
    }

    if(!isFocused){
        return(
            <View>
                <Text></Text>
            </View>
        )
    }else{
        if(data.length==0||partner.length==0){
            return(<View><Text>aaa</Text></View>)
        }
        return(
        <View>
            <View style={styles.messageList}>
                <FlatList
                data={perfectData}
                renderItem={TalkElement}
                />
            </View>
        </View>
        );
    };
};

const styles = StyleSheet.create({
    messageList:{
        marginTop:90
    },
    messageListElement:{
        position:'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 19,
    },
    image:{
        width: 55,
        height: 57.78,
        borderRadius: 50,
    },
    messageInner:{
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
        paddingLeft:10,
        flex:1,
    },
    messageTextBox:{
    },
    nameBox:{

    },
    name:{
        fontSize: 18,
    },
    messageBox:{
        width:250,
        height:30,
    },
    message:{
        fontSize:15,
        color:'rgba(0,0,0,0.50)',
    },
    dateBox:{
        textAlign: 'right',
    },
    date:{
        fontSize:16,
    },
    messageCountArea:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:5,
    },
    messageCountBox:{
        flexDirection:'row',
        justifyContent:'center',
        textAlign:'center',
        backgroundColor:'tomato',
        width:23,
        height:23,
        borderRadius:20,
        textAlign:'auto'
    },
    messageCount:{
        fontSize:15,
        color:'#ffffff'
    }
})

