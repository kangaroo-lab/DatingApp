import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import Header from '../components/header';

export default function Top() {
  return (
    <View>
      <Header/>
      <View style={styles.container}>
        <Button title="PressMe" onPress={()=>Alert.alert('Search will start')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    position:'relative',
    marginHorizontal: 125,
    marginTop: 375,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
