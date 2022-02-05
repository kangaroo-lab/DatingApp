import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';

import Header from '../components/header';

export default function TalkList(){
    return(
    <View>
        <Header/>
        <View style={styles.messageboard}>
            <View style={styles.container}>
                <View>
                    <Image source={require('./IMG_6689.jpg')}style={styles.image}/>
                </View>
                <View style={styles.messageInner}>
                    <Text style={styles.name}>Name</Text>
                    <Text style={styles.message}>Message is here</Text>
                </View>
                <View style={styles.dateBox}>
                    <Text style={styles.date}>Date</Text>
                </View>
            </View>
        </View>
    </View>
    );
}
    const styles = StyleSheet.create({
        messageboard:{
            marginTop: 100,
        },
        container: {
            position:'relative',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 19,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.15)',
        },
        image: {
            width: 55,
            height: 57.78,
            borderRadius: 50,
        },
        name:{
            fontSize: 23,
        },
        message:{
            fontSize:18,
            color:'rgba(0,0,0,0.15)',
        },
        dateBox:{
            textAlign: 'right',

        },
        date:{
            fontSize:16,
        },
        messageInner:{
            paddingLeft:10,
            flex:1,
        }
});
