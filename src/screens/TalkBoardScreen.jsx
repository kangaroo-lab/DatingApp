import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';

import Header from '../components/header';

export default function TalkBoard(){
    return(
    <View style={styles.container}>
        <Header/>
        <View>
            <Text>Back</Text>
            <Text>Good</Text>
            <Text>Call</Text>
            <Text>Setting</Text>
        </View>
        <View>
            <View>
                <Text>Catch Message</Text>
            </View>
            <View>
                <Text>Send Message</Text>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
},
});
