import React,{Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage,
    TouchableOpacity,
    ImageBackground,
    Image
} from "react-native";
import {
    ToastAndroid,
    Platform,
    AlertIOS,
  } from 'react-native';
import axios from "axios";
import { icons, COLORS, SIZES, FONTS, images } from '../constants'
import LinearGradient from 'react-native-linear-gradient';


function OrderSuccess({navigation, route}) {
    return ( 
        <View style={ styles.container }>
        <ImageBackground  source={images.PlaceOrder} resizeMode="cover" style={styles.image}> 

               <View
                   style={{
                       padding: SIZES.padding * 2,
                       alignItems: 'center',
                       marginTop:480,
                       justifyContent: 'center'
                   }}
               >
                   <TouchableOpacity
                       style={{
                           width: SIZES.width * 0.74,
                           padding: SIZES.padding21,
                           borderRadius:15,
                           backgroundColor: COLORS.DarkRed,
                           alignItems: 'center'
                       }}
                       onPress={() => {
                          navigation.navigate('Home');
           }}>
                       <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Back to Home</Text>
                   </TouchableOpacity>
               </View>
       </ImageBackground>
       </View>


     );
}


const styles = StyleSheet.create({
 
    container: {
        flex: 1,
      },
      image: {
        flex: 1,
        justifyContent: "center",
      },

});
export default OrderSuccess;
