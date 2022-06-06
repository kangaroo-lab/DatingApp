import React from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import firebase from 'firebase';
import { format } from 'date-fns';
import { Component } from 'react';


export default function(){
    return <GroupList/>
}
class GroupList extends Component{
    constructor(props){
        super(props);
        this.state={
            messages:[],
            partners:[]
        }
    }

    //グループデータのリスト化
    async getData(){
        await this.getRef().onSnapshot(async(snapShot)=>{
            const arr = []
            snapShot.forEach((docs)=>{
                if(docs.data().group){
                    console.log('来ましたわ！！',docs.data().partner)
                    arr.push(docs.data().key)
                }else{
                    console.log('はいビッチ！！',docs.data().partner)
                }
            });
            await this.getRooms(arr)
        });
    };

    getRef(){
        const db = firebase.firestore()
        const {currentUser} = firebase.auth()
        const ref = db.collection(`users/${currentUser.uid}/talkLists`);
        return ref;
    };

    async getRooms(keys){
        const arr = [];
        const room = [];
        const {currentUser} = firebase.auth();
        const db = firebase.firestore();
        keys.forEach((key)=>{
            const members = [];
            const ref = db.collection('talkRooms').doc(key);
            ref
            .get()
            .then(async(data)=>{
                const message = data.data().message
                let i=0
                message.forEach((elem)=>{
                    elem.read.forEach((e)=>{
                        if(e.id==currentUser.uid&&!e.read){
                            i++
                        };
                    });
                    room.push({
                        message:elem.message,
                        date:elem.time.toDate(),
                        key:key,
                        unReads:i
                    })
                })
                data.data().member.forEach((mem)=>{
                    if(mem.id!=currentUser.uid){
                        members.push(mem);
                    };
                });
                arr.push(members)
                this.setState({messages:room})
                await this.getPartners(arr)
            })
        })
    }

    async getPartners(twoDLists){
        const db = firebase.firestore();
        const newArr = []
        twoDLists.forEach((ids)=>{
            const newArr4T = []
            let i = 0;
            ids.forEach((id)=>{
                db.collection(`users/${id.id}/userInfo`)
                .onSnapshot((snapShot)=>{
                    snapShot.forEach((doc)=>{
                        const data = doc.data()
                        newArr4T.push({
                            idx: i,
                            name:data.name.value,
                            img:data.url
                        });
                    })
                    newArr.push(newArr4T);
                    this.setState({partners:newArr})
                });
            });
        });
    };

    makeUpData(){
        const messages = this.state.messages;
        const partners = this.state.partners;
        const result = []
        messages.forEach((item,idx)=>{
            console.log(item.unReads)
            result.push({
                name:partners[idx],
                message:item.message,
                date:format(item.date,'MM/dd'),
                key:item.key,
                unReads:item.unReads
            })
        })
        return result
    }

    _renderNames = ({item}) => {
        return(
            <Text style={styles.name}>{item.name}</Text>
        )
    }

    _renderImg = ({item}) => {
        return(
            <Image source={{uri:item.img}} style={styles.image}/>
        )
    }

    _renderItems = ({item}) =>{
        return(
            <TouchableOpacity>
                <View style={styles.messageListElement}>
                    <View>
                        <FlatList
                            data = {item.name}
                            renderItem = {this._renderImg}
                        />
                    </View>
                    <View style={styles.messageInner}>
                        <View style={styles.messageTextBox}>
                            <View style={styles.nameBox}>
                                <FlatList
                                    data = {item.name}
                                    renderItem = {this._renderNames}
                                />
                            </View>
                            <View style={styles.messageBox}>
                                <Text style={styles.message}>{item.message}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.dateBox}>
                        <Text style={styles.date}>{item.date}</Text>
                        <View style={styles.messageCountArea}>
                            <View style={item.unReads===0?{}:styles.messageCountBox}>
                                <Text style={styles.messageCount}>{item.unReads===0?'':item.unReads}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        if(this.state.messages.length==0||this.state.partners.length==0){
            this.getData()
            return<View><Text>AAAA</Text></View>
        }
        return(
                <View style={styles.messageList}>
                    <FlatList
                        data = {this.makeUpData()}
                        renderItem = {this._renderItems}
                    />
                </View>
        )
    }
}

const styles = StyleSheet.create({
    messageList:{
        ...StyleSheet.absoluteFillObject,
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
