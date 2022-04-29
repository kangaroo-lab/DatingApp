import React from 'react';
import { StyleSheet, View } from 'react-native';

import MessageList from '../../../components/TalkList';

export default function TalkList(){
    return(
    <View
        style={{
            flex:1
        }}
    >
        <MessageList style={styles.MessageList}/>
    </View>
    );
}
    const styles = StyleSheet.create({

});
