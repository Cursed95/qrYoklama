import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './pages/Login';
import QRScreen from './pages/Qr';
import HomeScreen from './pages/Home';
import SuccessScreen from './pages/Success';
import FailScreen from './pages/Fail';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: 'Giriş Yap', headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Ana Sayfa', headerShown: false, headerBackVisible: false }}
      />
      <Stack.Screen
        name="QRScreen"
        component={QRScreen}
        options={{ title: 'Karekod Okut', headerShown: false}}
      />
      <Stack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        // Hide the title bar
        options={{ title: 'Tamamlandı', headerShown: false }}
      />
      <Stack.Screen
        name="FailScreen"
        component={FailScreen}
        // Hide the title bar
        options={{ title: 'Tamamlanamadı', headerShown: false }}
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
