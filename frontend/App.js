import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Dongle-Regular': require('./assets/fonts/Dongle-Regular.ttf'),
        'Dongle-Bold': require('./assets/fonts/Dongle-Bold.ttf'),
        'Dongle-Light': require('./assets/fonts/Dongle-Light.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) return null; 

  return <AppNavigation />;
}
