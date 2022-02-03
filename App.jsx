import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import Top from'./src/screens/TopScreen';
import TalkList from'./src/screens/TalkListScreen';

export default function App() {
  return (
      <TalkList/>
  );
};
