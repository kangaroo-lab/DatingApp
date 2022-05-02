import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function(props){
    const navigation = useNavigation();
    return <StartToSetScreen {...props} navigation={navigation}/>
}

class StartToSetScreen extends Component{
    constructor(props){
        super(props);
    }

    toBasicInfo=()=>{
        const {navigation} = this.props;
        navigation.navigate('PutBasicInfo')
    }

    render(){
        return(
            <View style={styles.fill}>
                <View style={styles.inner}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>登録が完了しました！</Text>
                    </View>
                    <TouchableOpacity
                        onPress={this.toBasicInfo}
                    >
                        <View style={styles.goNextButton}>
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
    birthDayView:{
        marginBottom:20,
        flexDirection:'row',
        justifyContent:'center'
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
