import React from 'react';
import { string, func, shape } from 'prop-types';
import { StyleSheet, Text, View} from 'react-native';

export default function CatchMessage(props){
    const {message} = props;

    //CatchMessageの吹き出しの制作
    const MessageText = ({message})=>{
        return(
        <View style={styles.catchMessage}>
            <Text style={styles.messageText}>{message}</Text>
        </View>
        )
    };

    //CatchMessageの表示の返し
    return(
        <View style={styles.catchMessageArea}>
            <MessageText
                message={message}
            />
        </View>
    )
}

CatchMessage.propTypes={
    message:string,
};

const styles=StyleSheet.create({
    catchMessageArea:{
        width:'75%',
        marginVertical:1,
    },
    catchMessage:{
        alignSelf:'flex-start',
        borderWidth:0.2,
        borderColor:'rgba(0,0,0,0.50)',
        padding:8,
        margin:3,
        borderRadius:10,
        backgroundColor:'#C4C4C4',
        paddingVertical:8,
    },
    messageText:{
        fontSize:15,
    }
})
