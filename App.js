import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './pages/Login';
import QRScreen from './pages/Qr';
import HomeScreen from './pages/Home';
import DoneScreen from './pages/Done';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Giriş Yap' }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Ana Sayfa', headerBackVisible: false }}
        />
        <Stack.Screen
          name="QRScreen"
          component={QRScreen}
          options={{ title: 'Karekod Okut' }}
        />
        <Stack.Screen
          name="DoneScreen"
          component={DoneScreen}
          // Hide the title bar
          options={{ title: 'Tamamlandı', headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
