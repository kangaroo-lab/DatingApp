import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';

import data from '../../data/hobbyCategory';

export default function(props){
    const navigation = useNavigation()
    return <HobbyCategoryScreen {...props} navigation={navigation}/>
}

//データをchipsで表示できるように、改造
function fixData(data){
    const result=[];
    for(let i=0;i<data.length;i+=3){
        let newArray = data.slice(i,i+3)
        result.push(newArray)
    }
    return result
}


class HobbyCategoryScreen extends Component{
    constructor(props){
        super(props);
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`).doc(this.props.route.params.id).collection('hobby');

        this.state={
            count:0,
            data:data
        }
    }

    categoryBox=({item})=>{
        return(
            <TouchableOpacity
                onPress={()=>{
                    if(!item.status){
                        item.status=true
                        this.setState({count:this.state.count+1})
                        console.log(this.props.route.params.id)
                    }else{
                        item.status=false
                        this.setState({count:this.state.count-1})
                    }
                }}
            >
                <View style={item.status===true?styles.categoryBoxComponetOn:styles.categoryBoxComponetOff}>
                    <Text style={styles.categoryTitle}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    categoryBoxRow=({item})=>{
        return(
            <View>
                <FlatList
                    data={item}
                    renderItem={this.categoryBox}
                    style={styles.categoryBoxComponetsRowView}
                />
            </View>
        )
    }

    handleNext=()=>{
        console.log(this.state.data)
        console.log(this.state.count)
        this.setState({count:this.state.count+1})
        const {navigation} = this.props;
        navigation.navigate('HobbyDetail',{data:this.state.data,id:this.props.route.params.id})
    }

    render(){
        return(
            <View style={styles.fill}>
                <View style={styles.inner}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>趣味</Text>
                    </View>
                    <View style={styles.categoryBoxComponetsColumnView}>
                        <FlatList
                            data={fixData(this.state.data)}
                            renderItem={this.categoryBoxRow}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            onPress={this.handleNext}
                            //disabled={this.state.count<3?true:false}
                        >
                            <View style={this.state.count<3?styles.goNextButtonDisabled:styles.goNextButton}>
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
        marginBottom:24,
    },
    buttonLabel:{
        fontSize:16,
        lineHeight:32,
        color:'#ffffff',
        paddingHorizontal:32,
        paddingVertical:8,
    },
    categoryBoxComponetsColumnView:{
        height:'80%',
        marginBottom:10,
        flexDirection:'column',
        justifyContent:'flex-start',
    },
    categoryBoxComponetsRowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    categoryBoxComponetOff:{
        borderWidth:1,
        borderColor:'lightgray',
        width:100,
        height:100,
        borderRadius:20,
        flexDirection:'column',
        justifyContent:'center',
    },
    categoryBoxComponetOn:{
        borderWidth:1,
        borderColor:'tomato',
        width:100,
        height:100,
        borderRadius:20,
        flexDirection:'column',
        justifyContent:'center',
    },
    categoryTitle:{
        textAlign:'center'
    }
})
