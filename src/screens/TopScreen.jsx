import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function Top() {
  return (
    <View style={styles.container}>
      <Button title="PressMe" onPress={()=>Alert.alert('Search will start')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
