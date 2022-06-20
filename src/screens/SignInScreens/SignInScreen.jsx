import React,{Component} from 'react';
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
import { AntDesign } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function(props){
    const navigation = useNavigation();
    return <SignIn {...props} navigation={navigation}/>
}

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
        }
    }
    AppleSignInView = () => {
        const nonceString = this.nonceGen(32);
        return (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={styles.snsSignInButton}
            onPress={() => {
              try {
                console.log('ウェーイ！')
                AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                  ],
                  state: nonceString
                }).then(result => {
                　console.log('RESULT IS ',result)
                  let provider = new firebase.auth.OAuthProvider("apple.com");
                  let credential = provider.credential({
                    idToken: result.identityToken,
                    rawNonce: nonceString
                  });
                  firebase
                    .auth()
                    .signInWithCredential(credential)
                    .catch(error => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      console.log("firebase auth failed with Apple Sign In");
                      console.log(errorMessage);
                    });
                  // setSignInStatus(true);認証が終わったら状態変更する何か
                  const {navigation} = this.props;
                  navigation.reset({
                      index:0,
                      routes: [{name:'Gender'}]
                  });

                });
              } catch (e) {
                if (e.code === "ERR_CANCELED") {
                  // handle that the user canceled the sign-in flow
                  console.log('CANCELED')
                } else {
                  // handle other errors
                  console.log('ERROR')
                }
              }
            }}
          />
        );
      };

      nonceGen(length) {
        let result = "";
        let characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

    GoogleSignIn =()=> {
        console.log('Google サインイン')
    }
    AppleSignIn = () => {
        console.log('Apple サインイン')
    }

    toHomeScreen = () =>{
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=>{
            const {navigation} = this.props;
            navigation.reset({
                index:0,
                routes: [{name:'Gender'}]
            });
        })
        .catch((error)=>{
            console.log(error.code, error.message)
            Alert.alert(error.code)
        })
    }
    toLogInScreen = () => {
        const {navigation} = this.props;
        navigation.reset({
            index:0,
            routes: [{name:'LogIn'}]
        });
    }
    handleEmail = (text) => {
        this.setState({email:text})
    }
    handlePassword = (text) => {
        this.setState({password:text})
    }
    render(){
        return(
            <View style={styles.fill}>
                <View style={styles.inner}>
                    <View style={styles.titleComponent}>
                        <Text style={styles.title}>サインイン</Text>
                    </View>
                    <View>
                        <TextInput
                            placeholder='email'
                            style={styles.input}
                            onChangeText={this.handleEmail}
                            keyboardType='email-address'
                            autoCapitalize={false}
                        />
                        <TextInput
                            placeholder='password'
                            style={styles.input}
                            onChangeText={this.handlePassword}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.toHomeScreen}
                        disabled={this.state.email&&this.state.password?false:true}
                    >
                        <View style={styles.buttobContainer}>
                            <Text style={styles.buttonLabels}>送信</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.toLogInScreen}
                    >
                        <View>
                            <Text style={styles.footerText}>ログイン</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.snsButtonArea}>
                        <TouchableOpacity
                            onPress = {() => this.GoogleSignIn()}
                        >
                            <View style={[styles.snsSignInButton,{backgroundColor:'#fff'}]}>
                                <AntDesign name="google" size={24} color="black" />
                                <View style={styles.snsButtonTextArea}>
                                    <Text style={styles.snsButtonText}>Googleでサインイン</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <this.AppleSignInView/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fill:{
        flex:1,
    },
    inner:{
        paddingHorizontal:27,
        paddingVertical:24,
    },
    title:{
        fontSize:24,
        lineHeight:32,
        fontWeight:'bold',
        marginBottom:24
    },
    input:{
        fontSize:16,
        height:48,
        borderColor:'#DDDDDD',
        backgroundColor:'#ffffff',
        borderWidth:1,
        paddingHorizontal:8,
        marginBottom:16
    },
    buttobContainer:{
        backgroundColor:'#6FCBFF',
        borderRadius:4,
        alignSelf:'flex-start',
        marginBottom:24
    },
    buttonLabels:{
        fontSize:16,
        lineHeight:32,
        color:'#ffffff',
        paddingHorizontal:32,
        paddingVertical:8,
    },
    footerText:{
        fontSize:14,
        lineHeight:24,
        color:'#6FCBFF'
    },
    snsButtonArea:{
        marginTop:20,
    },
    snsSignInButton:{
        marginTop:20,
        height:48,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20
    },
    snsButtonTextArea:{
        marginLeft:20
    },
    snsButtonText:{
        textAlign:'left',
        fontSize:18
    }
})
