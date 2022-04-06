import React,{useEffect} from 'react';
import {View,StyleSheet,TouchableOpacity,Text} from 'react-native';
import Animated,{ useAnimatedStyle, useSharedValue,withSpring,interpolate,withRepeat,withTiming } from 'react-native-reanimated';


export default function Top2(){
  //アニメーションの定義
  const ring=useSharedValue(0);
  const style = useAnimatedStyle(()=>{
    return {
      opacity:0.8-ring.value,
      transform:[
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ]
    };
  })

  //検索の動作を決めるbool変数
  let flag=0;

  //検索中の波形アニメーションを実装(アニメーションはViewタッチで発火)
  function searching(){
    //Searchingアニメーションの開始＋検索のプログラム
    if(flag==0){
      flag+=1;
        ring.value=withRepeat(
          withTiming(1, {
            duration: 3000,
          }),
          -1,
          false
        );
      return console.log("in ",ring.value);
    }
    //Searchingアニメーションの終了＋検索のストップ
    else{
      flag=0;
      ring.value=0;
      return console.log('out ',ring.value);
    }
    };

  //全体の表記
  return(
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={()=>{
            console.log('push');
            searching();
          }}
        >
          <View style={styles.circleButton}>
          <Animated.View style={[styles.circleButton,style]}/>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    )
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
      borderRadius:500,
      justifyContent:'center',
      alignItems:'center',
    },
    buttonCircleText:{
      color:'rgba(0,0,0,0.55)',
    }
  });
