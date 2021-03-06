import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';

import data from '../../data/values';

export default function(props){
    const navigation = useNavigation()
    return <ValueScreen
     {...props}
     navigation={navigation}
     />
}

class ValueScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            data:data,
            count:0,
            level:0,
            prof:this.props.route.params.prof
        }
    }

    handleNext=()=>{
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`).doc(this.props.route.params.id);
        ref.update({
            appManagerKey:this.props.route.params.key
        })
        .catch((error)=>{console.log('ERROR : ',error)})
        ref.collection(`value`)
        .add({
            value:this.state.data
        })
        .then(()=>{
            this.addAppanager();
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    addAppanager(){
        const db = firebase.firestore();
        const docRef = db.collection(`AppManager/${this.state.prof.gender}/${this.state.prof.address}`).doc(this.props.route.params.key);
        docRef.update({
            value:this.state.level,
            wait:false,
            search:false
        })
        .then(()=>{
            const {navigation} = this.props;
            navigation.navigate('UploadPhoto',{id:this.props.route.params.id});
        })
        .catch((error)=>{
            console.error(error)
        });
    };

    render(){
        if(this.state.count<100){
            return(
                <View style={styles.fill}>
                    <View style={styles.inner}>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>?????????</Text>
                        </View>
                        <View style={styles.cardComponentView}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({count:this.state.data[this.state.count].type[0].relate, level:this.state.level+this.state.data[this.state.count].type[0].n})
                                    this.state.data[this.state.count].type[0].status=true
                                    this.state.data[this.state.count].status=true
                                }}
                            >
                                <View style={styles.card}>
                                    <Text style={styles.cardText}>{this.state.data[this.state.count].type[0].type}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.questionTextView}>
                                <Text???style={styles.questionText}>?????? : {this.state.data[this.state.count].title}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({count:this.state.data[this.state.count].type[1].relate, level: this.state.level + this.state.data[this.state.count].type[1].n})
                                    this.state.data[this.state.count].type[1].status=true
                                    this.state.data[this.state.count].status=true
                                }}
                            >
                                <View style={styles.card}>
                                    <Text>{this.state.data[this.state.count].type[1].type}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }else{
            return(
                <View style={styles.fill}>
                    <TouchableOpacity
                        onPress={this.handleNext}
                    >
                        <View style={styles.inner}>
                            <View style={styles.titleClearView}>
                                <Text style={styles.title}>????????????????????????????????????</Text>
                                <Text style={styles.title}>?????????????????????????????????????????????(???)</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
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
        marginVertical:10,
    },
    titleView:{
        marginBottom:30,
        marginHorizontal:10,
    },
    titleClearView:{
        flexDirection:'column',
        justifyContent:'center',
        width:'80%',
        height:'90%'
    },
    title:{
        fontWeight:'bold',
        fontSize:27
    },
    cardComponentView:{
        height:'90%',
        marginBottom:10,
        flexDirection:'column',
        justifyContent:'space-around'
    },
    card:{
        paddingVertical:'30%',
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'tomato'
    },
    questionTextView:{
        marginHorizontal:10,
    },
    questionText:{

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
