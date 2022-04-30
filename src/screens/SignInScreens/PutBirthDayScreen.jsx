import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable,
    TextInput,
    Button
} from 'react-native';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function (){
    return <BirthDayScreen/>
}

class BirthDayScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            birthday:new Date(),
            active:false
        }
    }

    open=()=>{
        this.setState({active:true})
    }

    dismiss=()=>{
        this.setState({active:false})
    }

    render(){
        return(
            <View style={styles.fill}>
                <View style={styles.inner}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>生年月日</Text>
                    </View>
                    <View>
                    <DateTimePickerModal
                        isVisible={this.state.active}
                        date={
                            this.state.date ||
                            moment()
                            .startOf('day')
                            .toDate()
                        }
                        onConfirm={date => {
                          this.dismiss();
                          this.setState({birthday:moment(date).startOf('day').toDate()});
                        }}
                        headerTextIOS='日付を選択'
                        cancelTextIOS="キャンセル"
                        confirmTextIOS="OK"
                        onCancel={this.dismiss}
                        locale="ja"
                    />
                    <Button
                        title={this.state.date ? moment(this.state.date).format("YYYY年MM月DD日") : '日付を選択'}
                        onPress={this.open}
                    />
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
        height:'83%',
        marginBottom:10

    },
    buttonView:{
        flexDirection:'row',
        justifyContent:'center'
    },
    goNextButton:{
        backgroundColor:'#6FCBFF',
        borderRadius:4,
        alignSelf:'flex-start',
        marginBottom:24,
    },
    buttonLabel:{
        fontSize:16,
        lineHeight:32,
        color:'#ffffff',
        paddingHorizontal:32,
        paddingVertical:8,
    }
})
