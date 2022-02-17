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
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

import Header from '../components/header';



export default function Top() {
//bool for searching effect
let n=0;
console.log(n)

//Animattion
  let CircleButton = ({delay})=>{
    const ring = useSharedValue(0);
    const ringStyle = useAnimatedStyle(() => {
      return {
        opacity: 0.8 - ring.value,
        transform: [
          {
            scale: interpolate(ring.value, [0, 1], [0, 4]),
          },
        ],
      };
    });

    useEffect(() => {
      ring.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, {
            duration: 4000,
          }),
          -1,
          false
        )
      );
    }, []);
    return <Animated.View style={[styles.circleButton,ringStyle]}/>;
  };

  //Serching Switch
  function Searching(){
    if(n==0){
      return 'Searching On '+n;
    }else{
        n=n-1;
      return 'Searching Off '+n;
    }
  }


  //Screen
  return(
  <View>
    <Header/>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={()=>{
          console.log(Searching());
        }}
      >
        <CircleButton delay={0}/>
        <CircleButton delay={1000}/>
        <CircleButton delay={2000}/>
        <CircleButton delay={3000}/>
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
    position:'absolute',
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
