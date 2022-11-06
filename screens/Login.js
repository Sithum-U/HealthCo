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
import { CheckBox,Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:'',
            password:'',
            toggleCheckBox: false
         }
    }


    ComponentDidMount(){
        this.loading().done();
    }
    loading = async() =>{
        var value = await AsyncStorage.getItem('user');
        if(value !=null){
            this.props.navigation.navigate('Home');
        }
    }


    
    render() { 
        return ( 
            
            <View style={ styles.container }>
                          <ImageBackground  source={images.Login_Image} resizeMode="cover" style={styles.image}> 
  

            <View>
            <KeyboardAvoidingView behavior='padding'>
            <View>
                
                <View>
                
                    <View style={{
                            padding: SIZES.padding3 * 2,
                            alignItems: 'center',
                            marginTop:190,
                            justifyContent: 'center',
                            width: SIZES.width * 0.78,
                            alignItems: 'center',
                            marginLeft:'auto', marginRight:'auto'
                        }}>           



                        <Input
                        style={{padding: 10 }}
                        onChangeText={(username) => this.setState({username})}
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
                    <View style={{
                            padding: SIZES.padding3 * 2,
                            alignItems: 'center',
                            marginTop:-15,
                            justifyContent: 'center',
                            width: SIZES.width * 0.78,
                            alignItems: 'center',
                            marginLeft:'auto', marginRight:'auto'
                        }}>

                        <Input
                        secureTextEntry={true}
                        style={{padding: 10 }}
                        onChangeText={(password) => this.setState({password})}
                        placeholder='Password'
                        leftIcon={
                            <Icon
                            name='lock'
                            size={17}
                            color='black'
                            /> 
                        }
                        />



                    </View>

                    <View  style={{ 
    marginLeft:45,  height:60, marginTop:-35
}}>
<View>
<CheckBox
containerStyle={{backgroundColor:'white' ,width:200,borderRadius:20}}
textStyle={{fontSize:14}}
title='Remember Me'
checked={this.state.toggleCheckBox}
onPress={() => this.setState({toggleCheckBox: !this.state.toggleCheckBox})}
/>
</View>
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
                                width: SIZES.width * 0.72,
                                padding: 6,
                                borderRadius:20,
                                backgroundColor: '#E13340',
                                alignItems: 'center',
                            }}
                            onPress={this.login}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                 
                </View>
                </View>
            </KeyboardAvoidingView>
           
            </View>

            <View>
            <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                marginTop:140,
                                width: SIZES.width * 0.72,
                                padding: 6,
                                backgroundColor:'#E13340',
                                alignItems: 'center',
                                borderRadius:20
                            }}
                            onPress={this.Register}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Register</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            </ImageBackground>
               
         
         
            </View>

         );
    }

    Register=()=>{
        this.props.navigation.navigate('Register');
    }

    login=()=>{

        const data= {
            Email :this.state.username,
            Password: this.state.password
        }

        if(!this.state.username){

             ToastAndroid.show("Please Enter Email", ToastAndroid.SHORT)
        }else if(!this.state.password){
            ToastAndroid.show("Please Enter Password", ToastAndroid.SHORT)

        }else if(!this.state.toggleCheckBox){
            
            ToastAndroid.show("Please check the box", ToastAndroid.SHORT)
        }else{
            axios.post('http://10.0.2.2:8070/auth/login',data)
            .then((res) => {
                if (Platform.OS === 'android') {
                    ToastAndroid.show("LoggedIn", ToastAndroid.SHORT)
                    this.props.navigation.navigate('Home');
                  } else {
                    AlertIOS.alert("LoggedIn"); 
                    this.props.navigation.navigate('Home');
                  }
            }) 

            .catch((err) => {
                ToastAndroid.show("Login Fail Try Again", ToastAndroid.SHORT)
              });
        }
    }
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
export default Login;