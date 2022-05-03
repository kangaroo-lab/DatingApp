import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    FlatList
} from 'react-native';
import { Chip } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';

import data from '../../data/hobbyCategory';

export default function(props){
    const navigation = useNavigation()
    return <HobbyDetailScreen {...props} navigation = {navigation}/>
}

//データをchipsで表示できるように、改造
function fixData(data){
    let saveData = ''
    const result = []
    let newArray = []
    for(let i=0;i<data.length;i+=1){
        if(saveData.length<15){
            saveData+=data[i].title
            newArray.push(data[i])
        }else{
            //console.log(newArray)
            result.push(newArray)
            newArray=[]
            saveData=''
        }
    }
    return result
}

class HobbyDetailScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            count:0,
            data:this.props.route.params.data,
        }
    }

    handleNext=()=>{
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`)
        ref.doc(this.props.route.params.id).collection(`hobby`)
        .add({
            hobby:this.state.data
        })
        .then(()=>{
            const {navigation} = this.props;
            navigation.navigate('Value',{id:this.props.route.params.id})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    hobbyDetailChips=({item})=>{
        return(
            <Chip
                style={styles.hobbyDetailChips}
                selected={item.status}
                selectedColor={item.status?'tomato':'dimgray'}
                onPress={()=>{
                    if(!item.status){
                        item.status=true
                        this.setState({count:this.state.count+1})
                    }else{
                        item.status=false
                        this.setState({count:this.state.count-1})
                    }
                }}
            >
                {item.title}
            </Chip>
            )
    }

    hobbyDetailChipsColumnView=({item})=>{
        return(
            <View>
                <FlatList
                    data={item}
                    renderItem={this.hobbyDetailChips}
                    style={{flexDirection:'row',justifyContent:'flex-start',marginBottom:5}}
                />
            </View>
            )
    }

    hobbyDetailChipsComponentsView=({item})=>{
        if(item.status){
            return(
                <View>
                    <View style={styles.hobbyDetailChipsTitleView}>
                        <Text style={styles.hobbyDetailChipsTitle}>{item.title}</Text>
                    </View>
                    <FlatList
                        data={fixData(item.list)}
                        renderItem={this.hobbyDetailChipsColumnView}
                        style={{justifyContent:'flex-start',flexDirection:'column'}}
                    />
                </View>
            )}
    }

    render(){
        return(
            <View style={styles.fill}>
                <View style={styles.inner}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>趣味</Text>
                    </View>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.hobbyDetailChipsComponentsView}
                        style={{height:'80%',marginBottom:10}}
                    />
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            onPress={this.handleNext}
                            disabled={this.state.count<10?true:false}
                        >
                            <View style={this.state.count>=10?styles.goNextButton:styles.goNextButtonDisabled}>
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
        alignContent:'center',
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
    hobbyDetailChipsComponentsView:{
        flexDirection:'column',
        justifyContent:'flex-start',
        height:'80%',
        marginBottom:10,
    },
    hobbyDetailChipsTitleView:{
        marginBottom:10
    },
    hobbyDetailChipsColumnView:{
        flexDirection:'column',
        justifyContent:'flex-start',
    },
    hobbyDetailChipsRowView:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    hobbyDetailChips:{
        marginHorizontal:5,
        marginBottom:3,
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
    },
})
