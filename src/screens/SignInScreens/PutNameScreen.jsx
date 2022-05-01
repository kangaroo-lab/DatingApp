import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Keyboard,
    InputAccessoryView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function(props){
    const navigation = useNavigation()
    return <NameScreen {...props} navigation={navigation}/>
}

class NameScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            name:''
        }
    }

    toRegister=()=>{
        const {navigation} = this.props;
        navigation.reset({
            index:0,
            routes: [{name:'Register'}]
        })
    }

    render(){
        const inputAccessoryViewID = 'uniqueID';
        return(
            <View style={styles.fill}>
                <View style={styles.inner}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>ニックネーム</Text>
                    </View>
                    <View style={styles.nameBoxView}>
                        <TextInput
                            value={this.state.name}
                            onChangeText={(text)=>{this.setState({name:text})}}
                            placeholder='ニックネームを入力'
                            maxLength={8}
                            textAlign='center'
                            fontSize={25}
                        />
                    </View>
                    <TouchableOpacity
                        disabled={!this.state.name}
                        onPress={this.toRegister}
                    >
                        <View style={this.state.name?styles.goNextButton:styles.goNextButtonDisabled}>
                            <Text style={styles.buttonLabel}>次へ</Text>
                        </View>
                    </TouchableOpacity>
                    <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor='#EEEEEE'>
                        <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity onPress={()=>{
                                Keyboard.dismiss()
                            }}
                                style={styles.endButton}
                            >
                                <Text style={styles.endButtonText}>完了</Text>
                            </TouchableOpacity>
                        </View>
                    </InputAccessoryView>
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
    nameBoxView:{
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
    },
    endButton:{
        width:60,
        alignItems: "center",
        padding: 10,
    },
    endButtonText:{
    fontSize: 18,
    fontWeight:'bold',
    color:'hsl(210, 100%, 60%)'
    },

})
