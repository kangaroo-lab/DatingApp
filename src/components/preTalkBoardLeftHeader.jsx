import React from 'react';
import { StyleSheet,View,TouchableOpacity } from 'react-native';
import { AntDesign,Entypo } from '@expo/vector-icons';
import firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';

export default function TalkBoardHeader(props){

    const {navigation} = useNavigation();

    function handlePressHeart(){
        console.log(`KEY IS ${props}`)
    }

    function getUserRef(){
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        return db.collection(`users/${currentUser.uid}/talkLists`)
    }

    function getRoomRef(){
        const db = firebase.firestore();
    }

    return(
        <View style={styles.container}>
            <View style={styles.iconBox}>
                <TouchableOpacity
                    onPress={()=>{
                        handlePressHeart()
                    }}
                >
                    <AntDesign name="heart" size={24} color="black"/>
                </TouchableOpacity>
            </View>
            <View style={styles.iconBox}>
                <TouchableOpacity>
                    <Entypo name="phone" size={24} color="black"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    iconBox:{
        marginHorizontal:10,
    }
})
