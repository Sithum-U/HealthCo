import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import axios from "axios";

const Profile = ({navigation, route}) => {
  const [UserName, setUserName] = useState();
  const [Email, setEmail] = useState();
  const [Contact, setContact] = useState();

  useEffect(() => {
    axios.get('http://10.0.2.2:8070/auth/profile')
      .then((res) => {
        setUserName(res.data.UserName)
        setEmail(res.data.Email)
        setContact(res.data.Contact)
      })
      .catch((err) => {
        console.log("err=>" + err);
      });
  }, [])






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
                    <Text style={{ ...FONTS.h3, color:COLORS.white }}>Profile</Text>
                </View>
            </View>


            </View>
            </ImageBackground>
        </View>
    )
}













function ProfileBody() {








  return (
    <ImageBackground  source={images.Profile_Image} resizeMode="cover" style={{flex:1}}> 
  
  <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        
             <View style={{marginTop:20}}>
            <Image style={{
                height:120,
                width:120,
                borderRadius:100,

            }} source={images.avatar_5}/>
            </View>
            {/* {userData.map((v, i) => (  */}
            <View style={{marginTop:30}} >
            {/* <Text style={styles.userInfoTitle,{color:'#E13340'}}>{UserName}</Text> */}
            <Text style={styles.userInfoSubTitle}>{Email}</Text>
            <Text style={styles.userInfoSubTitle}>{Contact}</Text>
            <TouchableOpacity style={{width:130,backgroundColor:'#E13340',borderRadius:30, height:30,marginTop:20}} onPress={() => navigation.navigate("UpdateProfile")}>
                <Text style={{color:COLORS.white,textAlign:'center',fontSize:18}}>Update</Text>
              </TouchableOpacity>
          </View>
          {/* ))} */}
        <View style={styles.userBtnWrapper}>
   
              <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate("Order")}>
                <Text style={styles.userBtnTxt}>Order History</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate("Order")}>
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>

 
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('Start');
                }}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity> */}
      

        </View>
      
      </ScrollView>
    </ImageBackground>






  )
}




return(
    <SafeAreaView style={styles.container1}>
    {renderHeader()}
    {ProfileBody()}
</SafeAreaView>
);
};

export default Profile;

const styles = StyleSheet.create({
    container1: {
        flex: 1,
      },
  container: {
    flex: 1,
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    width: '77%',
    marginTop: 140,
  },
  userBtn: {
    marginBottom:10,
    borderColor: '#E13340',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderRadius:20
  },
  userBtnTxt: {
    color: '#E13340',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },

  userInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,

  },
  userInfoSubTitle: {
    fontSize: 16,
    color: '#666',

  },
});