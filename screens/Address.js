import React, { useState } from "react";
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
  ScrollView
} from "react-native";
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { icons, COLORS, SIZES, FONTS, images } from '../constants';
import SelectDropdown from 'react-native-select-dropdown'

import {
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
// import  Dropdown  from 'react-native-material-dropdown';


const Address = ({ route, navigation }) => {

  const Cities = ["Colombo", "Kandy", "Galle", "Anuradhapura","Jaffna"]
  const State = ["Western Province", "Central Province", "Southern Province"]

  const [BuyerName, setBuyerName] = useState();
  const [phone, setPhone] = useState();
  const [Street, setStreet] = useState();
  const [City, setCity] = useState();
  const [Province, SetProvince] = useState();
 


  function Address(){

    if(!BuyerName){
      ToastAndroid.show("Required Buyer Name", ToastAndroid.SHORT)
    }
    else if(!phone){
      ToastAndroid.show("Required Buyer Contact number", ToastAndroid.SHORT)
    }
    else if(!Street){
      ToastAndroid.show("Required Street", ToastAndroid.SHORT)
    }
    else if(!City){
      ToastAndroid.show("Required City", ToastAndroid.SHORT)
    }
    else if(!Province){
      ToastAndroid.show("Required State", ToastAndroid.SHORT)
    }
    else{
      
  
      navigation.navigate("Payment", {
        BuyerName:BuyerName,
        phone: phone,
        Street:Street,
        City:City,
        Province:Province
        })
    }



 

  }








    
  function renderHeader() {
    return (
        <View style={{  height: 50 ,  backgroundColor:'#E13340'}}>
            {/* <ImageBackground  source={images.Header} style={styles.image}> */}
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

            <View style={{  alignItems: 'center', justifyContent: 'center' }}>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SIZES.radius,
                        width: 280,
                    }}
                >
                    <Text style={{ ...FONTS.h3, color:COLORS.white, textAlign:'center'}}>Delivery</Text>
                </View>
            </View>

            <TouchableOpacity
                style={{
                   
                    paddingRight: SIZES.padding * 2,
                    justifyContent: 'center',

                }}

                onPress={() => navigation.navigate("Cart")}
            >
                <Image
                    source={icons.basket}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        
                    }}
                />
            </TouchableOpacity>
            </View>
            {/* </ImageBackground> */}
        </View>
    )
}

function AddressBody() {

  const Cities = ["Colombo", "Kandy", "Galle", "Anuradhapura","Jaffna"]
  const State = ["Western Province", "Central Province", "Southern Province"]
  
  return (

      

    <View
    style={{flex:1}}>
  
    
  <ImageBackground  source={images.Address} style={styles.image}>
    
    <View style={{
      width:'100%',
      height:700,
      marginTop:220,
      alignItems: 'center',
      justifyContent: 'center',
      }}>

    <View>
    <View   style={styles.ViewOfInput}>
    <Input
      onChangeText={text => setBuyerName(text)}
      placeholder='Buyer Name'
    />
    </View>
    
    
    
    <View   style={styles.ViewOfInput}>
    <Input
    onChangeText={text => setPhone(text)}
      placeholder='Street'
    />
    </View>
    
    
    
    <View   style={styles.ViewOfInput}>
    <Input onChangeText={text => setStreet(text)}
      placeholder='Apt  (optional)'
    />
    </View>
    
    
    
    
    
    <View   style={styles.ViewOfInput}>
    

    <SelectDropdown
        buttonStyle={{
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        width: SIZES.width * 0.70,
        }}
        buttonTextStyle={{color:COLORS.darkgray,textAlign:'left'}}
        data={Cities}
        defaultButtonText="City"
        onSelect={(selectedItem, index) => {
          setCity(selectedItem)
        }}
/>
    </View>
    
    
    
    <View  style={styles.ViewOfInput}>
    
    <SelectDropdown
        buttonStyle={{
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        width: SIZES.width * 0.73,
        marginTop:20
        }}
        buttonTextStyle={{color:COLORS.darkgray,textAlign:'left'}}
        data={State}
        defaultButtonText="State/Province"
        onSelect={(selectedItem, index) => {
          SetProvince(selectedItem)
        }}
/>
    </View>
    
    
    
    
    
    <View>
      <View  style={{
        
      }}>
   
    
    
    
    
      <TouchableOpacity
          style={{
              width: SIZES.width * 0.84,
              padding: SIZES.padding2,
              backgroundColor: '#E13340',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom:20,
              marginTop:40,
              borderRadius:10
            
          }}
          onPress={Address}
      >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Continue</Text>
      </TouchableOpacity>
    </View>
    
    </View>
    
    
     
    
    </View>

    </View>
  
</ImageBackground> 
    </View>

  );
}
return(
<SafeAreaView style={styles.container}>
{renderHeader()}
{AddressBody()}
</SafeAreaView>
)
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
});

export default Address;
