import React,{useEffect,useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ImageBackground
} from "react-native";
import axios from "axios";
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import {
    ToastAndroid,
    Platform,
    AlertIOS,
  } from 'react-native';
const Home = ({ navigation }) => {
    function renderHeader() {
        return (
            <View style={{  height: 50 , marginBottom:30, backgroundColor:'#E13340'}}>
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
                        <Text style={{ ...FONTS.h3, color:COLORS.white, textAlign:'center'}}>Home</Text>
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
    function renderRestaurantList() {

        const [products, setProduct] = useState();

        useEffect(() => {
            axios
              .get("http://10.0.2.2:8070/products")
              .then((res) => {
                ToastAndroid.show("Success", ToastAndroid.SHORT)
                setProduct(res.data);
              })
              .catch((err) => {
                console.log("err=>" + err);
              });
          }, [20]);
    


        const renderItem = ({ item }) => (

            
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("Restaurant", {
                    itemId:item._id,
                    itemImage:item.mobileImage,
                    itemPrice:item.prices,
                    itemTitle: item.title,
                    itemStatus:item.status,
                    itemDescription:item.description
                    })}
            >
            
                {/* Image */}
                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >

                    <Image 
                    source={{uri: `http://127.0.0.1:8081${item.mobileImage}`}}

                    resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    /> 


                </View>


                <Text style={{ ...FONTS.body2 }}>{item.title}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* Rating */}
                    <Image
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.mainColor,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>Rs.{item.prices}.00</Text>

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={products}
                keyExtractor={item => `${item._id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center",
      }
})

export default Home;