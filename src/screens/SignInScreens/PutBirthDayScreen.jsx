import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';

export default function (props){
    const navigation = useNavigation()
    return <BirthDayScreen {...props} navigation={navigation}/>
}

class BirthDayScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            date:new Date(),
            age:0
        }
    }

    getAge=(date)=>{
        console.log(this,props.route)
        const today = new Date()
        const birthday = new Date(date)
        const thisYearBirthDay = new Date(today.getFullYear(),birthday.getMonth(),birthday.getDate())
        const age = today.getFullYear() - birthday.getFullYear()
        if(today < thisYearBirthDay){
            this.setState({age:age-1})
        }else{
            this.setState({age:age})
        }
    }

    toName=()=>{
        const {currentUser} = firebase.auth();
        const db = firebase.firestore();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`);
        ref.add({
            birthday:this.state.date,
            age:this.state.age
        })
        .then((docRef)=>{
            console.log('Created', docRef.id)
            const {navigation} = this.props;
            navigation.navigate('Name')
        })
        .catch((error)=>{
            console.log('Error : ',error)
        })
    }

    render(){
        return(
            <View style={styles.fill}>
                <View style={styles.inner}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>生年月日</Text>
                    </View>
                    <View　style={styles.birthDayView}>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.date}
                            mode="date"
                            placeholder="生年月日"
                            format="YYYY-MM-DD"
                            minDate="1950-04-01"
                            maxDate={this.state.date}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    width:'auto',
                                    paddingHorizontal:20,
                                },
                                dateText:{
                                    fontSize:25
                                }
                            }}
                            onDateChange={(date) => {
                                this.setState({date: date})
                                this.getAge(date)
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={()=>{
                            if(this.state.age<18){
                                Alert.alert('18歳未満の方はご利用できません')
                            }else{
                                this.toName()
                            }
                        }
                        }
                        disabled={!this.state.date}
                    >
                        <View style={this.state.date?styles.goNextButton:styles.goNextButtonDisabled}>
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
