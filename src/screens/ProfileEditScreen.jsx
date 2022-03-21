import React,{useState} from 'react';
import { StyleSheet, Text, View, Button, Alert,Image,ScrollView, TouchableOpacity } from 'react-native';

import User from '../data/user';

export default function ProfileEdit(){
    const Profile = User.profile;
    const [brief, setBrief] = useState();
    const [name, setName] = useState();
    return (
        <View style={styles.container}>
            <View>
                <Image source={Profile.photo} style={styles.image}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'relative',
        flexDirection:'column',
        justifyContent:'center',
        bottom: 30,
    },
})
