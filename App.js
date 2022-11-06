import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import { Restaurant, OrderDelivery } from './screens'
import  Register  from './screens/Register'
import  Cart  from './screens/Cart'
import  Address  from './screens/Address'
import Tabs from './navigation/tabs'
import  Payment  from './screens/Payment'
import  Login  from './screens/Login'
import  Home  from './screens/Home'
import  Profile  from './screens/Profile'
import  Start  from './screens/Start'
import  Order  from './screens/Order'
import  Success  from './screens/OrderSuccess'
import  CartTab  from './screens/CartTab'
import  UpdateProfile  from './screens/UpdateProfile'

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Start'}
               
            >



                <Stack.Screen name="My Tasks" component={Tabs} />
                <Stack.Screen name="Home" component={Tabs} />
                <Stack.Screen name="Restaurant" component={Restaurant} />
                <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="Address" component={Address} />
                <Stack.Screen name="Payment" component={Payment} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Order" component={Order} />
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Success" component={Success} />
                <Stack.Screen name="CartTab" component={CartTab} />
                <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;