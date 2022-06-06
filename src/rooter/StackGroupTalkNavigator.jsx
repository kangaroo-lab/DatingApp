import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GroupTalkList from '../screens/TalkScreens/Group/GroupTalkListScreen';
import GroupTalkBoard from '../screens/TalkScreens/Group/GroupTalkBoardScreen';

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
             name="GroupTalkList"
             component={GroupTalkList}
             options={{
               headerShown:false
             }}
            />
            <Stack.Screen
             name='GroupTalkBoard'
             component={GroupTalkBoard}
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
