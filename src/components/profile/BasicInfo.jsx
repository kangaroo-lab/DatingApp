import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList,Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import userInfo from '../../data/userInfo';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase'


export default function BasicInfo({user,count}){
    const navigation = useNavigation();
    const [data, setData] = useState(user.profileList);

    function updateData(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        const ref = db.collection(`users/${currentUser.uid}/userInfo`).doc(user.id);
        const call = data;
        ref.update({
          // name:call[0],
          age:call[1],
          blood:call[2],
          address:call[3],
          workPlace:call[4],
          birthPlace:call[5],
          family:call[6],
          // language:call[7],
          height:call[8],
          bodyShape:call[9],
          schoolHistory:call[10],
          jobType:call[11],
          // job:call[12],
          income:call[13],
          holiday:call[14],
          smoke:call[15],
          roomMate:call[16],
          marriage:call[17],
          kids:call[18],
          kidsWant:call[19],
          childCare:call[20],
          howToMeet:call[21],
          dateMoney:call[22],
          // url:this.state.result,
          // brief:this.state.data[0].brief,
        })
        .then(()=>console.log('Updated!'))
        .catch(()=>console.error('Disabled!!'))
      }

    const InfoRender=({item})=>{
        if(item.list){
            return(
                <View style={styles.infoDataContainer}>
                    <Text>{item.title}</Text>
                    <View style={styles.infoDataDetail}>
                        <TouchableOpacity>
                            <RNPickerSelect
                                style={styles.infoDataDetailText}
                                onValueChange={(value) =>{
                                    data[item.id].value=value
                                    if(Platform.OS=='android'){updateData()}
                                }
                                }
                                onDonePress={()=>updateData()}
                                items={item.list.map((data) => {return ({label:data, value:data})})}
                                placeholder={data[item.id].value==''?{label:'未設定',value:0}:{label:data[item.id].value,value:data[item.id].value}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }else if(item.call=='name'){
            return(
                <View style={styles.infoDataContainer}>
                    <Text>{item.title}</Text>
                    <View style={styles.infoDataDetail}>
                        <TouchableOpacity
                            onPress={()=>{
                                navigation.navigate('NameEdit',{user:data[item.id].value,id:user.id})
                            }}
                        >
                            <Text style={styles.infoDataDetailText}>{data[item.id].value}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }else{
            return(
                <View style={styles.infoDataContainer}>
                    <Text>{item.title}</Text>
                    <View style={styles.infoDataDetail}>
                        <TouchableOpacity
                            onPress={()=>{
                                console.log(data)
                            }}
                        >
                            <Text style={styles.infoDataDetailText}>{data[item.id].value?data[item.id].value:'未設定'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }


    return(
        <View style={styles.container}>
            <FlatList
                data={userInfo.info}
                renderItem={InfoRender}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        marginHorizontal:5,
        flexDirection:'column',
        justifyContent:'flex-end',
    },
    infoDataContainer:{
        borderBottomColor:'rgba(0,0,0,0.25)',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        paddingVertical:10
    },
    infoDataDetailText:{
        color:'darkgray'
    }
})
