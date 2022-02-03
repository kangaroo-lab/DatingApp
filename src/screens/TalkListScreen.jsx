import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';

export default function TalkList(){
    return(
    <View style={styles.container}>
        <View>
            <Image source={require('./IMG_6689.jpg')}style={{ width: 55, height: 57.78,borderRadius: 50 }}/>
            <Text>Name</Text>
            <Text>Date</Text>
            <Text>Message is here</Text>
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
