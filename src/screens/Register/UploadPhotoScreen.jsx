import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';

export default function(props){
    const navigation=useNavigation()
    return <UploadPhotoScreen {...props} navigation={navigation}/>
}

class UploadPhotoScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            photo:'',
            photoAdd:false,
            count:0,
            buttonText:[
                '写真をアップロード',
                '決定'
            ],
            imgUrl: '',
            phrase: '',
            addedPost: [],
        }
    }

    async onPressAdd(){
        await this.uploadPostImg();
        console.log(await this.state)
        const { imgUrl, phrase, postIndex } = await this.state;
        console.log('なんか知らんけど追加してるやつな\nURL',imgUrl,'\nPHRASE',phrase,"\nPOSTINDEX",postIndex)
        this.setState(
            {
                addedPost:[
                    {
                        imgUrl,
                        phrase,
                        postIndex,
                    },
                ],
            },
        )
        this.uploadPost(this.state.imgUrl,this.state.phrase,this.state.postIndex)
    }


    onAddImagePress = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(this.state.photoAdd==true){
            console.log('true')
        }else{
            console.log('false',this.state)
            this.setState({photoAdd:true})
        }
        if(this.state.count<=1){
            if(status==='granted'){
                // No permissions request is necessary for launching the image library
                let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                });
                if (!result.cancelled) {
                    const actions = []
                    actions.push({ resize:{ width:350 } })
                    const manipulatorResult = await ImageManipulator.manipulateAsync(
                        result.uri,
                        actions,
                        {
                            compress: 0.4,
                        },
                    );
                    if(this.state.photoAdd){
                        console.log(manipulatorResult.uri)
                    }
                    this.setState({photo: manipulatorResult.uri, imgUrl: manipulatorResult.uri})
                }
            }
        }else{
            console.log('clear')
            this.onPressAdd()
        }
    };

    uploadPostImg = async () => {
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const metadata = {
            contentType: 'image/jpeg',
        };
        const postIndex = Date.now().toString();
        const storage = firebase.storage();
        const imgURI = this.state.imgUrl;
        const response = await fetch(imgURI);
        const blob = await response.blob();
        const uploadRef = storage.ref(`users/${currentUser.uid}/images`).child(`${postIndex}`);

        await uploadRef.put(blob, metadata).catch((e)=>{
            console.log(e.message)
            alert('画像の保存に失敗しました')
        });
        await uploadRef
            .getDownloadURL()
            .then((url)=>{
                this.setState({
                    imgUrl: url,
                    postIndex,
                })
            })
            .catch(()=>{
                console.error();
                alert('失敗しましたああああ');
            })
    }

    uploadPost(url, phrase, postIndex) {
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`).doc(this.props.route.params.id);
        ref.update({
             url,
             phrase,
             postIndex
         })
         .then(()=>{
            const {navigation} = this.props;
            navigation.navigate('Drawer')
         })
         .catch((e)=>{
             alert(e)
         })
    }

    render(){
        if(this.state.photoAdd){
            return(
                <View style={styles.fill}>
                    <View style={styles.inner}>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>写真の選択</Text>
                        </View>
                        <View style={styles.photoUploadComponentView}>
                            <TouchableOpacity>
                                <View style={styles.photoUploadComponent}>
                                    <View style={styles.photoUploadView}>
                                        <Image
                                            style={styles.photo}
                                            source={this.state.photo?{uri:this.state.imgUrl}:require('../../img/face_img.png')}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.twoButtonView}>
                            <TouchableOpacity
                                onPress={this.onAddImagePress}
                            >
                                <View style={[styles.goNextButton,{marginVertical:15}]}>
                                    <Text style={styles.buttonLabel}>変更する</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>
                                    console.log(this.state.photo),
                                    this.setState({photoAdd:false,count:this.state.count+1})
                                }
                            >
                                <View style={[styles.goNextButton,{marginVertical:15}]}>
                                    <Text style={styles.buttonLabel}>確定する</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }else{
            return(
                <View style={styles.fill}>
                    <View style={styles.inner}>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>写真の追加</Text>
                        </View>
                        <View style={styles.photoUploadComponentView}>
                            <TouchableOpacity
                                onPress={this.onAddImagePress}
                            >
                                <View style={styles.photoUploadComponent}>
                                    <View style={styles.photoUploadView}>
                                        <Image
                                            style={styles.photo}
                                            source={this.state.photo?{uri:this.state.photo}:require('../../img/face_img.png')}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.onAddImagePress}
                            >
                                <View style={[styles.goNextButton,{marginVertical:15}]}>
                                    <Text style={styles.buttonLabel}>{this.state.buttonText[this.state.count]}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    fill:{
        flex:1,
    },
    inner:{
        marginHorizontal:10,
        marginVertical:10,
    },
    titleView:{
        marginBottom:30
    },
    title:{
        fontWeight:'bold',
        fontSize:27
    },
    photoUploadComponentView:{
        height:'70%',
        marginBottom:10,
        flexDirection:'column',
        justifyContent:'center'
    },
    photoUploadComponent:{
        flexDirection:'row',
        justifyContent:'center',
    },
    photoUploadView:{
        height:170,
        width:170,
        borderRadius:100,
        backgroundColor:'lightgray',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'darkgray'
    },
    photo:{
        height:150,
        width:150,
        borderRadius:100,
    },
    photoConfirmComponentView:{
        marginBottom:10,
        height:'70%',
        width:'80%',
    },
    twoButtonView:{
        justifyContent:'space-around',
        flexDirection:'row'
    },
    buttonView:{
        flexDirection:'row',
        justifyContent:'center'
    },
    goNextButton:{
        backgroundColor:'#6FCBFF',
        borderRadius:4,
        alignSelf:'center',
        marginBottom:24,
    },
    goNextButtonDisabled:{
        backgroundColor:'lightgray',
        borderRadius:4,
        alignSelf:'center',
    },
    buttonLabel:{
        fontSize:16,
        lineHeight:32,
        color:'#ffffff',
        paddingHorizontal:32,
        paddingVertical:8,
    }
})
