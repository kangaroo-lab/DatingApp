import React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import firebase from 'firebase';
import { Alert } from 'react-native';

import TabNavigator from './TabNavigator';
import Group from '../screens/GroupScreen'
import Setting from '../screens/settingScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation(){
    function handlePress(props){
        firebase.auth().signOut()
        .then(()=>{
            props.navigation.getParent().reset({
                index:0,
                routes:[{ name:'LogIn' }]
            })
        })
        .catch(()=>{
            Alert.alert('ログアウトに失敗しました')
        })
    }

    function DrawerContents(props){
        return(
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label='ログアウト'
                    onPress={()=>handlePress(props)}
                />
            </DrawerContentScrollView>
        )
    }
    return(
        <Drawer.Navigator
            id='leftDrawer'
            drawerContent={(props)=><DrawerContents {...props}/>}
        >
            <Drawer.Screen
                name='Top'
                component={TabNavigator}
                options={{
                    headerShown:false
                }}
            />
            <Drawer.Screen
                name='Group()'
                component={Group}
            />
            <Drawer.Screen
                name='Setting'
                component={Setting}
            />
        </Drawer.Navigator>
    )
}
