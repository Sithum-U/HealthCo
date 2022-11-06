import React,{Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Image
} from "react-native";
import { icons, COLORS, SIZES, FONTS, images } from '../constants'



function Start({navigation}) {
    return ( 
        <View style={ styles.container }>
        <ImageBackground  source={images.getStart} resizeMode="cover" style={styles.image}> 

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
                           padding: SIZES.padding2,
                           borderRadius:20,
                           backgroundColor: COLORS.DarkRed,
                           alignItems: 'center'
                       }}
                       onPress={() => {
                          navigation.navigate('Login');
           }}>
                       <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Get Start</Text>
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
export default Start;
