import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TalkBoard from'../screens/TalkScreens/Pre/TalkBoardScreen';
import TalkList from '../screens/TalkScreens/Pre/TalkListScreen';

import TalkBoardHeader from'../components/preTalkBoardLeftHeader';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
        <Stack.Navigator
         screenOptions={{
           headerShown:false
         }}
        >
            <Stack.Screen
             name="TalkList"
             component={TalkList}
             options={{
               headerShown:false
             }}
            />
            <Stack.Screen
             name="TalkBoard"
             component={TalkBoard}
             options={{
               headerTitle:' ',
               headerShown:true,
               headerRight:()=>(
                 <TalkBoardHeader/>
              ),
             }}
            />
        </Stack.Navigator>
  );
};
