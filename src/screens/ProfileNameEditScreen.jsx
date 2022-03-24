import React from 'react';
import { StyleSheet, Text, View, Button, Alert,Image,ScrollView, TouchableOpacity } from 'react-native';

export default function NameEdit(){
    return(
        <View>
            <View>
                <Text>名前入力</Text>
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
