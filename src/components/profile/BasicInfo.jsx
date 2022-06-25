import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList,Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import userInfo from '../../data/userInfo';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase'


export default function BasicInfo({user,count}){
    const navigation = useNavigation();
    const data　=user.profileList;

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
                                    data[item.call].value=value
                                    // if(Platform.OS=='android'){updateData()}
                                }
                                }
                                // onDonePress={()=>updateData()}
                                items={item.list.map((data) => {return ({label:data, value:data})})}
                                placeholder={data[item.call].value==''?{label:'未設定',value:0}:{label:data[item.call].value,value:data[item.call].value}}
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
                                navigation.navigate('NameEdit',{user:data[item.call].value,id:user.id})
                            }}
                        >
                            <Text style={styles.infoDataDetailText}>{data[item.call].value}</Text>
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
                            <Text style={styles.infoDataDetailText}>{data[item.call].value?data[item.call].value:'未設定'}</Text>
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
