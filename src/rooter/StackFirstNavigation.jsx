import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogIn from '../screens/LogInScreen';
import SignIn from '../screens/SingInScreen';
import DrawerNavigation from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function StackFirstNavigator(){
    return(
        <Stack.Navigator
            initialRouteName='LogIn'
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
                name='Home'
                component={DrawerNavigation}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}
