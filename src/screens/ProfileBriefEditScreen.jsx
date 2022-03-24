import React,{useState} from 'react';
import { StyleSheet, Text, View, Button, Alert,Image,ScrollView, TouchableOpacity,TextInput } from 'react-native';
import { string, func, shape } from 'prop-types';

import User from '../data/user';

export default function BriefEdit(props){
    console.log(props)
    const navigation = props.navigation;
    const userBrief = props.route.params
    const [brief, setBrief] = useState(userBrief.userBrief);
    console.log('\n=================\n',userBrief,'\n',brief)
    console.log(User.profile.brief)
    function ReflectEditFile(newBrief){
        User.profile.brief=newBrief
    }
    return(
        <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
            <View>
                <Text>プロフィール入力</Text>
            </View>
            <View>
                <View>
                    <TextInput
                     multiline={true}
                     style={{borderWidth:1,height:'90%',}}
                     onChangeText={(text)=>setBrief(text)}
                     value={brief}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={()=>{
                            ReflectEditFile(brief)
                            navigation.goBack()
                        }}
                    >
                        <View>
                            <Text>送信</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

BriefEdit.propTypes={
    userBrief:string
}
