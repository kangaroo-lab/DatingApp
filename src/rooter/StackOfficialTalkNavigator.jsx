import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OfficialTalkBoard from'../screens/TalkScreens/Official/OfficialTalkBoardScreen';
import OfficialTalkList from '../screens/TalkScreens/Official/OfficialTalkListScreen';

import TalkBoardHeader from'../components/preTalkBoardLeftHeader';

const Stack = createNativeStackNavigator();

export default function StackOfficialNavigator() {
  return (
        <Stack.Navigator
         screenOptions={{
           headerShown:false
         }}
        >
            <Stack.Screen
             name="OfficialTalkList"
             component={OfficialTalkList}
             options={{
               headerShown:false
             }}
            />
            <Stack.Screen
             name='OfficialTalkBoard'
             component={OfficialTalkBoard}
             options={{
               headerTitle:' ',
               headerShown:true,
               headerRight:({route})=>(
                 <TalkBoardHeader route={route}/>
              ),
             }}
            />
        </Stack.Navigator>
  );
};
