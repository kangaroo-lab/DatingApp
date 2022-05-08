import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Button} from 'react-native';

import TalkBoard from'../screens/TalkScreens/Pre/TalkBoardScreen';
import TalkList from '../screens/TalkScreens/Pre/TalkListScreen';

import TalkBoardHeader from'../components/preTalkBoardLeftHeader';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [key,setKey] = React.useState();
  function getCurrentParams (state) {
    if (state.routes) {
        return getCurrentParams(state.routes[state.index]);
    }
    return state.params || {};
}
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
             options={({navigation,route})=>({
               headerShown:true,
               headerRight:({ navigation, route, options, back }) => {
                 return (
                  <Button
                    title='いいね'
                    onPress={()=>{console.log('いいねの申告')}}
                  />
                 )}
             })
            }
            />
        </Stack.Navigator>
  );
};
