import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '..'

const Nav = createNativeStackNavigator()

const InNav = () => (
  <Nav.Navigator>
    <Nav.Screen name="Home" component={Home} />
  </Nav.Navigator>
)
