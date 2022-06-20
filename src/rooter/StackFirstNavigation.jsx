import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import First from '../screens/FirstScreen';
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
import HobbyCategory from '../screens/Register/HobbyCategoryScreen';
import HobbyDetail from '../screens/Register/HobbyDetailScreen';
import UploadPhoto from '../screens/Register/UploadPhotoScreen';
import ValueScreen from '../screens/Register/ValueScreen';

const Stack = createNativeStackNavigator();

export default function StackFirstNavigator(){
    return(
        <Stack.Navigator
            initialRouteName='BirthDay'
            // initialRouteName='First'
            id='First'
        >
            <Stack.Screen
                name = 'First'
                component = {First}
                options = {{
                    headerShown:false
                  }}
            />

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
            <Stack.Screen
                name='HobbyCategory'
                component={HobbyCategory}
            />
            <Stack.Screen
                name='HobbyDetail'
                component={HobbyDetail}
            />
            <Stack.Screen
                name='Value'
                component={ValueScreen}
            />
            <Stack.Screen
                name='UploadPhoto'
                component={UploadPhoto}
            />
        </Stack.Navigator>
    )
}
