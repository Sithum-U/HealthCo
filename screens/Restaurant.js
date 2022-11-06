import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    Animated
} from "react-native";
import { isIphoneX } from 'react-native-iphone-x-helper'
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import axios from "axios";
import {
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';

const Restaurant = ({ route, navigation }) => {

    const scrollX = new Animated.Value(0);
    const [itemId, setItemId] = React.useState(null);
    const [itemImage, setItemImage] = React.useState(null);
    const [itemPrice, setItemPrice] = React.useState(null);
    const [itemTitle, setItemTitle] = React.useState(null);
    const [itemStatus, setItemStatus] = React.useState(null);
    const [itemDescriptions, setItemDescriptions] = React.useState(null);

    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState([]);

    React.useEffect(() => {
        let { itemId,itemImage,itemPrice,itemTitle,itemStatus,itemDescription  } = route.params;

        setItemId(itemId)
        setItemImage(itemImage)
        setItemPrice(itemPrice)
        setItemTitle(itemTitle)
        setItemStatus(itemStatus)
        setItemDescriptions(itemDescription)
    })

function addToCart(){
const data = {
  itemId,
  itemImage,
  itemTitle,
  orderItems
}

  axios
  .post("http://10.0.2.2:8070/carts/add",data)
  .then((res) => {
    ToastAndroid.show("Success", ToastAndroid.SHORT)
    navigation.navigate("Cart")
  })
  .catch((err) => {
    console.log("err=>" + err);
  });

}


    function editOrder(action, status, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId == status)

        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: status,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)
        }
    }



    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)
        return itemCount
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)
        return total.toFixed(2)
    }





    function renderHeader() {
        return (
            <View style={{  height: 50 , marginBottom:30, backgroundColor:'#E13340'}}>
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
                        <Text style={{ ...FONTS.h3, color:COLORS.white, textAlign:'center'}}>Menu</Text>
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

    function renderFoodInfo() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >


            
                        <View
                            key={`menu-${itemId}`}
                            style={{ alignItems: 'center' }}
                        >
                            <View style={{ height: SIZES.height * 0.35 }}>
                                {/* Food Image */}
                                <Image
                                      source={{uri: `http://127.0.0.1:8081${itemImage}`}}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width,
                                        height: "100%"
                                    }}
                                />

                                {/* Quantity */}
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: - 20,
                                        width: SIZES.width,
                                        height: 50,
                                        justifyContent: 'center',
                                        flexDirection: 'row'
                                    }}
                                >
                                      <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopLeftRadius: 25,
                                            borderBottomLeftRadius: 25
                                        }}
                                        onPress={() => editOrder("-", itemStatus, itemPrice)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>-</Text>
                                    </TouchableOpacity> 

                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopRightRadius: 25,
                                            borderBottomRightRadius: 25
                                        }}
                                        onPress={() => editOrder("+", itemStatus, itemPrice)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

 
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: 'center',
                                    marginTop: 15,
                                    paddingHorizontal: SIZES.padding * 2
                                }}
                            >
                                <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>Rs. {itemPrice}.00</Text>
                                <Text style={{ ...FONTS.h3,marginTop:-10, marginBottom:20}}>{itemTitle}</Text>
                                <Text style={{letterSpacing:1}}>{itemDescriptions}</Text>
                            </View>
                        </View>
         
            </Animated.ScrollView>
        )
    }



    
  

    function renderOrder() {
        return (
            <View>
                {
                   
                }
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1,
                            marginTop:40
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{getBasketItemCount()} items in Cart</Text>
                        <Text style={{ ...FONTS.h3 }}>Rs.{sumOrder()}</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3
                        }}
                    >
                    
                    </View>

                    {/* Order Button */}
                    <View
                        style={{
                            padding: SIZES.padding * 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.DarkRed,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
    
                            onPress={addToCart}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {isIphoneX() &&
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -34,
                            left: 0,
                            right: 0,
                            height: 34,
                            backgroundColor: COLORS.white
                        }}
                    >
                    </View>
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    },
    image: {
        flex: 1,
        justifyContent: "center",
      }
})

export default Restaurant;