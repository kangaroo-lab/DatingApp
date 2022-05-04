import React, {Component} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import firebase from 'firebase';

import User from '../../data/user';

import Hobbys from '../../components/profile/Hobbys';
import Values from '../../components/profile/Values';
import BasicInfo from '../../components/profile/BasicInfo';

const HEADER_MAX_HEIGHT= 550;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const Profile = User.profile

function getTrueData(data){
  const result = []
  for(let i=0;i<data.length; i++){
    if(data[i].status){
      result.push(data[i])
    }
  }
  return result
}

export default function(props){
    const navigation = useNavigation();
    return <ScrollableHeader {...props} navigation={navigation}/>
}

class ScrollableHeader extends Component {
    constructor(props) {
      super(props);
      this.state = {
        scrollY: new Animated.Value(0),
        brief:'',
        hobby:[],
        value:[],
        basicInfo:[]
      };
      const data4basic=[];
      const data4hobby=[];
      const data4value=[];
      const db = firebase.firestore();
      const {currentUser} = firebase.auth();
      const ref = db.collection(`users/${currentUser.uid}/userInfo`);
      // firebaseからデータを取得、加工
      ref.onSnapshot((snapShot)=>{
        snapShot.forEach((doc)=>{
          const data = doc.data()
          data4basic.push({
            id:doc.id,
            data:data
          });
          ref.doc(doc.id).collection('hobby')
            .onSnapshot((snapShot)=>{
              snapShot.forEach((doc)=>{
                const hobbyData = doc.data().hobby
                hobbyData.forEach((elem)=>{
                  if(elem.status){
                    data4hobby.push({
                      data:elem
                    });
                  }
                });
              });
              this.setState({hobby:data4hobby});
            });
          ref.doc(doc.id).collection('value')
            .onSnapshot((snapShot)=>{
              snapShot.forEach((doc)=>{
                const valueData = doc.data().value
                valueData.forEach((elem)=>{
                  if(elem.status){
                    data4value.push({
                      data:elem
                    });
                  }
                });
              });
              this.setState({value:data4value});
            });
        });
        this.setState({basicInfo:data4basic});
      });
    }

    pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({image:result.uri});
      }
    };

    toBriefEditScreen = () => {
        const { navigation } = this.props;
        navigation.navigate('BriefEdit',{userBrief:Profile.brief});
    }

    toNameEditScreen = () => {
      const { navigation } = this.props;
      navigation.navigate('NameEdit',{userBrief:Profile.name});
  }

  _renderScrollViewContent() {
    return (
    <View style={styles.scrollViewContent}>
        <View style={styles.scrollViewContents}>
            <View style={styles.BasicArea}>
                <Text style={styles.name}>{this.state.basicInfo.name}</Text>
                <Text style={styles.age}>({Profile.age})</Text>
            </View>
            <View style={styles.introduction}>
                <Text style={styles.Title}>プロフィール</Text>
                <View style={styles.Detail}>
                    <Text style={styles.profileDetail}>
                        {Profile.brief}
                    </Text>
                </View>
                <View style={styles.PencilButtonCntainer}>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={this.toBriefEditScreen}
                    >
                        <Entypo name="pencil" size={25} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.introduction}>
                <Text style={styles.Title}>趣味</Text>
                <View style={styles.Detail}>
                    <Hobbys hobbies={Profile.hobbies}/>
                </View>
            </View>
            <View style={styles.introduction}>
                <Text style={styles.Title}>価値観</Text>
                <View style={styles.Detail}>
                    <Values values={Profile.values}/>
                </View>
            </View>
            <View style={styles.introduction}>
                <Text style={styles.Title}>基本情報</Text>
                <View style={styles.Detail}>
                    <BasicInfo
                        user={Profile}
                    />
                </View>
            </View>
        </View>
    </View>
    );
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const imageOpacity = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
      });
    const imageTranslate = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -50],
        extrapolate: 'clamp',
      });
    const buttonOpacity = this.state.scrollY.interpolate({
        inputRange:[0,HEADER_SCROLL_DISTANCE/2],
        outputRange:[10,0],
        extrapolate: 'clamp',
    });
    return (
      <View style={styles.fill}>
        <ScrollView
          nestedScrollEnabled={true}
          style={styles.fill}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
        >
          {this._renderScrollViewContent()}
        </ScrollView>
        <Animated.View style={[styles.header, {height: headerHeight}]}>
            <Animated.Image
                style={[
                styles.backgroundImage,
                {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
                ]}
                source={{uri:this.state.image}}
            />
            <Animated.View style={[styles.CameraButtonContainer, {opacity:buttonOpacity}]}>
                <TouchableOpacity style={styles.button} onPress={this.pickImage}>
                    <Feather name="camera" size={25} color="white" />
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  BasicArea:{
      flexDirection:'row',
      justifyContent:'flex-end',
      height:50,
      marginLeft:'auto',
  },
  name:{
      fontSize:36,
      alignSelf:'flex-end',
      paddingBottom:5,
      fontWeight:'bold',
  },
  age:{
      fontSize:24,
      alignSelf:'flex-end',
      marginHorizontal:20,
      fontWeight:'bold'
  },
  introduction:{
      borderBottomWidth:1,
      borderBottomColor:'rgba(0,0,0,0.25)',
      paddingVertical:10,
      paddingHorizontal:10,
      flexWrap:'nowrap',
  },
  Title:{
      fontSize:18,
      fontWeight:'bold'
  },
  profileDetail:{
      fontSize:15
  },
  PencilButtonCntainer:{
      position:'absolute',
      right:0,
      bottom:'5%',
  },
  button:{
      marginHorizontal:30,
      backgroundColor:'rgba(0,0,0,0.30)',
      width:40,
      height:40,
      borderRadius:30,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
  },
  Detail:{
      paddingHorizontal:3,
      paddingVertical:10
  },
  animatedHeader:{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#03A9F4',
      overflow: 'hidden',
  },
  image:{
      height: HEADER_MAX_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
  },
  ValueContainer:{
      flexDirection:'row',
      justifyContent:'flex-start'
  },
  ElementBox:{
      flexDirection:'row',
  },
  element:{
      flexDirection:'column',
      justifyContent:'center',
      borderWidth:1,
      borderRadius:20,
      width:'auto',
      paddingHorizontal:10,
      height:36,
      borderColor:'rgba(0,0,0,0.25)',
      fontSize:18,
      textAlign:'center',
      marginVertical:5,
  },
  CameraButtonContainer:{
      position:'absolute',
      right:0,
      bottom:'5%',
  },
});
