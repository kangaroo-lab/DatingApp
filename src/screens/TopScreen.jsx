import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/header';

export default function Top() {
  return (
    <View>
      <Header/>
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.buttonCircle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  buttonCircle:{
    backgroundColor:'#6FCBFF',
    width:179,
    height:179,
    borderRadius:85,
  }
});
