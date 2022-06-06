import React from 'react';
import {
    Text,
    View
} from 'react-native';
import firebase from 'firebase'
import { Component } from 'react';


export default function(){
    return <TalkSetting/>
}
class TalkSetting extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <Text>Setting</Text>
            </View>
        )
    }
}
