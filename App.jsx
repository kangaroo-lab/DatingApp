import { StatusBar } from 'expo-status-bar';
import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';


import Top from'./src/screens/TopScreen';
import TalkList from'./src/screens/TalkListScreen';
import TalkBoard from'./src/screens/TalkBoardScreen';
import Profile from'./src/screens/ProfileScreen';

export default function App() {
  return (
      <Top/>
  );
};
