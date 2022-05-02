import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogIn from '../screens/LogInScreen';
import SignIn from '../screens/SignInScreens/SignInScreen';
import DrawerNavigation from './DrawerNavigator';
import Gender from '../screens/SignInScreens/ChooseGenderScreen';
import PartnerGender from '../screens/SignInScreens/ChoosePartnerGenderScreen';
import Adress from '../screens/SignInScreens/PutAdressScreen';
import BirthDay from '../screens/SignInScreens/PutBirthDayScreen';
import Name from '../screens/SignInScreens/PutNameScreen';
import Register from '../screens/SignInScreens/RegisterScreen'
import Start from '../screens/Register/StartToProfileScreen'
import PutBasicInfo from '../screens/Register/PutBasicInfoScreen';

const Stack = createNativeStackNavigator();

export default function StackFirstNavigator(){
    return(
        <Stack.Navigator
            initialRouteName='LogIn'
            id='LogIn'
        >
            <Stack.Screen
                name='LogIn'
                component={LogIn}
            />
            <Stack.Screen
                name='SignIn'
                component={SignIn}
            />
            <Stack.Screen
                name='Drawer'
                component={DrawerNavigation}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name='Gender'
                component={Gender}
            />
            <Stack.Screen
                name='PartnerGender'
                component={PartnerGender}
            />
            <Stack.Screen
                name='Adress'
                component={Adress}
            />
            <Stack.Screen
                name='BirthDay'
                component={BirthDay}
            />
            <Stack.Screen
                name='Name'
                component={Name}
            />
            <Stack.Screen
                name='Register'
                component={Register}
            />
            <Stack.Screen
                name='Start'
                component={Start}
            />
            <Stack.Screen
                name='PutBasicInfo'
                component={PutBasicInfo}
            />
        </Stack.Navigator>
    )
}
