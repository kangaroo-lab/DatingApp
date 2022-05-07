import React, { useState ,useEffect} from 'react';
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
import {string} from 'prop-types'
import firebase from 'firebase';

import SendMessage from '../../../components/sendMessage';
import CatchMessage from '../../../components/catchMessage';

//navigationのheaderを無視するための数字！
const KEYBOARD_VERTICAL_OFFSET = 90 + StatusBar.currentHeight;

export default function TalkBoard(props){
    //データの追加に伴って再レンダリングを行う
    const {key} = props.route.params;
    const [data,setData] = useState([]);
    const [name,setName] = useState();

    const [inputHeight, setInputHeight] = useState(0);
    const [bodyText, setBodyText] = useState('');


    useEffect(()=>{
        console.log('EFFECT')
        let unsubscribe = joinTheRoom()
        return unsubscribe;
    },[]);

    function joinTheRoom(){
        console.log('JOIN THE ROOM');
        const db = firebase.firestore();
        const ref = db.collection(`talkRooms`).doc(key);
        const saveData = [];
        ref.onSnapshot((snapShot)=>{
            saveData.push(snapShot.data().message)
            console.log(saveData[0])
            setData(saveData[0]);
        });
        getUserName();
    };

    function getUserName(){
        console.log('GET NAME');
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
        console.log('データが追加される前のデータ状態\n',data)
        ref.update({
            message:data
        })
        .then(()=>{
            console.log('データが追加された後のデータ状態\n',data)
            console.log('\n\n\n\n\nUpdate!!')
        })
        .catch(()=>{
            console.error('ERROR:Something wrong is happened!')
        })


    }

    function updateTalkData(){
        const newData={
            message:bodyText,
            time:new Date(),
            user:name
        }
        data.unshift(newData)
        addTalkData(newData)
    }

    const GetTalkElem=({item})=>{
        if(item.user==name){
            return <SendMessage message={item.message}/>
        }else{
            return <CatchMessage message={item.message}/>
        }
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
