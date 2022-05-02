import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import data from '../../data/values';

export default function(){
    return <ValueScreen/>
}

class ValueScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            data:data,
            count:0
        }
    }

    render(){
        if(this.state.count<5){
            return(
                <View style={styles.fill}>
                    <View style={styles.inner}>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>価値観</Text>
                        </View>
                        <View style={styles.cardComponentView}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({count:this.state.count+1})
                                    this.state.data[this.state.count].type[0].status=true
                                    this.state.data[this.state.count].status=true
                                }}
                            >
                                <View style={styles.card}>
                                    <Text style={styles.cardText}>{this.state.data[this.state.count].type[0].type}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.questionTextView}>
                                <Text　style={styles.questionText}>質問 : {this.state.data[this.state.count].title}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({count:this.state.count+1})
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
                    <TouchableOpacity>
                        <View style={styles.inner}>
                            <View style={styles.titleClearView}>
                                <Text style={styles.title}>ありがとうございました！</Text>
                                <Text style={styles.title}>なんとなくあなたがわかりました(笑)</Text>
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
