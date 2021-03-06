import React,{Component,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Vibration
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';
import * as Haptics from 'expo-haptics';

export default function (props){
    const navigation = useNavigation();

    useEffect(()=>{
        const sleep = () => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(1)
              }, 1000)
            })
          }
        const db = firebase.firestore();
        const unsubscribe = firebase.auth().onAuthStateChanged(async(user)=>{
            console.log(user)
            if(user){
                if(user.multiFactor.enrolledFactors.length==0 || user.multiFactor.enrolledFactors.includes('photo')){
                    console.log('HERE ',user.uid)
                    const ref = db.collection(`users/${user.uid}/userInfo`);
                    await sleep()
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    navigation.reset({
                        index:0,
                        routes: [{name:'Drawer'}]
                    });
                }else if(!user.multiFactor.enrolledFactors.includes('Basic')){
                    navigation.reset({
                        index:0,
                        routes: [{name:'Gender'}]
                    });
                }else{
                    if(!user.multiFactor.enrolledFactors.includes('Hobby')){
                        navigation.reset({
                            index:0,
                            routes: [{name:'PutBasicInfo'}]
                        });
                    }else if(!user.multiFactor.enrolledFactors.includes('photo')){
                        navigation.reset({
                            index:0,
                            routes: [{name:'HobbyCategory'}]
                        })
                    }
                }
            }else{
                await sleep()
                navigation.reset({
                    index:0,
                    routes: [{name:'SignIn'}]
                })
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
                        {/* <Text>????????????</Text> */}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        this._handlePressToSignIn();
                    }}
                >
                    <View style={styles.button}>
                        {/* <Text>???????????????</Text> */}
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
