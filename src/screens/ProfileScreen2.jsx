import React, {Component} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import User from '../data/user';

import Hobbys from '../components/profile/Hobbys';
import Values from '../components/profile/Values';
import BasicInfo from '../components/profile/BasicInfo';

const HEADER_MAX_HEIGHT = 550;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const Profile = User.profile

export default function(props){
    const navigation = useNavigation();
    return <ScrollableHeader {...props} navigation={navigation}/>
}

class ScrollableHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
          scrollY: new Animated.Value(0),
        };
      }

    toBriefEditScreen = () => {
        const { navigation } = this.props;
        navigation.navigate('BriefEdit',{userBrief:Profile.brief});
    }

  _renderScrollViewContent() {
    return (
    <View style={styles.scrollViewContent}>
        <View style={styles.scrollViewContents}>
            <View style={styles.BasicArea}>
                <Text style={styles.name}>{Profile.name}</Text>
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

    return (
      <View style={styles.fill}>
        <ScrollView
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
            source={require('../IMG_6689.jpg')}
        />
            <View style={styles.bar}>
            </View>
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
