import React, {  } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../screens/ProfileScreens/ProfileScreen2';
import BriefEdit from '../screens/ProfileScreens/ProfileBriefEditScreen';
import NameEdit from '../screens/ProfileScreens/ProfileNameEditScreen';
import AgeVertification from '../screens/ProfileScreens/ageVerification';
import CheckPaper from '../screens/ProfileScreens/CheckPaper';

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
                    headerShown:false,
                    animation:'fade'
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
            <Stack.Screen
                name='AgeVerti'
                component={AgeVertification}
            />
            <Stack.Screen
                name='CheckPaper'
                component={CheckPaper}
            />
        </Stack.Navigator>
    )
}
