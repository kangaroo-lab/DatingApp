import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';

import firebase from 'firebase';

import userInfo from '../../data/userInfo';

export default function(props){
    const navigation = useNavigation()
    return <PutBasicInfo {...props} navigation={navigation}/>
}

class PutBasicInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            height:'',
            bodyShape:'',
            schoolHistory:'',
            income:'',
            holiday:'',
            smoke:'',
            active:false,
            data:[
                userInfo.info[8],userInfo.info[9],userInfo.info[10],userInfo.info[13],userInfo.info[14],userInfo.info[16]
            ]
        }
    }

    handleNext=()=>{
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`)
        let DocId;
        db.collection(`users/${currentUser.uid}/userInfo`).get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                console.log(`${doc.id}`);
                DocId=`${doc.id}`
                ref.doc(`${doc.id}`).update({
                    height:{
                        title:'height',
                        value:this.state.height,
                    },
                    bodyShape:{
                        title:'bodyShape',
                        value:this.state.bodyShape,
                    },
                    schoolHistory:{
                        title:'schoolHistory',
                        value:this.state.schoolHistory
                    },
                    income:{
                        title:'income',
                        value:this.state.income
                    },
                    holiday:{
                        title:'holiday',
                        value:this.state.holiday
                    },
                    smoke:{
                        title:'smoke',
                        value:this.state.smoke
                    },
                })
                .then(()=>{
                    console.log('Create!')
                })
                .catch((error)=>{
                    console.log(error)
                })
            });
            const {navigation} = this.props;
            navigation.navigate('HobbyCategory',{id:DocId})
        })
    }

    renderFlatList=({item})=>{
        return(
            <View style={styles.basicInfoComponent}>
                <View style={styles.basicInfoTitleView}>
                    <Text style={styles.basicInfoTitle}>{item.title}</Text>
                </View>
                <View style={styles.basicInfoSelectView}>
                    <TouchableOpacity>
                        <RNPickerSelect
                            style={styles.basicInfoSelect}
                            placeholder={{label:'未設定',value:0}}
                            items={item.list.map((data) => {
                                return ({label:data, value:data})
                            })}
                            onValueChange={(value) =>{
                                if(item.id==8){
                                    this.setState({height:value})
                                }else if(item.id==9){
                                    this.setState({bodyShape:value})
                                }else if(item.id==10){
                                    this.setState({schoolHistory:value})
                                }else if(item.id==13){
                                    this.setState({income:value})
                                }else if(item.id==14){
                                    this.setState({holiday:value})
                                }else if(item.id==16){
                                    this.setState({smoke:value})
                                }
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render(){
        return(
            <View style={styles.fill}>
                <View style={styles.inner}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>プロフィール入力</Text>
                    </View>
                    <View style={styles.basicInfoComponentView}>
                        <FlatList
                            data={this.state.data}
                            renderItem={this.renderFlatList}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.handleNext}
                        disabled={!this.state.height||!this.state.bodyShape||!this.state.schoolHistory||!this.state.income||!this.state.holiday||!this.state.smoke}
                    >
                        <View style={
                            !this.state.height||!this.state.bodyShape||!this.state.schoolHistory||!this.state.income||!this.state.holiday||!this.state.smoke?styles.goNextButtonDisabled:styles.goNextButton
                            }
                        >
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
    basicInfoComponentView:{
        height:'80%',
        marginBottom:10,
        flexDirection:'column',
        justifyContent:'center',
        marginHorizontal:20,
    },
    basicInfoComponent:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:8,
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgray'
    },
    basicInfoTitleView:{

    },
    basicInfoTitle:{
        fontSize:20,
        fontWeight:'bold'
    },
    basicInfoSelectView:{
    },
    basicInfoSelect:{
        fontSize:20,
        fontWeight:'bold'
    },
    buttonView:{
        flexDirection:'row',
        justifyContent:'center'
    },
    goNextButton:{
        backgroundColor:'#6FCBFF',
        borderRadius:4,
        alignSelf:'center',
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
