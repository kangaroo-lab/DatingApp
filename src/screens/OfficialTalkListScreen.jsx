import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image,TouchableOpacity } from 'react-native';

import OfficialMessageList from '../components/OfficialTalkList';

export default function OfficialTalkList(){
    return(
    <View>
        <OfficialMessageList style={styles.MessageList}/>
    </View>
    );
}
    const styles = StyleSheet.create({

});
