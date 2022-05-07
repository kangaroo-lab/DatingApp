import React,{useEffect,useState} from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';

import OfficialMessageList from '../../../components/OfficialTalkList';

export default function OfficialTalkList(){
    return(
    <View>
        <OfficialMessageList style={styles.MessageList}/>
    </View>
    );
}
    const styles = StyleSheet.create({

});
