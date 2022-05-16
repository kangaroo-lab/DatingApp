import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';

export default function(props){
    const navigation = useNavigation();
    return <GenderScreen {...props} navigation={navigation}/>
}

class GenderScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            gender:''
        }
    }

    toPartnerGender = () =>{
        const {currentUser} = firebase.auth();
        const db = firebase.firestore();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`);
        ref.add({
            gender:this.state.gender
        })
        .then((docRef)=>{
            const {navigation} = this.props;
            navigation.navigate('PartnerGender',{id:docRef.id})
        })
        .catch((error)=>{
            console.log('Error',error)
        });
    }

    render(){
        return(
            <View style={styles.fill}>
                <View style={styles.container}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>性別</Text>
                    </View>
                    <View style={styles.genderComponentView}>
                        <RadioButton.Item
                            value='男'
                            label='男性'
                            position='leading'
                            status={this.state.gender==='男'?'checked':'unchecked' }
                            onPress={()=>{
                                this.setState({gender:'男'})
                            }}
                            labelStyle={[{
                                fontSize:25,
                                fontWeight:'bold',
                                textAlign:'left'
                            }]}
                        />
                        <RadioButton.Item
                            value='女'
                            label='女性'
                            position='leading'
                            status={this.state.gender==='女'?'checked':'unchecked' }
                            onPress={()=>{
                                this.setState({gender:'女'})
                            }}
                            labelStyle={[{
                                fontSize:25,
                                fontWeight:'bold',
                                textAlign:'left'
                            }]}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.toPartnerGender}
                        disabled={!this.state.gender}
                    >
                        <View style={this.state.gender?styles.goNextButton:styles.goNextButtonDisabled}>
                            <Text style={styles.buttonLabel}>次へ</Text>
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
    genderComponentView:{
        marginBottom:20,
        width:150
    },
    genderChoose:{
        fontSize:25,
        fontWeight:'bold',
    },
    genderTitleComponentView:{
        marginBottom:10
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
