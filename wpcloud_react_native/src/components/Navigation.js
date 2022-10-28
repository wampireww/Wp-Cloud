import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'


const Navigation=()=> {

    const Stack=createNativeStackNavigator();

  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName='Login'>
           <Stack.Screen options={{headerShown:false}} name='Login' component={Login}/>
           <Stack.Screen name='Home' component={Home}/>
           <Stack.Screen name='Signup' component={Signup}/>
        </Stack.Navigator>     
    </NavigationContainer>
  )
}

export default Navigation