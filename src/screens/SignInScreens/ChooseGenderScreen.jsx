import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';

export default function(){
    return <GenderScreen/>
}

class GenderScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <View>
                    <Text>性別</Text>
                </View>
                <View>
                    <Text>男性</Text>
                    <Text>女性</Text>
                </View>
                <View>
                    <Text>次へ</Text>
                </View>
            </View>
        )
    }
}
