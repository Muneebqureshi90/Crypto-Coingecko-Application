import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native'; // Import StatusBar
import CustomDrawerContent from '../components/navbar/CustomDrawerContent'; // Import your custom drawer component

// Import your screens
import SignupScreen from "../screens/auth/SignupScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import ProfileImageScreen from "../screens/auth/ProfileImageScreen";
import SuccessSetup from "../screens/auth/SuccessSetup";
import HomeScreen from "../screens/home/HomeScreen";
import PortfolioScreen from "../screens/Portfolio/PortfolioScreen";

// Create Stack and Drawer Navigators
const Stack = createNativeStackNavigator(); // Create Stack Navigator
const Drawer = createDrawerNavigator(); // Create Drawer Navigator

// Define your stack navigator
const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileImageScreen" component={ProfileImageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SuccessSetup" component={SuccessSetup} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PortfolioScreen" component={PortfolioScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

// Main App Navigation
export default function AppNavigation() {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="MainStack" component={MainStackNavigator} options={{ headerShown: false }} />
                <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Drawer.Screen name="Portfolio" component={PortfolioScreen} options={{ headerShown: false }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
