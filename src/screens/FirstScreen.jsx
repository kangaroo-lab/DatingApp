import React,{Component,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';

export default function (props){
    const navigation = useNavigation();



    useEffect(async()=>{
        const sleep = () => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(1)
              }, 1000)
            })
          }

        await sleep()
        const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                navigation.reset({
                    index:0,
                    routes: [{name:'Drawer'}]
                });
            }
        });
        return unsubscribe;
    },[]);

    return <FirstScreen {...props} navigation={navigation}/>
}

class FirstScreen extends Component{
    constructor(props){
        super(props);
    }

    _handlePressToLogin = () => {
        const {navigation} = this.props;
        navigation.reset({
            index:0,
            routes: [{name:'LogIn'}]
        })
    }

    _handlePressToSignIn = () => {
        const {navigation} = this.props;
        navigation.reset({
            index:0,
            routes: [{name:'SignIn'}]
        })
    }

    render(){
        return(
        <View style={styles.fill}>
            <Text style={styles.logo}>LOGO</Text>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    onPress={()=>{
                        this._handlePressToLogin();
                    }}
                >
                    <View style={styles.button}>
                        <Text>ログイン</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        this._handlePressToSignIn();
                    }}
                >
                    <View style={styles.button}>
                        <Text>サインイン</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    fill:{
        ...StyleSheet.absoluteFillObject,
        flex:1,
        justifyContent:'center',
        flexDirection:'column'
    },
    logo:{},
    button:{},
    buttonArea:{}
})
