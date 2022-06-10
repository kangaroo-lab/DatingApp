import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import StackOfficialNavigator from './StackOfficialTalkNavigator';
import StackGroupNavigator from './StackGroupTalkNavigator';
import Group from '../screens/TalkScreens/Group/GroupSearchScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function BottomTabNavigator(){
    // TalkBoardでBottomTabBarを隠す
    function getHeaderShown(route){
        const routeName = getFocusedRouteNameFromRoute(route)??'TalkList';
        if(routeName=='TalkBoard'||routeName=='OfficialTalkBoard'||routeName=='GroupTalkBoard'){
            return {position:'absolute',bottom:-100};
        }else{
            return null;
        }
    }
    return(
    <Tab.Navigator
        initialRouteName='PREMATCH'
        screenOptions={{
            headerShown:false,
        }}
    >
        <Tab.Screen
         name='PREMATCH'
         component={StackNavigator}
         options={({route})=>({
            tabBarStyle: getHeaderShown(route),
         })}
        />
        <Tab.Screen
         name='OFFICIALMATCH'
         component={StackOfficialNavigator}
         options={({route})=>({
            tabBarStyle: getHeaderShown(route),
        })}
        />
        <Tab.Screen
         name='GROUPMATCH'
         component={StackGroupNavigator}
         options={({route})=>({
             tabBarStyle:getHeaderShown(route)
         })}
        />
    </Tab.Navigator>
    )
}
