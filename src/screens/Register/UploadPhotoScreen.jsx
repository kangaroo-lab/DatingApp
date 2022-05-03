import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useNavigation} from '@react-navigation/native';

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
            ]
        }
    }

    pickImage = async () => {
        if(this.state.count<1){
            this.setState({photoAdd:true})
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
            this.setState({photo:result.uri});
            }
        }else{
            console.log('clear')
            const {navigation} = this.props;
            navigation.navigate('Drawer')
        }
    };

    render(){
        if(this.state.photoAdd){
            return(
                <View style={styles.fill}>
                    <View style={styles.inner}>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>写真の追加</Text>
                        </View>
                        <View style={styles.photoUploadComponentView}>
                            <TouchableOpacity>
                                <View style={styles.photoUploadComponent}>
                                    <View style={styles.photoUploadView}>
                                        <Image
                                            style={styles.photo}
                                            source={this.state.photo?{uri:this.state.photo}:require('../../img/face_img.png')}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.twoButtonView}>
                            <TouchableOpacity
                                onPress={this.pickImage}
                            >
                                <View style={[styles.goNextButton,{marginVertical:15}]}>
                                    <Text style={styles.buttonLabel}>変更する</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>this.setState({photoAdd:false,count:this.state.count+1})}
                            >
                                <View style={[styles.goNextButton,{marginVertical:15}]}>
                                    <Text style={styles.buttonLabel}>確定する</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        else{
            return(
                <View style={styles.fill}>
                    <View style={styles.inner}>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>写真の追加</Text>
                        </View>
                        <View style={styles.photoUploadComponentView}>
                            <TouchableOpacity>
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
                                onPress={this.pickImage}
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
        height:'80%',
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
        height:'80%',
        width:'80%',
        backgroundColor:'tomato',
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
