import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image,TouchableOpacity } from 'react-native';

import MessageList from '../components/TalkList';

export default function TalkList(){
    return(
    <View>
        <MessageList style={styles.MessageList}/>
    </View>
    );
}
    const styles = StyleSheet.create({

});
