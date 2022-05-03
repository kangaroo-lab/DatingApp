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

export default function(props){
    const navigation = useNavigation();
    return <SignIn {...props} navigation={navigation}/>
}

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }
    toHomeScreen = () =>{
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then((userCredential)=>{
            const {user} = userCredential;
            console.log(user.uid);
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
