import React,{useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

import Header from '../components/header';

export default function Top() {

  const animation = useSharedValue(1)
  const animationStyle = useAnimatedStyle(()=>{
    return{
    transform : [
      {
        scale : withTiming(animation.value,{
          duration:1000,
        })
      }
    ]
  }
  })

  return (
    <View>
      <Header/>
      <View style={styles.container}>
          <TouchableOpacity style={styles.circleButton} onPress={()=>{animation.value(1.5)}}>
            <Animated.View
              style={[{
                borderColor:'rgba(193,233,255,0.14)',
                borderWidth:5,
                width:179,
                height:179,
                borderRadius:100,
                justifyContent:'center',
                alignItems:'center'
              },animationStyle]
            }
            >
              <Text style={styles.buttonCircleText}>Tap Here</Text>
            </Animated.View>
          </TouchableOpacity>
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
  circleButton:{
    borderColor:'#6FCBFF',
    borderWidth:5,
    width:179,
    height:179,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonCircleText:{
    color:'rgba(0,0,0,0.55)',
  }
});
