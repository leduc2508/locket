import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { AppNavigationStyle } from '../../assets/styles/AppNavigation.Style';
import ThemeScreen from '../screens/ThemeScreen';
import HomeScreen from '../screens/HomeScreen';
import ActivityCalendarScreen from '../screens/ActivityCalendarScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PasswordScreen from '../screens/PasswordScreen';
import FullnameScreen from '../screens/FullnameScreen';
import UsernameScreen from '../screens/UsernameScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Theme">
          <Stack.Screen
            name="Theme"
            component={ThemeScreen}
            options={{
              title: '',
              headerStyle: { backgroundColor: '#111' },
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: { backgroundColor: '#111' },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={AppNavigationStyle.button}
                >
                  <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: { backgroundColor: '#111' },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={AppNavigationStyle.button}
                >
                  <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Password"
            component={PasswordScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: { backgroundColor: '#111' },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={AppNavigationStyle.button}
                >
                  <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Fullname"
            component={FullnameScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: { backgroundColor: '#111' },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={AppNavigationStyle.button}
                >
                  <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Username"
            component={UsernameScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: { backgroundColor: '#111' },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={AppNavigationStyle.button}
                >
                  <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ route }) => {
              const from = route?.params?.from;
              return {
                headerShown: false,
                animation: from === 'password' ? 'slide_from_bottom' : 'slide_from_right',
              };
            }}
          />

          <Stack.Screen
            name="ActivityCalendar"
            component={ActivityCalendarScreen}
            options={({ route }) => ({
              headerShown: false,
              animation: route?.params?.direction === 'left' ? 'slide_from_left' : 'slide_from_right',
            })}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
}