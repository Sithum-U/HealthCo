import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,

} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import { icons, COLORS, SIZES, FONTS, images } from '../constants';
// import CheckBox from '@react-native-community/checkbox';

import axios from "axios";
import Toast  from 'react-native-toast-message';
import Login from "../screens/Login";
import { CheckBox,Input } from 'react-native-elements'
import {
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import { color } from "react-native-reanimated";

function UpdateProfile({ navigation }) {
  
  const [UserName, setUserName] = useState();
  const [Email, setEmail] = useState();
  const [Phone, setPhone] = useState();


  function UpdateApi(){

    const data = {
      UserName,
      Email,
      Phone

    }

    if(!UserName){
      ToastAndroid.show("Please Enter User Name", ToastAndroid.SHORT)
    }else if(!Email){
      ToastAndroid.show("Please Enter Email", ToastAndroid.SHORT)
    }else if(!Phone){
      ToastAndroid.show("Please Enter Contact Number", ToastAndroid.SHORT)
    }else{
      axios.patch('http://10.0.2.2:8070/auth/update',data)
      .then(function (response) {
        if (Platform.OS === 'android') {
          ToastAndroid.show("Profile Updated", ToastAndroid.SHORT)
            navigation.navigate("Home")
        } else {
          AlertIOS.alert("Registration Success");
          navigation.navigate("Profile")
        }
      })
      .catch(function (error) {
        ToastAndroid.show("Registration Fail Try Again", ToastAndroid.SHORT)
      })
    }


 
  
  }



    function renderHeader() {
        return (
            <View style={{backgroundColor:'#E13340'}}>
            
                           <ImageBackground   style={{}}>
                           <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                      marginLeft:-40,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderRadius: SIZES.radius,
                           
                        }}
                    >
                        <Text style={{ ...FONTS.h3, color:COLORS.white }}>Update Profile</Text>
                    </View>
                </View>
                </View>
                </ImageBackground>
            </View>
        )
    }



    



function Update(){

  const [isSelected, setSelection] = useState(false);

    return(
      
<KeyboardAvoidingView behavior='padding'>
<View style={{

}}>

<View style={{
  width:'100%',
  height:700,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:'white',
  
  }}>

<View>
<View   style={styles.ViewOfInput}>

<Input
  onChangeText={text => setUserName(text)}
  placeholder='User'
  leftIcon={
    <Icon
      name='user'
      size={20}
      color='black'
    /> 
  }
/>
</View>

<View   style={styles.ViewOfInput}>
<Input
onChangeText={text => setEmail(text)}
  placeholder='Email'
  leftIcon={
    <Icon
      name='envelope'
      size={17}
      color='black'
    /> 
  }
/>
</View>



<View   style={styles.ViewOfInput}>
<Input onChangeText={text => setPhone(text)}
  placeholder='Contact'
  leftIcon={
    <Icon
      name='phone'
      size={20}
      color='black'
    /> 
  }
/>
</View>



<View>
  <View  style={{
    
  }}>
  </View>

  <View
  style={{
    marginTop:40
  }}
>
  <TouchableOpacity
      style={{
          width: SIZES.width * 0.78,
          padding: SIZES.padding2,
          backgroundColor: '#E13340',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom:20,
          borderRadius:10
        
      }}
      onPress={UpdateApi}
  >
      <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Update</Text>
  </TouchableOpacity>
</View>

</View>


 

</View>
</View>

</View>
</KeyboardAvoidingView>



)
}
  return (
    <SafeAreaView style={styles.container1}>
    {renderHeader()}
    {Update()}
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    },
    ViewOfInput:{
      marginTop:-18,
      padding: SIZES.padding3 * 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    container1: {
        flex: 1,
      },
      image: {
        flex: 1,
      },
      checkBoxContainer:{
        flexDirection:'row',
        alignContent:'center',
        marginLeft:40,
        marginTop:20
      },
      CheckBox:{
        width:30,
        height:30,
        marginRight:20
      },
      condition:{
        marginLeft:10,
        marginTop:15
      },
      image: {
        flex: 1,
        justifyContent: "center",
      }
})

export default UpdateProfile;
