import React,{useState,useEffect} from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';

import firebase from 'firebase';

import SendMessage from '../../../components/sendMessage';
import CatchMessage from '../../../components/catchMessage';

//navigationのheaderを無視するための数字！
const KEYBOARD_VERTICAL_OFFSET = 90 + StatusBar.currentHeight;

export default function OfficialTalkBoard(props){
    const {key} = props.route.params;
    const [data, setData] = useState([])
    const [name, setName] = useState()
    const [member,setMember] = useState([])

    const [inputHeight, setInputHeight] = useState(0);
    const [bodyText, setBodyText] = useState('');

    useEffect(()=>{
        let unsubscribe = joinTheRoom()
        return unsubscribe;
    },[]);

    useEffect(()=>{
        if(data.length!==0){
            const db = firebase.firestore();
            const ref = db.collection(`talkRooms`).doc(key);
            console.log('data is ',data)
            ref.update({
                message:data
            })
        }
    },[data])

    function joinTheRoom(){
        const db = firebase.firestore();
        const ref = db.collection(`talkRooms`).doc(key);
        const {currentUser} = firebase.auth();
        const members = [];
        const saveData = [];
        ref.onSnapshot((snapShot)=>{
            saveData.push(snapShot.data().message)
            saveData[0].forEach((elem)=>{
                elem.read.forEach((member)=>{
                    if(member.id==currentUser.uid){
                        member.read = true;
                    };
                });
            });
            members.push(snapShot.data().member)
            setData(saveData[0]);
            setMember(members[0])
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

    function addTalkData(){
        const db = firebase.firestore();
        const ref = db.collection(`talkRooms`).doc(key);
        ref.update({
            message:data
        })
        .then(()=>{
            console.log('\n\n\n\n\nUpdate!!')
        })
        .catch(()=>{
            console.error('ERROR:Something wrong is happened!')
        })
    };

        function updateTalkData(){
            const saveDate = [];
            const {currentUser} = firebase.auth();
            let flag = false;
            member.forEach((member)=>{
                if(member.id==currentUser.uid){
                    flag=true
                }
                saveDate.push({
                    id:member.id,
                    read:flag
                });
                flag=false;
            });
            const newData={
                message:bodyText,
                time:new Date(),
                user:name,
                read:saveDate
            }
            data.unshift(newData)
            addTalkData(newData)
        };


        const GetTalkElem=({item})=>{
            if(item.user==name){
                return <SendMessage message={item.message}/>
            }else{
                return <CatchMessage message={item.message}/>
            }
        }


        if(data.length==0){
            return<View></View>
        }

        return(
        <View style={styles.container}>
            {/* Talk画面全体の表示 */}
            <KeyboardAvoidingView
                behavior='padding'
                style={styles.TalkContainer}
                keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
            >
            <FlatList
                removeClippedSubviews={false}
                data={data}
                renderItem={GetTalkElem}
                contentContainerStyle={{paddingBottom:20}}
                inverted
                keyExtractor={(item)=>(item.id)}
            />
                <View>
                    <View style={styles.footerContainer}>
                        <View style={styles.contentsView}>
                            <TouchableOpacity>
                                <View>
                                    <Image source={require('../../../img/camera.png')} style={styles.image}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contentsView}>
                            <View style={styles.textInputView}>
                                <TextInput
                                    multiline={true}
                                    style={styles.textInput,{height:inputHeight}}
                                    value={bodyText}
                                    placeholder='メッセージを入力'
                                    onChangeText={(text)=>{setBodyText(text);}}
                                    onContentSizeChange={(event) => {
                                        setInputHeight(event.nativeEvent.contentSize.height);
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.contentsView}>
                            <TouchableOpacity
                                onPress={()=>{
                                    setBodyText(``)
                                    updateTalkData()
                                }}
                            >
                                <View style={styles.button}>
                                    <Image source={require('../../../img/submit.png')}style={styles.submit}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </KeyboardAvoidingView>
        <View style={styles.footerFill}/>
    </View>
    );
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
    },
    footer:{
        flexDirection:'row',
        justifyContent:'center'
    },
    footerContainer:{
        height:50,
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical:10,
        paddingHorizontal:20,
    },
    contentsView:{
        flexDirection:'column',
        justifyContent:'flex-end'
    },
    image:{
        width: 30,
        height:30,
    },
    submit:{
        width: 28,
        height:28,
    },
    textInputView:{
        width:250,
        marginHorizontal:20,
        paddingHorizontal:10,
        borderRadius:20,
        backgroundColor:'rgba(0,0,0,0.05)',
        paddingVertical:5,
    },
    textInput:{
        fontSize:15,
    },
});
