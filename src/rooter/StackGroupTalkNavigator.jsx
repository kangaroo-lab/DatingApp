import React from 'react';
import {
  Button
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import GroupTalkList from '../screens/TalkScreens/Group/GroupTalkListScreen';
import GroupTalkBoard from '../screens/TalkScreens/Group/GroupTalkBoardScreen';
import GroupMatchScreen from '../screens/TalkScreens/Group/GroupMatchScreen';

import TalkBoardHeader from'../components/preTalkBoardLeftHeader';

const Stack = createNativeStackNavigator();

export default function StackOfficialNavigator() {
  const navigation = useNavigation()

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
             }}
            />
            <Stack.Screen
              name = 'Top'
              component = {GroupMatchScreen}
              options = {{
                headerTitle:"",
                headerShown:true
              }}
            />
        </Stack.Navigator>
  );
};
