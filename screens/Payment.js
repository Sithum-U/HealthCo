import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  Text,
  Image,
  
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { icons, COLORS, SIZES, FONTS, images } from '../constants';
import DatePicker from "react-native-datepicker";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import {
    ToastAndroid,
    Platform,
    AlertIOS,
  } from 'react-native';

function Payment({route,navigation}) {

    const [date, setDate] = useState("");
    const [CardName, setCardName] = useState();
    const [CardNumber, setCardNumber] = useState();
    const [CardCVV, setCardCVV] = useState();


    const [BuyerNames, setBuyerName] = useState();
    const [phones, setPhone] = useState();
    const [Streets, setStreet] = useState();
    const [Cities, setCity] = useState();
    const [Provinces, SetProvince] = useState();
   
    const data={
        BuyerNames,
        phones,
        Streets,
        Cities,
        Provinces
    }

    React.useEffect(() => {
        let { BuyerName,phone,Street,City,Province  } = route.params;
        setBuyerName(BuyerName)
        setPhone(phone)
        setStreet(Street)
        setCity(City)
        SetProvince(Province)

    })



    function placeOrder(){



        if(!CardName){
            ToastAndroid.show("Required Card Name", ToastAndroid.SHORT)
        }
        else if(!CardNumber){
            ToastAndroid.show("Required Card Number", ToastAndroid.SHORT)
        }
        else if(!CardCVV){
            ToastAndroid.show("Required Card CVV", ToastAndroid.SHORT)
        }
        else if(!date){
            ToastAndroid.show("Required Card Expire Date", ToastAndroid.SHORT)
        }
        else{
            ToastAndroid.show("Success", ToastAndroid.SHORT)
            axios.post('http://10.0.2.2:8070/orders/add',data)
            .then(function (response) {
              if (Platform.OS === 'android') {
                ToastAndroid.show("Order Success", ToastAndroid.SHORT)
                  navigation.navigate("Success")
              } else {
                AlertIOS.alert("msg");
                navigation.navigate("Success")
              }
            })
            .catch(function (error) {
              console.log(error);
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
                        width: 60,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.nearby}
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
                        <Text style={{ ...FONTS.h3, color:COLORS.white, textAlign:'center'}}>Payment</Text>
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


function makePayment(){




        return(

            <View style={ styles.container }>
                    
            <ImageBackground  source={images.Payment_Image} resizeMode="cover" style={styles.image}> 
            <View style={{
                marginTop:250,
                padding: SIZES.padding4 * 2,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <TextInput style={{
                    width: SIZES.width * 0.7,
                    
                    padding: SIZES.padding,
                    borderBottomWidth:1,
                    borderColor:COLORS.black,
                    alignItems: 'center',
                }}
                onChangeText={text => setCardNumber(text)}
            placeholder='Card number'

            underlineColorAndroid='transparent'
            ></TextInput>
            </View>

            <View style={{
                   padding: SIZES.padding4 * 2,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <TextInput style={{
                    width: SIZES.width * 0.7,
                    
                    padding: SIZES.padding,
                    borderBottomWidth:1,
                    borderColor:COLORS.black,
                    alignItems: 'center',
                }}
            placeholder='Cardholder Name'
            onChangeText={text => setCardName(text)}
            underlineColorAndroid='transparent'
            ></TextInput>


            </View>

            <View style={{
                   padding: SIZES.padding4 * 2,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <TextInput style={{
                    width: SIZES.width * 0.7,
                    
                    padding: SIZES.padding,
                    borderBottomWidth:1,
                    borderColor:COLORS.black,
                    alignItems: 'center',
                }}
            placeholder='CVV'
            onChangeText={text => setCardCVV(text)}
            underlineColorAndroid='transparent'
            ></TextInput>


            </View>
            <View style={{
                  padding: SIZES.padding4 * 2,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:20
            }}>



            <DatePicker
            style={{
                width: SIZES.width * 0.71,
                borderWidth: 0,
                }}
                mode="date"
                format="YYYY-MM-DD"
                minDate="2021-05-01"
                maxDate="2025-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"

                iconSource={require('../assets/images/Date.png')}
                onDateChange={(data)=>{
                    setDate(data)
                }}
                date ={date}
            />
            </View>



                <View
                    style={{
                        flex: 1,
                        marginTop:80,
                        padding: SIZES.padding * 2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
>




  <TouchableOpacity
      style={{
          width: SIZES.width * 0.8,
          padding: SIZES.padding21,
          marginTop:5,
          backgroundColor: '#E13340',
          alignItems: 'center',
          borderRadius: SIZES.radius
      }}
      onPress={placeOrder}
  >
      <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Confirm</Text>
  </TouchableOpacity>
</View>
     
        </ImageBackground>
        
        
        
        </View>
  
    )


}
    return ( 
    <SafeAreaView style={styles.container}>
        {renderHeader()}
        {makePayment()}
    </SafeAreaView> );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center",
      }
})



export default Payment;