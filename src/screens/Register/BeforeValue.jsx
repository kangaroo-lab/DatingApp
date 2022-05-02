import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';

export default function(){
    return <ValueScreen/>
}

class ValueScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            adress:''
        }
    }
    render(){
        return(
            <View style={styles.fill}>
                <TouchableOpacity>
                    <View style={styles.inner}>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>少しあなたについて教えてください</Text>
                        </View>
                    </View>
                </TouchableOpacity>
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
        flexDirection:'column',
        justifyContent:'center',
    },
    titleView:{
        flexDirection:'column',
        justifyContent:'center',
        width:'80%',
        height:'90%'
    },
    title:{
        alignContent:'center',
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
