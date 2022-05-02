import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';

import userInfo from '../../data/userInfo';

export default function (props){
    const navigation = useNavigation();
    return <AdressScreen {...props} navigation={navigation}/>
}

class AdressScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            data:userInfo.info[3].list,
            address:''
        }
    }

    toBirthDay=()=>{
        const {currentUser} = firebase.auth();
        const db = firebase.firestore();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`).doc(this.props.route.params.id);
        ref.update({
            address:this.state.address
        })
        .then((docRef)=>{
            console.log('Created', docRef)
            const {navigation} = this.props;
            navigation.navigate('BirthDay',{id:this.props.route.params.id})
        })
        .catch((error)=>{
            console.log('Error : ',error)
        })
    }

    _AddressBox=({item})=>{
        return(
            <RadioButton.Item
                value={item}
                label={item}
                position='leading'
                status={this.state.address===item?'checked':'unchecked'}
                onPress={()=>{
                    this.setState({address:item})
                    console.log(item===this.state.address?'true':'false')
                }
                }
                labelStyle={[{
                    fontSize:25,
                    fontWeight:'bold',
                    textAlign:'left'
                }]}
            />
        )
    }

    render(){
        return(
            <View style={styles.fill}>
                <View style={styles.inner}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>居住地</Text>
                    </View>
                    <View style={styles.addressComponentView}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item) => item.toString()}
                            renderItem={this._AddressBox}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            onPress={this.toBirthDay}
                            disabled={!this.state.address}
                        >
                            <View style={this.state.address?styles.goNextButton:styles.goNextButtonDisabled}>
                                <Text style={styles.buttonLabel}>次へ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
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
    addressComponentView:{
        height:'80%',
        marginBottom:10

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
