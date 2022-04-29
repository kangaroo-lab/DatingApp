import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import userInfo from '../../data/userInfo';
import {useNavigation} from '@react-navigation/native';

export default function BasicInfo({user}){
    const navigation = useNavigation();
    const [data, setData] = useState(user.profileList)

    for(let i=0;i<10;i++){
        console.log('>>>',userInfo.info[i].title)
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
                                onValueChange={(value) =>
                                    data[item.id].container=value
                                }
                                items={item.list.map((data,idx) => {return ({label:data, value:idx})})}
                                placeholder={{label:'未設定',value:0}}
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
                                navigation.navigate('NameEdit',{user:data[item.id].container})
                            }}
                        >
                            <Text style={styles.infoDataDetailText}>{data[item.id].container}</Text>
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
                            <Text style={styles.infoDataDetailText}>{data[item.id].container}</Text>
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
        color:'rgba(0,0,0,0.50)'
    }
})
