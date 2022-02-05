import React from 'react';
import { StyleSheet, Text, View, Button, Alert,Image } from 'react-native';

import Head from '../components/header';

export default function profile(){
    return (
        <View>
            <Head/>
            <View style={StyleSheet.container}>
                <Image source={require('./IMG_6689.jpg')}style={{ width: 428, height: 509}}/>
                <Text>Name</Text>
            </View>
            <View>
                <Text>プロフィール</Text>
                <Text>
                    わしの名前はケンゴだぞ！
                    学術名は「ケンゴケンゴケンゴ」！！
                    け、け、ケンゴ！！！！！
                </Text>
            </View>
            <View>
                <Text>
                    趣味
                </Text>
                <View>
                    <Text>要素</Text>
                </View>
            </View>
            <View>
                <Text>価値観</Text>
                <View>
                    <Text>要素</Text>
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
})
