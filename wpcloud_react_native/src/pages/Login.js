import React, { useEffect, useState } from 'react'
 import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
    Image,
  } from 'react-native';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login=()=> {

  const navigasyon=useNavigation();
  const database = firestore().collection('Users');

  const[Sifre,setsifre]=useState("");
  const[Email,setemail]=useState("");
  const[Uyarı,setuyari]=useState(false);

  useEffect(()=>{   // Auth işlemleri
    auth().onAuthStateChanged((user)=>
    {
      if(user){
        AsyncStorage.setItem("email",auth().currentUser.email);
        navigasyon.navigate("Home");
           
      }
    else{
      navigasyon.navigate("Login");
      AsyncStorage.clear();
    }})
    
  })


const Googlegiris=async()=>{   // Google ile giriş
  
    GoogleSignin.configure({
      webClientId: '617305920728-2tfh9en61vsolhmceina34eqsq857j5e.apps.googleusercontent.com',
    });
    
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const users = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(users.idToken);
      const user=await auth().signInWithCredential(googleCredential);
      const sorgu= await database.where("Email","==",user.user.email).get();
      if(sorgu.empty==true){
        database.doc(user.user.email).set({
          Adsoyad:user.user.displayName,
          Email:user.user.email
        })
        console.log("üye eklendi");
     
       
      }
      else{
        console.log("üye var");
      

      }

  }

 const Normalgiris=async()=>{   // Normal giriş işlemleri E-mail ve Şifre ile
  
  if(Sifre=="" && Email==""){

    return;

  } else{

  const sorgumail= await database.where("Email","==",Email).get();
  const sorgusifre= await database.where("Sifre","==",Sifre).get();
  if(sorgumail.empty==true || sorgusifre.empty==true){
    console.log("e-mail veya sifre yanlıs")
    setuyari(true);
  }
  else{
    console.log("giris yapıldı")
  await auth().signInWithEmailAndPassword(Email,Sifre);
   
  }

 }
}

const Gotosignup=()=>{   // Signup sayfasına git.
        navigasyon.navigate("Signup");
    }
    
  return (
    <SafeAreaView style={styles.background}>
        <View style={styles.loginview}>
          {Uyarı && 
            <View style={styles.Uyarı}>
            <Icon style={{marginLeft:10,marginRight:10}} name="warning" size={20} color="red" />
            <Text style={{fontSize:15,color:"red",marginRight:10}}>E-mail veya şifreniz hatalı !</Text>
            </View>
          }
        <Image style={{marginBottom:15}} source={require("../images/wpcloudnative2.png")} />
        <TextInput onChangeText={(text)=>setemail(text)} style={styles.Emailinput} placeholder='E-mailinizi girin.'/>
        <TextInput onChangeText={(text)=>setsifre(text)} style={styles.Sifreinput}  placeholder='Şifrenizi girin.'/>
        <TouchableOpacity onPress={()=>Normalgiris()} style={styles.Girisyap}><Text style={styles.GirisyapText}>Giriş yap</Text></TouchableOpacity>
        <Text style={{fontSize:15,fontWeight:"600",color:"black",marginVertical:5}}>Veya</Text>
        <TouchableOpacity onPress={()=>Googlegiris()} style={styles.GoogleGirisyap}><Icon style={{marginRight:5,marginLeft:-5}} name="google" size={22} color="red" />
        <Text style={styles.GoogleGirisyapText}>
        Google ile giriş yap</Text></TouchableOpacity>
        <Text style={{marginTop:20,fontSize:16,fontWeight:"400",color:"black"}}>Eğer bir hesabın yoksa</Text>
        <TouchableOpacity onPress={()=>Gotosignup()} style={styles.Hesapolustur}><Icon style={{marginLeft:-5,marginRight:5}} name="plus-circle" size={22} />
        <Text style={{fontSize:16,color:"black"}}>Hesap oluştur</Text></TouchableOpacity>
        </View>  
    </SafeAreaView>
  )

}
export default Login

const styles=StyleSheet.create({

    background : {flex:1,alignItems:"center",justifyContent:'center',backgroundColor:"#E3F2FD"},
    loginview : {backgroundColor:"#E3F2FD",width:320,alignItems:'center',justifyContent:'center',marginTop:40,paddingHorizontal:50,paddingVertical:20,borderRadius:40},
    Textlogin:{fontSize:35,marginTop:0,marginBottom:5,fontWeight:"bold"},
    Emailinput: {backgroundColor:"whitesmoke",width:270,padding:10,fontSize:16,borderRadius:20,elevation:20,fontWeight:"400",color:"black"},
    Sifreinput: {backgroundColor:"whitesmoke",width:270,padding:10,fontSize:16,borderRadius:20,marginTop:10,elevation:20,fontWeight:"400",color:"black"},
    Girisyap:{backgroundColor:"#1976d2",padding:7,borderRadius:40,marginTop:15,paddingHorizontal:20,elevation:10},
    GirisyapText: {fontSize:16,color:"#E3F2FD"},
    GoogleGirisyap:{backgroundColor:"#1976d2",padding:7,borderRadius:40,paddingHorizontal:20,elevation:10,flexDirection:"row"},
    GoogleGirisyapText:{fontSize:16,color:"#E3F2FD"},
    Hesapolustur:{backgroundColor:"#66BB6A",padding:7,borderRadius:40,paddingHorizontal:20,elevation:5,marginTop:5,flexDirection:"row"},
    Uyarı:{flexDirection:'row',backgroundColor:"#E3F2FD",padding:5,borderRadius:40,borderWidth:1,elevation:10,borderColor:"red",marginBottom:10}
})


