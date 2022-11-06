import React, { useEffect,useState } from "react";
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
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { isIphoneX } from 'react-native-iphone-x-helper'
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';


import {
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";
const CartTab = ({ route, navigation }) => {

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
                    <Text style={{ ...FONTS.h3, color:COLORS.white, textAlign:'center'}}>Cart</Text>
                </View>
            </View>

            <TouchableOpacity
                style={{
                   
                    paddingRight: SIZES.padding * 2,
                    justifyContent: 'center',

                }}

                onPress={() => navigation.navigate("Home")}
            >
                <Image
                      source={icons.Home}
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

function CartBody(){

  const [cartItem, setProduct] = useState();
  const [total, setTotal] = useState();
  const [Tot, setTot] = useState(0);
  const [ defaultAnimationDialog, setDefaultAnimationDialog ] = useState(false);
  const [Id, setId] = useState();


  useEffect(() => {
      axios
        .get("http://10.0.2.2:8070/carts")
        .then((res) => {
          ToastAndroid.show("Success", ToastAndroid.SHORT)
          setProduct(res.data);

          let totals =0;
  
          res.data.map((tot)=>{
            
            totals += tot.total
            
            setTot(totals);

          })
    
        })
        .catch((err) => {
          console.log("err=>" + err);
        });
    }, [20]);

const deleteFromCart = (id) => {

  setId(id)
  setDefaultAnimationDialog(true)
}

 
  const renderItem = ({ item }) => (
    <View>
      <View style={{ marginBottom:15}}>
        <TouchableOpacity style={{width:'98%', backgroundColor:COLORS.white,borderRadius:30}}>
          <View style={styles.image2StackStackRow}>
            <View style={styles.image2StackStack}>
              <View style={styles.image2Stack}>
                <Image
                  source={{uri: `http://127.0.0.1:8081${item.itemImage}`}}
                  resizeMode="contain"
                  style={styles.image2}
                ></Image>
                <View style={styles.productHeader}>
                <Text style={{color:'black'}}>{item.itemTitle}</Text>
                <Text style={{color:'black'}}>Qty : {item.qty}</Text>
                <Text style={styles.itemPrice}>Rs.{item.price}.00</Text>
                </View>
                

              </View>
            </View>
            <View style={styles.loremIpsum12RowColumn}>
              <TouchableOpacity style={styles.button13}
                        onPress={deleteFromCart.bind(this,item._id)}
                       
              > 
                <View style={styles.rect15Stack}>
                  <View style={styles.rect15}></View>
                  <MaterialCommunityIconsIcon
                    name="delete"
                    style={styles.icon9}
                  ></MaterialCommunityIconsIcon>
                </View> 
              </TouchableOpacity>





            </View>
          </View>
        </TouchableOpacity>        
      </View>
      <Dialog
          onDismiss={() => {
            setDefaultAnimationDialog(false);
          }}
          width={0.9}
          visible={defaultAnimationDialog}
          rounded
          actionsBordered
          dialogTitle={
            <DialogTitle
              title="Are you sure to delete?"
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                bordered
                onPress={() => {
                  setDefaultAnimationDialog(false);
                }}
                key="button-1"
              />
              <DialogButton
                text="DELETE"
                bordered
                onPress={() => {
                  setDefaultAnimationDialog(false);

                  axios.delete(`http://10.0.2.2:8070/carts/delete/${Id}`).then((res) => {
    ToastAndroid.show("Removed", ToastAndroid.SHORT)

    axios
    .get("http://10.0.2.2:8070/carts")
    .then((res) => {
      setProduct(res.data);

      setTot(0);
      let totals =0;
      res.data.map((tot)=>{
        totals += tot.total
        setTot(totals);

      })




    
    })
    .catch((err) => {
      console.log("err=>" + err);
        
    });

  }).catch((err) => {
      console.log("err=>" + err);
  });
 }}
    key="button-2"
  />
   </DialogFooter>
    }>
 <DialogContent
  style={{
      backgroundColor: '#F7F7F8',
}}>
    <Text>
       Once click on selected item permanently will be deleted 
     </Text>
  </DialogContent>
</Dialog>









    </View>
  )
  return(
    <View style={{flex:1}}>
<View style={{flex:0.8}}>


<FlatList
    data={cartItem}
    keyExtractor={item => `${item._id}`}
    renderItem={renderItem}
    contentContainerStyle={{
        paddingHorizontal: SIZES.padding * 2,
        paddingBottom: 30
    }}
/>


</View>


  <View style={{flex:0.48,backgroundColor:COLORS.white,width:'95%',marginLeft:'auto', marginRight:'auto',  borderRadius: 30,}}>

  <View style={styles.subTotalRow}>

  <View style={styles.discountRow}>
  </View>
  <View style={styles.discountRow}>
    <Text style={{...FONTS.h2},styles.total}>Total</Text>
    <Text style={{...FONTS.h4},styles.loremIpsum11}>Rs.{Tot}.00</Text>
  </View>


  <View
                  style={{
                      padding: SIZES.padding * 2,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
              >
                  <TouchableOpacity
                      style={{
                          width: SIZES.width * 0.84,
                          padding: SIZES.padding,
                          backgroundColor: "#E13340",
                          alignItems: 'center',
                          borderRadius: SIZES.radius
                      }}
                      onPress={() => navigation.navigate("Address")}
                  >
                      <Text style={{ color: COLORS.white, ...FONTS.h2 , marginLeft:'auto', marginRight:'auto'}}>Check Out</Text>
                  </TouchableOpacity>
              </View>
</View>
</View>
</View>



  )
}

return (
    <SafeAreaView style={styles.container}>
        {renderHeader()}
        {CartBody()}
    </SafeAreaView>
)




}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cart: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 40
  },
  button3: {
    width: 52,
    height: 52,
    marginLeft: 184
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 52,
    height: 52,
    position: "absolute"
  },
  icon: {
    top: 0,
    left: 11,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40
  },
  ellipseStack: {
    width: 52,
    height: 52
  },

  button1: {
    width: 42,
    height: 42
  },
  ellipse1: {
    top: 0,
    left: 0,
    width: 42,
    height: 42,
    position: "absolute"
  },
  icon1: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(9,9,9,1)",
    fontSize: 40
  },
  ellipse1Stack: {
    width: 42,
    height: 42
  },
  button2: {
    width: 251,
    height: 42,
    marginLeft: 20
  },
  rect: {
    width: 251,
    height: 42,
    backgroundColor: "#E6E6E6",
    borderRadius: 30,
    flexDirection: "row"
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 27,
    height: 27,
    width: 25
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    width: 192,
    height: 24,
    marginLeft: 2,
    marginTop: 2
  },
  icon2Row: {
    height: 27,
    flexDirection: "row",
    flex: 1,
    marginRight: 15,
    marginLeft: 17,
    marginTop: 7
  },
  button1Row: {
    height: 42,
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 30,
    marginRight: 32
  },
  button12: {
    top: 0,
    marginLeft:'auto',
    marginRight:'auto',
    width: '95%',
    height: 120,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    shadowColor: "rgba(0,0,0,1)",
  
    elevation: 72,
    shadowOpacity: 0.13,
    shadowRadius: 24
  },
  image2: {
    marginLeft:5,
    marginBottom:10,
    borderRadius:100,
    width: 130,
    height: 130,
 
  },
  productHeader: {
    top: 30,
    left: 155,
    position: "absolute",
  },


  image2StackStack: {
    width: '90%',
    height: 120
  },
  button10: {
    width: 20,
    height: 20,
    marginLeft: 1,
    marginTop: 19
  },
  rect13: {
    top: 2,
    left: 1,
    width: 18,
    height: 17,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)"
  },
  icon7: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(99,227,87,1)",
    fontSize: 20
  },
  rect13Stack: {
    width: 20,
    height: 20
  },

  button13: {
    width: 40,
    height: 43,
    marginTop: 6,
    marginLeft: 7
  },
  rect15: {
    top: 0,
    left: 1,
    width: 37,
    height: 43,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)"
  },
  icon9: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(239,70,59,1)",
    fontSize: 40
  },
  rect15Stack: {
    width: 40,
    height: 43
  },
  itemPrice: {
    marginTop:15,
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  loremIpsum12RowColumn: {
    width: 47,
    marginLeft: 3,
    marginTop: 19,
    marginBottom: 5
  },

  image2StackStackRow: {
    height: 120,
    width:'92%',
    flexDirection: "row",
  },


  subTotal: {
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  loremIpsum7: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 18,
    marginLeft: 137
  },
  subTotalRow: { 
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  discount: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 18
  },
  loremIpsum8: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 18,
    marginLeft: 149
  },
  discountRow: {
    height: 24,
    flexDirection: "row",
    marginTop: 7,
    marginLeft:'auto',
    marginRight:'auto'

  },

  total: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 18,
  },
  loremIpsum11: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginLeft: 174
  },







  totalRow: {
    height: 24,
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 27,
    marginRight: 17
  },
  button9: {
    width: 259,
    height: 43,
    marginTop: 10,
    marginLeft: 36
  },
  rect11: {
    width: 259,
    height: 43,
    backgroundColor: "rgba(239,70,59,1)",
    borderRadius: 30
  },
  checkOut: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginTop: 13,
    marginLeft: 75
  },
  rect5: {
    width: 375,
    height: 70,
    backgroundColor: "rgba(255,255,255,1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 72,
    shadowOpacity: 1,
    shadowRadius: 24,
    flexDirection: "row",
    marginTop: 22
  },
  button6: {
    width: 39,
    height: 38,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 2
  },
  rect8: {
    width: 39,
    height: 38,
    backgroundColor: "rgba(255,255,255,1)"
  },
  image1: {
    width: 38,
    height: 38
  },
  button4: {
    width: 40,
    height: 43,
    marginLeft: 27
  },
  rect6: {
    top: 3,
    left: 0,
    width: 40,
    height: 38,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)"
  },
  icon3: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40
  },
  rect6Stack: {
    width: 40,
    height: 43
  },
  button5: {
    width: 41,
    height: 43,
    marginLeft: 40,
    marginTop: 2
  },
  rect7: {
    top: 0,
    left: 0,
    width: 41,
    height: 41,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)"
  },
  icon4: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(239,70,59,1)",
    fontSize: 40
  },
  rect7Stack: {
    width: 41,
    height: 43
  },
  button7: {
    width: 30,
    height: 43,
    marginLeft: 38,
    marginTop: 2
  },
  rect9: {
    width: 30,
    height: 43,
    backgroundColor: "rgba(255,255,255,1)"
  },
  icon5: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 43,
    width: 30
  },
  button8: {
    width: 40,
    height: 43,
    backgroundColor: "#fff",
    marginLeft: 30,
    marginTop: 2
  },
  rect10: {
    top: 7,
    left: 0,
    width: 40,
    height: 31,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)"
  },
  icon6: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40
  },
  rect10Stack: {
    width: 40,
    height: 43
  },
  button6Row: {
    height: 45,
    flexDirection: "row",
    flex: 1,
    marginRight: 20,
    marginLeft: 30,
    marginTop: 7
  },
  button18: {
    width: 259,
    height: 43,
    marginTop: -373,
    marginLeft: 58
  },
  rect12: {
    width: 259,
    height: 43,
    backgroundColor: "rgba(239,70,59,1)",
    borderRadius: 30
  },
  continueShopping: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginTop: 14,
    marginLeft: 45
  },
  button14: {
    top: 0,
    left: 0,
    width: 328,
    height: 110,
    position: "absolute",
    backgroundColor: "rgba(255,251,251,1)",
    borderRadius: 18,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 15
    },
    elevation: 72,
    shadowOpacity: 0.13,
    shadowRadius: 24
  },
  healthco: {
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  button15: {
    width: 20,
    height: 20,
    marginLeft: 46
  },
  rect16: {
    top: 2,
    left: 1,
    width: 18,
    height: 17,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)"
  },
  icon10: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(99,227,87,1)",
    fontSize: 20
  },
  rect16Stack: {
    width: 20,
    height: 20
  },
  button16: {
    width: 20,
    height: 20,
    marginLeft: 22
  },
  rect17: {
    width: 20,
    height: 20,
    backgroundColor: "rgba(255,255,255,1)"
  },
  icon11: {
    color: "rgba(250,93,93,1)",
    fontSize: 20,
    height: 20,
    width: 20
  },
  healthcoRow: {
    height: 20,
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 104,
    marginRight: 14
  },
  cheese1: {
    fontFamily: "roboto-regular",
    color: "rgba(84,165,218,1)"
  },
  mutton1: {
    fontFamily: "roboto-regular",
    color: "rgba(250,93,93,1)",
    marginLeft: 8
  },
  cheese1Row: {
    height: 17,
    flexDirection: "row",
    marginLeft: 13,
    marginRight: 34
  },
  colomboKaluthara1: {
    top: 10,
    left: 24,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  icon14: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(239,70,59,1)",
    fontSize: 29,
    height: 32,
    width: 30
  },
  colomboKaluthara1Stack: {
    width: 146,
    height: 32,
    marginTop: 5
  },
  cheese1RowColumn: {
    width: 146,
    marginTop: 13
  },
  button17: {
    width: 40,
    height: 43,
    marginLeft: 7
  },
  rect18: {
    top: 0,
    left: 1,
    width: 37,
    height: 43,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)"
  },
  icon12: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(239,70,59,1)",
    fontSize: 40
  },
  rect18Stack: {
    width: 40,
    height: 43
  },
  rs551: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 1
  },
  button17Column: {
    width: 47,
    marginLeft: 24,
    marginBottom: 6
  },
  cheese1RowColumnRow: {
    height: 67,
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 90,
    marginRight: 6
  },
  image3: {
    top: 2,
    left: 0,
    width: 110,
    height: 110,
    position: "absolute"
  },
  button14Stack: {
    width: 313,
    height: 112,
    marginLeft: 30,
    marginTop:-400
  },

image: {
    flex: 1,
    justifyContent: "center",
  }
});

export default CartTab;
