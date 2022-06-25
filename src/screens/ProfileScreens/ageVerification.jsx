import React , { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

export default function AgeVertification(){

    const navigation = useNavigation();
    function handlePress(type){
        navigation.navigate('CheckPaper')
    }

    return(
        <View>
            <Text>まず、本人確認書類の生年月日などの記載から18歳以上であることを確認します。</Text>
            <View>
                <View>
                    <Text>以下の書類から、提出書類を選んでください</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>{
                        handlePress('免許証')
                    }}
                >
                    <View>
                        <Text>運転免許証</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        handlePress('保険証')
                    }}
                >
                    <View>
                        <Text>健康保険証</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        handlePress('パスポート')
                    }}
                >
                    <View>
                        <Text>パスポート</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        handlePress('マイナンバー')
                    }}
                >
                    <View>
                        <Text>マイナンバー</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})
