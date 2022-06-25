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
import {useNavigation,useIsFocused} from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';


import firebase from 'firebase';

import User from '../../data/user';

import Hobbys from '../../components/profile/Hobbys';
import Values from '../../components/profile/Values';
import BasicInfo from '../../components/profile/BasicInfo';

const HEADER_MAX_HEIGHT= 550;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const Profile = User.profile

export default function(props){
    const navigation = useNavigation(); const isFocused = useIsFocused();
    return <ScrollableHeader {...props} navigation={navigation}isFocused={isFocused}/>
}

function fixData(data){
  let saveData = '';
  const result = [];
  let newArray = [];
  for(let i=0;i<data.id;i+=1){
      if(saveData.length<15){
          saveData+=data.data[i].title;
          newArray.push(data.data[i])
      }else{
          result.push(newArray);
          newArray=[];
          saveData='';
          i-=1
      }
  };
  result.push([{
      title:''
  }])
  return result
}

class ScrollableHeader extends Component {
    constructor(props) {
      super(props);
      this.state = {
        scrollY: new Animated.Value(0),
        brief:'',
        data:[],
        flag:false,
        hobby:[],
        value:[],
        count:0,
        image:'',
        userKey:'',
        rerenderCount:0,
        saveCount:0
      };
    }

    componentDidMount(){
      this.userInfoRef = this.getRef();
      this.getData();
      if(this.state.rerenderCount!==this.state.saveCount){
        this.updateData();
        this.setState({saveCount:rerenderCount});
      }
      console.log('NOW FOCUSED ON PROFILE')
    }

    componentDidUpdate(prevProps){
      if(prevProps.isFocused&&!this.props.isFocused){
        console.log('UPDATE')
        this.updateData();
      }
    }

    updateData(){
      const db = firebase.firestore();
      const {currentUser} = firebase.auth();
      const ref = db.collection(`users/${currentUser.uid}/userInfo`).doc(this.state.userKey);
      const call = this.state.data[0].profileList;
      ref.update({
        // name:call[0],
        age:call["age"],
        blood:call["blood"],
        address:call["address"],
        workPlace:call["workPlace"],
        birthPlace:call["birthPlace"],
        family:call["family"],
        // language:call[7],
        height:call["height"],
        bodyShape:call["bodyShape"],
        schoolHistory:call["schoolHistory"],
        jobType:call["jobType"],
        // job:call["job"],
        income:call["income"],
        holiday:call["holiday"],
        smoke:call["smoke"],
        roomMate:call["roomMate"],
        marriage:call["marriage"],
        kids:call["kids"],
        kidsWant:call["kidsWant"],
        childCare:call["childCare"],
        howToMeet:call["howToMeet"],
        dateMoney:call["dateMoney"],
        // url:this.state.result,
        // brief:this.state.data[0].brief,
      })
      .then(()=>console.log('Updated!'))
      .catch((e)=>console.error('Disabled!!',e))
    }

    getData(){
      this.userInfoRef.onSnapshot((snapShot)=>{
        const result = []
        snapShot.forEach((doc)=>{
          let d = doc.data()
          this.setState({userKey:doc.id})
          result.push({
            id:doc.id,
            name:d.name,
            age:d.age,
            brief:d.brief,
            photo:d.url,
            profileList:{
              "name":{
                title:'name',
                value:d.name.value
              },"age":{
                title:'age',
                value:d.age.value
              },"blood":{
                title:'blood',
                value:d.blood.value
              },"address":{
                title:"address",
                value:d.address.value
               },"workPlace":{
                title:"workPlace",
                value:d.workPlace.value
               },"birthPlace":{
                title:"birthPlace",
                value:d.birthPlace.value
               },"family":{
                title:"family",
                value:d.family.value
               },"language":{
                title:"language",
                value:d.language.value
               },"height":{
                title:"height",
                value:d.height.value
               },"bodyShape":{
                title:"bodyShape",
                value:d.bodyShape.value
               },"schoolHistory":{
                title:"schoolHistory",
                value:d.schoolHistory.value
               },"jobType":{
                title:"jobType",
                value:d.jobType.value
               },"job":{
                title:"job",
                value:d.job.value
               },"income":{
                title:"income",
                value:d.income.value
               },"holiday":{
                title:"holiday",
                value:d.holiday.value
               },"drink":{
                title:"drink",
                value:d.drink.value
               },"smoke":{
                title:"smoke",
                value:d.smoke.value
               },"roomMate":{
                title:"roomMate",
                value:d.roomMate.value
               },"marriage":{
                title:"marriage",
                value:d.marriage.value
               },"kids":{
                title:"kids",
                value:d.kids.value
               },"kidsWant":{
                title:"kidsWant",
                value:d.kidsWant.value
               },"childCare":{
                title:"childCare",
                value:d.childCare.value
               },"howToMeet":{
                title:"howToMeet",
                value:d.howToMeet.value
               },"dateMoney":{
                title:"dateMoney",
                value:d.dateMoney.value
               },
              }
          });
        });
        this.setState({data:result,flag:true,image:result[0].photo});
        this.getHobbyData();
        this.getValueData();
        this.setState({count:this.state.count+1})
      })
    }

