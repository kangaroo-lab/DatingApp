import React from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    Button
} from 'react-native';
import firebase from 'firebase'
import { Component } from 'react';
import {useNavigation} from '@react-navigation/native';

import SendMessage from '../../../components/sendMessage';
import CatchMessage from '../../../components/catchMessage';

export default function(props){
    const navigation = useNavigation();
    return <GroupBoard {...props} navigation={navigation}/>
}


const KEYBOARD_VERTICAL_OFFSET = 90 + StatusBar.currentHeight;

class GroupBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            members:[],
            text:"",
            name:"",
            inputHeight:0,
            key:'',
            address:''
        }
    }

    async componentDidMount(){
        await this.getRef();
        this.props.navigation.setOptions({
            headerRight:()=>(
                <Button
                 onPress={()=>{
                   this.props.navigation.navigate('Top',{key:this.state.key,address:this.state.address})
                 }}
                 title="invite"
                />
             ),
        })
    }

    async componentDidUpdate(){
        // this.addTalkData()
    }

    async getRef(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`talkRooms`).doc(this.props.route.params.key);
        const members = [];
        const saveData = [];
        ref.get().then(async(doc)=>{
            const data = doc.data();
            await saveData.push(data.message);
            await saveData[0].forEach((elem)=>{
                elem.read.forEach((member)=>{
                    if(member.id==currentUser.uid){
                        member.read = true;
                    };
                });
            });
            console.log(data.address)
            members.push(data.member)
            await this.setState({data:saveData[0],members:members[0],key:data.appManagerKey,address:data.address});
            await this.updateRead();
            this.getUserRef();
        })
    }

    async updateRead(){
        if(this.state.data.length!==0){
            const db = firebase.firestore();
            const ref = db.collection(`talkRooms`).doc(this.props.route.params.key);
            ref.update({
                message:this.state.data
            });
        }else{
            console.log('error')
        }
    }

    async getUserRef(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`);
        ref.onSnapshot((snapShot)=>{
            snapShot.forEach((doc)=>{
                this.setState({name:doc.data().name.value})
            });
        });
    }

    async updateTalkData(){
        const saveDate = [];
        const {currentUser} = firebase.auth();
        let flag = false;
        this.state.members.forEach((member)=>{
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
            message:this.state.text,
            time:new Date(),
            user:this.state.name,
            read:saveDate
        }
        this.state.data.unshift(newData)
        this.addTalkData();
    }

    addTalkData(){
        const db = firebase.firestore();
        const ref = db.collection(`talkRooms`).doc(this.props.route.params.key);
        ref.update({
            message:this.state.data
        })
        .then(()=>{
            console.log('\n\n\n\n\nUpdate!!')
        })
        .catch(()=>{
            console.error('\n\n\n\n\nERROR:Something wrong is happened!')
        })
    }

    GetTalkElem=({item})=>{
        if(item.user==this.state.name){
            return <SendMessage message={item.message}/>
        }else{
            return <CatchMessage message={item.message}/>
        }
    }

    render(){
        // return(<View/>)
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
                data={this.state.data}
                renderItem={this.GetTalkElem}
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
                                    style={styles.textInput,{height:this.state.inputHeight}}
                                    value={this.state.text}
                                    placeholder='メッセージを入力'
                                    onChangeText={(text)=>{this.setState({text:text});}}
                                    onContentSizeChange={(event) => {
                                        this.setState({inputHeight:event.nativeEvent.contentSize.height});
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.contentsView}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({text:''})
                                    this.updateTalkData()
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
        )
    }
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
