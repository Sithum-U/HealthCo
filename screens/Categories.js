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

const Categories = ({ navigation }) => {

 
    const categoryData = [
        {
            id: "Exercises",
            name: "Exercises"
        },
        {
            id: "DietPlans",
            name: "Diet Plans"
        },
        {
            id: "BMI",
            name: "BMI"
        },

        {
            id: "Doctors",
            name: "Doctors"
        },
        {
            id: "BloodPressure",
            name: "Blood Pressure"
        }
    ]
    const [restaurantData, setProduct] = useState();
    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState()

   

        useEffect(() => {
            axios
              .get("http://10.0.2.2:8070/products")
              .then((res) => {
                ToastAndroid.show("Success", ToastAndroid.SHORT)
                setProduct(res.data);
                setRestaurants(res.data)
              })
              .catch((err) => {
                console.log("err=>" + err);
              });
          }, [0]);
    


    function onSelectCategory(category) {
        //filter restaurant
        let restaurantList = restaurantData.filter(a => a.status.includes(category.id))

        setRestaurants(restaurantList)

        setSelectedCategory(category)
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }

    function renderHeader() {
        return (
            <View style={{  height: 50 , backgroundColor:'#E13340'}}>
                {/* <ImageBackground  source={images.Header} style={styles.image}> */}
                <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: 60,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    {/* <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    /> */}
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
                        <Text style={{ ...FONTS.h3, color:COLORS.white, textAlign:'center'}}>Category</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                       
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center',

                    }}

                    onPress={() => navigation.navigate("Cart")}
                >
                    {/* <Image
                        source={icons.basket}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                            
                        }}
                    /> */}
                </TouchableOpacity>
                </View>
                {/* </ImageBackground> */}
            </View>
        )
    }
    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.mainColor : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        {/* <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        /> */}
                    </View>

                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
                
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
          

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    function renderRestaurantList() {
        
        const renderItem = ({ item }) => (
            
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("Restaurant", {
                    itemId:item._id,
                    itemImage:item.mobileImage,
                    itemPrice:item.prices,
                    itemTitle: item.title,
                    itemStatus:item.status
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

                {/* Restaurant Info */}
                <Text style={{ ...FONTS.body2 }}>{item.title}</Text>
                <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(item.status)}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* Rating */}
                    {/* <Image
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    /> */}
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
                data={restaurants}
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
            {renderMainCategories()}
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

export default Categories;