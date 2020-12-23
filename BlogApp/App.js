import React from 'react';
import {NavigationContainer, navigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {  AntDesign ,Ionicons ,Entypo } from "@expo/vector-icons";
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import SignInScreenActivity from './Source/screens/SignInScreen'
import SignUpScreenActivity from './Source/screens/SignUpScreen'
import HomeScreenActivity from './Source/screens/Home'
import ProfileScreenActivity from './Source/screens/ProfileScreen'
import NotificationScreenActivity from './Source/screens/NotificationScreen'
import IndividualPostScreen from './Source/screens/IndividualPost'
import { AuthContext, AuthProvider } from "./Source/provider/AuthProvider";
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBvDb9x-BbMiHxsg_YendqGfoi9P6CXfLY",
  authDomain: "help-83b6c.firebaseapp.com",
  //databaseURL:"https://help-83b6c-default-rtdb.firebaseio.com",
  projectId: "help-83b6c",
  storageBucket: "help-83b6c.appspot.com",
  messagingSenderId: "519488680139",
  appId: "1:519488680139:web:588fba62f8bb40a740eb4e"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}


const AuthStack= createStackNavigator();
const HomeStack =createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator theme={MyTheme} initialRouteName="Home">
      <AppDrawer.Screen name="Home" component={HomeTabScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileScreenActivity} />
    </AppDrawer.Navigator>
  );
};

const HomeTabScreen = () => {
  return (
    <AuthContext.Consumer>
        {(auth) => (
    <HomeTab.Navigator initialRouteName="Home">
      <HomeTab.Screen
        name="Home"
        component={HomeStackScreen}
        
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
        }}
      />
      <HomeTab.Screen
        name="Notification"
        children={()=><NotificationScreenActivity currentUser={auth.CurrentUser} />}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
            ) : (
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color="white"
              />
            ),
        }}
      />
    </HomeTab.Navigator>
     )}
     </AuthContext.Consumer>
  );
};


const HomeStackScreen=() =>{
  return(
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreenActivity}  options={{ headerShown: false }}/>
      <HomeStack.Screen name="IndivialPost" component={IndividualPostScreen}  options={{ headerShown: false }}/>
    </HomeStack.Navigator>
  )
}

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreenActivity}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreenActivity}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const MyTheme ={
  dark:true,
  colors:{
    primary: "#ffffff",
    background: "#17001a",
    card: "#17001a",
    text: "#ffffff",
    border: "#000028",
    notification:"#9933FF",
  
    
  },
};

export default function App() {

  
  
  return (

    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer theme={MyTheme}>
             {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
    
    
   
  );
}
