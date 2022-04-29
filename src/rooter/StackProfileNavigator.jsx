import React, {  } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../screens/ProfileScreens/ProfileScreen2';
import BriefEdit from '../screens/ProfileScreens/ProfileBriefEditScreen';
import NameEdit from '../screens/ProfileScreens/ProfileNameEditScreen';

const Stack = createNativeStackNavigator();

export default function ProfileNavigator(){
    return (
        <Stack.Navigator
            initialRouteName='Profile'
        >
            <Stack.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name='BriefEdit'
                component={BriefEdit}
            />
            <Stack.Screen
                name='NameEdit'
                component={NameEdit}
            />
        </Stack.Navigator>
    )
}
