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
import firebase from 'firebase'

export default function(props){
    const navigation = useNavigation();
    return <LogIn {...props} navigation={navigation}/>
}

class LogIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    toHomeScreen = () =>{
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then((userCredential)=>{
            const {user} = userCredential;
            console.log(user.uid);
            const {navigation}  = this.props;
            navigation.reset({
                index:0,
                routes: [{name:'Home'}]
            });
        })
        .catch((error)=>{
            Alert.alert(error.code)
        })
    }
    toSignInScreen = () => {
        const {navigation} = this.props;
        navigation.reset({
            index:0,
            routes: [{name:'SignIn'}]
        });
    }
    handleEmail = (text) =>{
        this.setState({email:text})
    }
    handlePassWord = (text) => {
        this.setState({password:text})
    }
    render(){
        return(
            <View style={styles.fill}>
                <View style={styles.inner}>
                    <View style={styles.titleComponent}>
                        <Text style={styles.title}>ログイン</Text>
                    </View>
                    <View>
                        <TextInput
                            placeholder='email'
                            style={styles.input}
                            onChangeText={this.handleEmail}
                        />
                        <TextInput
                            placeholder='password'
                            style={styles.input}
                            onChangeText={this.handlePassWord}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.toHomeScreen}
                    >
                        <View style={styles.buttobContainer}>
                            <Text style={styles.buttonLabels}>送信</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.toSignInScreen}
                    >
                        <View>
                            <Text style={styles.footerText}>新規登録</Text>
                        </View>
                    </TouchableOpacity>
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
    }
})
