import React from 'react';
import { StyleSheet, Text, View, Button, Alert,Image,ScrollView, TouchableOpacity,TextInput } from 'react-native';

export default function BriefEdit(){
    return(
        <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
            <View>
                <Text>プロフィール入力</Text>
            </View>
            <View>
                <View>
                    <TextInput style={{borderBottomWidth:1,}}/>
                </View>
                <View>
                    <TouchableOpacity>
                        <View>
                            <Text>送信</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
