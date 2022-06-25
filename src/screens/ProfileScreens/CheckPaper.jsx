import React , { useState, useEffect }  from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ImageBackground
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

import firebase from 'firebase';

export default function CheckPaper(){
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null);
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      const takePicture = async () => {
        if (camera) {
          const image = await camera.takePictureAsync();
          setPicture(image.uri);
        }
    };

    const sendFile = async () => {

    }

    function uploadPost(){

    }

    function uploadPostImg(){

    }

      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
      return (
        <View style={styles.container}>
            {!picture ? (
                <Camera
                    style={styles.camera}
                    type={type}
                    ref={(ref)=>{
                        setCamera(ref)
                    }}
                >
                    <View style={styles.flameArea}>
                        <Text style={styles.aleraText}>枠内に合わせて撮影をオネシャス</Text>
                        <View style={styles.flame}>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={
                                // setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
                                takePicture
                                }>
                            </TouchableOpacity>
                    </View>

                    </View>
                </Camera>
            ):(
                <ImageBackground source={{ uri: picture }} style={{ flex: 1,justifyContent:'center',flexDirection:'column' }}>
                        <View style={styles.flame}></View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.buttonSubmit}
                                onPress={
                                    sendFile
                                }>
                                <Text style={styles.buttonSubmitText}>Submit</Text>
                            </TouchableOpacity>
                    </View>
                </ImageBackground>
            )}
        </View>
      );
    }

    const styles = StyleSheet.create({
        aleraText:{
            textAlign:'center',
            marginHorizontal:50,
            paddingVertical:10,
            marginBottom:5,
            backgroundColor:'rgba(256,256,256,0.8)',
        },
        container:{
            flex:1,
            width:null,
            height:null,
        },
        camera:{
            width:'100%',
            height:'100%'
        },
        flameArea:{
            flex:1,
            justifyContent:'center',
            flexDirection:'column'
        },
        flame:{
            borderWidth:1,
            alignSelf:'center',
            height:450,
            width:300,
            marginBottom:30,
            backgroundColor: "rgba(255,255,255,0)",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 50,
            elevation: 1,
        },
        buttonContainer:{
            justifyContent:'center',
            flexDirection:'row',
        },
        button:{
            borderRadius:100,
            width:90,
            height:90,
            alignItems:'center',
            backgroundColor:'rgba(256,256,256,0.50)',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 16,
            elevation: 1,
        },
        buttonSubmit:{
            borderRadius:20,
            width:200,
            height:90,
            backgroundColor:'rgba(256,256,256,0.50)',
            flexDirection:'column',
            justifyContent:'center'
        },
        buttonSubmitText:{
            textAlign:'center',
            fontSize:20
        }
    });