    getHobbyData(){
      let index = 0;
      this.getHobby().onSnapshot((snapShot)=>{
        const result = [];
        snapShot.forEach((doc)=>{
          const d = doc.data().hobby;
          const listOfDetail=[];
          for(let i=0;i<d.length;i++){
            if(d[i].status){
              for(let j=0;j<d[i].list.length;j++){
                if(d[i].list[j].status){
                  listOfDetail.push({
                    title:d[i].list[j].title
                  })
                  index+=1;
                }
              }
            };
          };
          listOfDetail.push({
            title:''
          })
          result.push({
            data:listOfDetail,
            id:index
          })
        });
        this.setState({hobby:fixData(result[0])})
      });
    }

    getHobby(){
      return this.userInfoRef.doc(this.state.data[0].id).collection('hobby')
    }

    getValueData(){
      this.getValue().onSnapshot((snapShot)=>{
        const result = []
        snapShot.forEach((doc)=>{
          const d = doc.data().value;
          for(let i=0;i<d.length;i++){
            if(d[i].status){
              result.push({
                data:d[i]
              });
            }
          };
        });
        this.setState({value:result})
      });
    }

    getValue(){
      return this.userInfoRef.doc(this.state.data[0].id).collection('value')
    }

    getRef(){
      const db = firebase.firestore();
      const {currentUser} = firebase.auth();
      return db.collection(`users/${currentUser.uid}/userInfo`);
    };

    pickImage = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if(status==='granted'){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
          });
          if (!result.cancelled) {
            const actions = []
            // actions.push({ resize:{ width:350,height:500 } })
            const manipulatorResult = await ImageManipulator.manipulateAsync(
                result.uri,
                actions,
                {
                    compress: 0.4,
                },
            )
            this.setState({image: manipulatorResult.uri, imgUrl: manipulatorResult.uri});
            this.onPressAdd();
          };
        }else{
          console.log('clear');
        };
    };

    async onPressAdd(){
      await this.uploadPostImg();
      const { imgUrl, phrase, postIndex } = await this.state;
      this.setState(
          {
              addedPost:[
                  {
                      imgUrl,
                      phrase,
                      postIndex,
                  },
              ],
          },
      )
      this.uploadPost(this.state.imgUrl,this.state.phrase,this.state.postIndex)
  }

  uploadPost(url, phrase, postIndex) {
    const db = firebase.firestore();
    const {currentUser} = firebase.auth();
    const ref = db.collection(`users/${currentUser.uid}/userInfo`).doc(this.state.userKey);
    ref.update({
         url:url,
         postIndex:postIndex
     })
     .then(()=>{
       console.log('UPLOAD!')
     })
     .catch((e)=>{
         alert(e)
     })
  }


    uploadPostImg = async () => {
      const metadata = {
        contentType: 'image/jpeg',
      };
      const {currentUser} = firebase.auth();
      const postIndex = Date.now().toString();
      const storage = firebase.storage();
      const imgURI = this.state.imgUrl;
      const response = await fetch(imgURI);
      const blob = await response.blob();
      const uploadRef = storage.ref(`users/${currentUser.uid}/images`).child(`${postIndex}`);

      await uploadRef.put(blob, metadata).catch((e)=>{
        console.error(e.message);
        alert('画像の登録に失敗したあああああああ');
      });

      await uploadRef
        .getDownloadURL()
        .then((url)=>{
          this.setState({
            imgUrl:url,
            postIndex,
          });
        });
    };

    toBriefEditScreen = () => {
        const { navigation } = this.props;
        navigation.navigate('BriefEdit',{userBrief:this.state.data[0].brief.value,id:this.state.userKey});
    }

    toNameEditScreen = () => {
      const { navigation } = this.props;
      navigation.navigate('NameEdit',{userBrief:Profile.name});
  }

  toAgeVertScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('AgeVerti')
  }

  _renderScrollViewContent() {
    if(!this.state.flag){}
    else{
      const CallData = this.state.data[0];
      const CallHobby = this.state.hobby;
      return (
        <View style={styles.scrollViewContent}>
          <View style={styles.scrollViewContents}>
              <View style={styles.basicInfoColumn}>
                <View style={styles.BasicArea}>
                  <Text style={styles.name}>{CallData.name.value}</Text>
                  <Text style={styles.age}>({CallData.age.value})</Text>
                </View>
                <TouchableOpacity
                  onPress={this.toAgeVertScreen}
                >
                  <View style={styles.checkAge}>
                    <Text style={styles.checkAgeText}>本人認証 未設定</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.introduction}>
                  <Text style={styles.Title}>プロフィール</Text>
                  <View style={[styles.Detail,{paddingBottom:40}]}>
                      <Text style={styles.profileDetail}>
                          {(CallData.brief.value)===''?'未設定':CallData.brief.value}
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
                      <Hobbys hobbies={CallHobby}/>
                  </View>
              </View>
              <View style={styles.introduction}>
                  <Text style={styles.Title}>基本情報</Text>
                  <View style={styles.Detail}>
                      <BasicInfo
                          user={CallData}
                          count={this.state.rerenderCount}
                      />
                  </View>
              </View>
          </View>
        </View>
      );
    }
  }

  render() {
    const { isFocused } = this.props;
    if(!isFocused){
      return <View/>
    }
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    },);
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
            ,{useNativeDriver:false}
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
      alignContent:'center',
      alignItems:'center'
  },
  basicInfoColumn:{
    flexDirection:'column',
    justifyContent:'flex-end'

  },
  checkAge:{
    marginRight:0,
    paddingRight:15,
    marginTop:10
  },
  checkAgeText:{
    alignSelf:'flex-end'
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
      paddingVertical:10,
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
