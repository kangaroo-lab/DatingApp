import React,{useState} from 'react';
import { StyleSheet, Text, View, Button, Alert,Image,ScrollView, TouchableOpacity } from 'react-native';

import User from '../data/user';

export default function ProfileEdit(){
    const Profile = User.profile;
    const [brief, setBrief] = useState();
    const [name, setName] = useState();

}
