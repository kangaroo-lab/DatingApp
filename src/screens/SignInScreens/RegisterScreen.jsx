import React,{Component,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import {useNavigation,StackActions, NavigationActions} from '@react-navigation/native';

import firebase from 'firebase';

import hobby from '../../data/hobbyCategory';
import value from '../../data/values';

export default function(props){
    const navigation = useNavigation();
    return<GoRegisterScreen {...props} navigation={navigation}/>
}

class GoRegisterScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            confirmAge:'',
            confirmAll:'',
        }
    }

    register=()=>{
        const {currentUser} = firebase.auth();
        const db = firebase.firestore();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`).doc(this.props.route.params.id);
        ref.update({
            AgreeToAge:this.state.confirmAge,
            AgereRules:this.state.confirmAll,
            hobby:hobby,
            value:value
        })
        .then(()=>{
            const {navigation} = this.props;
            navigation.reset({
                index:1,
                routes: [{name:'Start'}]
            });
        })
        .catch((error)=>{
            console.log('Error : ',error)
        })
    }

    render(){
        return(
            <View style={styles.fill}>
                <View style={styles.inner}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>Let's Start</Text>
                    </View>
                    <View　style={styles.confirmTextView}>
                        <RadioButton.Item
                            value='18歳以上'
                            label='満１８歳以上の独身でであることを誓約します'
                            position='leading'
                            status={this.state.confirmAge==='同意済'?'checked':'unchecked'}
                            onPress={()=>{
                                if(this.state.confirmAge==''){
                                    this.setState({confirmAge:'同意済'})
                                }else{
                                    this.setState({confirmAge:''})
                                }
                            }}
                            labelStyle={[{
                                fontSize:25,
                                textAlign:'left'
                            }]}
                        />
                        <RadioButton.Item
                            value='規約同意'
                            label='全ての規約に同意します'
                            position='leading'
                            status={this.state.confirmAll==='同意済'?'checked':'unchecked'}
                            onPress={()=>{
                                if(this.state.confirmAll==''){
                                    this.setState({confirmAll:'同意済'})
                                }else{
                                    this.setState({confirmAll:''})
                                }
                            }}
                            labelStyle={[{
                                fontSize:25,
                                textAlign:'left'
                            }]}
                        />
                    </View>
                    <TouchableOpacity
                        disabled={this.state.confirmAge&&this.state.confirmAll?false:true}
                        onPress={this.register}
                    >
                        <View style={this.state.confirmAge&&this.state.confirmAll?styles.goNextButton:styles.goNextButtonDisabled}>
                            <Text style={styles.buttonLabel}>登録する</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fill:{
        flex:1
    },
    container:{
        marginHorizontal:10,
        marginVertical:10
    },
    titleView:{
        marginBottom:30
    },
    title:{
        fontWeight:'bold',
        fontSize:27
    },
    goNextButton:{
        backgroundColor:'#6FCBFF',
        borderRadius:4,
        alignSelf:'center',
        marginBottom:24
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
