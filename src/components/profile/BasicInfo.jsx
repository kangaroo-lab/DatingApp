import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import userInfo from '../../data/userInfo';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase'


export default function BasicInfo({user}){
    const navigation = useNavigation();
    const [data, setData] = useState(user.profileList);

    const datas = []

    const InfoRender=({item})=>{
        if(item.list){
            return(
                <View style={styles.infoDataContainer}>
                    <Text>{item.title}</Text>
                    <View style={styles.infoDataDetail}>
                        <TouchableOpacity>
                            <RNPickerSelect
                                style={styles.infoDataDetailText}
                                onValueChange={(value) =>
                                    data[item.id].value=value,
                                    setData(data)
                                }
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
                                navigation.navigate('NameEdit',{user:data[item.id].value})
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
