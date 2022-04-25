import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './TabNavigator'

const Drawer = createDrawerNavigator();

export default function DrawerNavigation(){
    return(
        <Drawer.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <Drawer.Screen
                name='Top'
                component={TabNavigator}
            />
        </Drawer.Navigator>
    )
}
