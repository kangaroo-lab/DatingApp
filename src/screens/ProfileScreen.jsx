import React from 'react';
import { StyleSheet, Text, View, Button, Alert,Image } from 'react-native';

import Head from '../components/header';

export default function profile(){
    return (
        <View>
            <Head/>
            <View>
                <Image source={require('../IMG_6689.jpg')}style={styles.image}/>
                <View style={styles.BasicArea}>
                    <Text style={styles.name}>K</Text>
                    <Text style={styles.age}>(23)</Text>
                </View>
                <View style={styles.introduction}>
                    <Text style={styles.Title}>プロフィール</Text>
                    <Text style={styles.profileDetail}>
                        わしの名前はケンゴだぞ！{'\n'}
                        学術名は「ケンゴケンゴケンゴ」！！{'\n'}
                        け、け、ケンゴ！！！！！
                    </Text>
                </View>
                <View style={styles.introduction}>
                    <Text style={styles.Title}>
                        趣味
                    </Text>
                    <View style={styles.ElementBox}>
                        <Text style={styles.element}>要素</Text>
                    </View>
                </View>
                <View style={styles.introduction}>
                    <Text style={styles.Title}>価値観</Text>
                    <View style={styles.ElementBox}>
                        <Text style={styles.element}>要素</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'relative',
        bottom: 0,
    },
    image:{
        width: 'auto',
        height: 509
    },
    BasicArea:{
        flexDirection:'row',
        justifyContent:'flex-end',
        height:65,
        width: 'auto',
    },
    name:{
        fontSize:64,
        paddingBottom:5,
        fontWeight:'bold',
    },
    age:{
        fontSize:24,
        alignSelf:'flex-end',
        marginHorizontal:20,
        fontWeight:'bold'
    },
    introduction:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.25)',
        paddingVertical:10,
        paddingHorizontal:20,
        flexWrap:'nowrap',
    },
    Title:{
        fontSize:24,
        fontWeight:'bold'
    },
    profileDetail:{
        fontSize:18
    },
    ElementBox:{
        flexDirection:'row'
    },
    element:{
        borderWidth:1,
        borderRadius:20,
        width:72,
        height:36,
        borderColor:'rgba(0,0,0,0.25)',
        fontSize:18,
        textAlign:'center',
        marginVertical:5,
    }
})
