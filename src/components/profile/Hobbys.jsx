import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Chip } from 'react-native-paper';

//データをchipsで表示できるように、改造
function fixData(data){
    let saveData = ''
    const result = []
    let newArray = []
    for(let i=0;i<data.length;i+=1){
        if(saveData.length<15){
            saveData+=data[i].title
            newArray.push(data[i])
        }else{
            //console.log(newArray)
            result.push(newArray)
            newArray=[]
            saveData=''
            i-=1
        }
    }
    console.log('IN HOBBYS ',result)
    return result
}

export default function Hobbys(hobbies){

    const hobbyChipRow=({item})=>{
        return(
            <Chip
                style={styles.hobbyDetailChips}
                selected={item.status}
                selectedColor={item.status?'tomato':'dimgray'}
                onPress={()=>{
                    if(!item.status){
                        item.status=true
                    }else{
                        item.status=false
                    }
                }}
            >
                {item.title}
            </Chip>
        )
    }

    const hobbyChipColumn=({item})=>{
        console.log('ITEM IS ',item.title)
        return(
            <View>
                <FlatList
                    data={item}
                    renderItem={hobbyChipRow}
                    style={{
                        justifyContent:'flex-start',
                        flexDirection:'row'
                    }}
                />
            </View>
        )
    }

    console.log('DATA IS >>>>>>>>>>>>>>>>>>\n',fixData(hobbies.hobbies))

    return(
        <View style={styles.HobbyContainer}>
            <View>
                <FlatList
                    data={fixData(hobbies.hobbies)}
                    renderItem={hobbyChipColumn}
                />
            </View>
            <View style={styles.PlusButtonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Entypo name="plus" size={28} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    HobbyContainer:{
        marginHorizontal:5,
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    ElementBox:{
        flexDirection:'row',
    },
    hobbyDetailChips:{
        marginHorizontal:5,
        marginBottom:3,
    },
    element:{
        flexDirection:'column',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:20,
        width:'auto',
        paddingHorizontal:10,
        height:36,
        borderColor:'rgba(0,0,0,0.25)',
        fontSize:18,
        textAlign:'center',
        marginVertical:5,
    },
    PlusButtonContainer:{

    },
    button:{
        marginHorizontal:30,
        backgroundColor:'rgba(0,0,0,0.30)',
        width:40,
        height:40,
        borderRadius:30,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
})
