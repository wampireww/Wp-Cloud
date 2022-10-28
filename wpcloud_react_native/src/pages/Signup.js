import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
    Alert,
  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alertdoldur,Alertbasarili,Alertmailgecersiz,Alertmailkullanimda,Alertsifregecersiz } from '../components/Alerts';

const Signup=({navigation})=> {

  const database = firestore().collection('Users');
  const navigasyon=useNavigation();
  const[İsimsoyisim,setisimosyisim]=useState("");
  const[Ulke,setulke]=useState("");
  const[Email,setemail]=useState("");
  const[Sifre,setsifre]=useState("");
  const[Uyari,setuyari]=useState(false);

 
    useEffect(()=>{
        navigation.setOptions({
            headerStyle:{backgroundColor:"#66BB6A"},
            headerTitleAlign:"center",
            headerTitleStyle:{fontWeight:"600"},
            title:"Hesap oluştur"
        });

    })

  const Hesapolustur=async()=>{   // Hesap oluşturma

    if(İsimsoyisim=="" || Ulke=="" || Sifre=="" || Email==""){
     Alertdoldur();
    }
     else{
    auth()
  .createUserWithEmailAndPassword(Email,Sifre)
  .then(() => {
    database.doc(Email).set({
      Adsoyad:İsimsoyisim,
      Email:Email,
      Sifre:Sifre,
      Ülke:Ulke
    }).then(()=>Alertbasarili())
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      Alertmailkullanimda(setemail);
    }

    if (error.code === 'auth/invalid-email') {
      Alertmailgecersiz(setemail);
    }

    if (error.code === 'auth/weak-password') {
      Alertsifregecersiz(setsifre);
    }
    
  });
    }
  }
    
  return (
    <SafeAreaView style={styles.background}>
        <Image style={{marginBottom:15,marginTop:15}} source={require("../images/wpcloudnative2.png")} />
        <TextInput value={İsimsoyisim} onChangeText={(text)=>setisimosyisim(text)} style={styles.İnput} placeholder='Adınızı ve soyadınızı girin'/>
        <TextInput value={Ulke} onChangeText={(text)=>setulke(text)} style={styles.İnput}  placeholder='Ülkenizi girin'/>
        <TextInput value={Email} onChangeText={(text)=>setemail(text)} style={styles.İnput}  placeholder='E-mail adresinizi girin'/>
        <TextInput value={Sifre} onChangeText={(text)=>setsifre(text)}  style={styles.İnput}  placeholder='Şifrenizi girin'/>
        <TouchableOpacity onPress={()=>Hesapolustur()} style={styles.Hesapolustur}><Icon style={{marginLeft:-10,marginRight:5}} name="plus-circle" size={22}/><Text style={styles.Hesaplusturtext}>Hesap oluştur</Text></TouchableOpacity>
    </SafeAreaView>
  )

}

const styles=StyleSheet.create({

    background : {alignItems:"center",justifyContent:'flex-start',backgroundColor:"#E3F2FD",height:"100%"},
    Textlogin:{fontSize:35,marginTop:0,marginBottom:5,fontWeight:"bold"},
    İnput: {backgroundColor:"whitesmoke",padding:10,width:"70%",fontSize:16,borderRadius:20,elevation:20,fontWeight:"400",color:"black",marginBottom:10},
    Sifreinput: {backgroundColor:"whitesmoke",width:270,padding:10,fontSize:16,borderRadius:20,marginTop:10,elevation:20,fontWeight:"400",color:"black"},
    Hesapolustur:{backgroundColor:"#66BB6A",padding:10,borderRadius:40,marginTop:5,paddingHorizontal:20,elevation:10,flexDirection:"row"},
    Hesaplusturtext: {fontSize:16,color:"black",fontWeight:"400"},
    Uyarı:{flexDirection:'row',backgroundColor:"#E3F2FD",padding:5,marginHorizontal:20,borderRadius:40,borderWidth:1,elevation:10,borderColor:"red",
    marginTop:10,justifyContent:'center',alignItems:'center',width:"auto"}
})


export default Signup