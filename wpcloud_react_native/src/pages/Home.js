import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';
import  'react-native-get-random-values'
import { Divider } from 'react-native-paper';
import Modal from "react-native-modal";
import { Documentpick } from '../components/Documentpick';
import { AlertDosyasayisi,AlertDosyaboyut } from '../components/Alerts';

import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    BackHandler,
    ActivityIndicator,
    Image,
    FlatList,
    Linking,
    Share
  } from 'react-native';


const Home=({navigation})=> {

  const short = require('short-uuid');
  const[Useremail,setuseremail]=useState();
  const[giris,setgiris]=useState(false);
  const navigasyon=useNavigation();
  const[Dosyalar,setdosyalar]=useState([]);
  const[Load,setload]=useState(false);
  const[Liste,setliste]=useState([]);
  const[Taskiptal,settaskiptal]=useState(false);
  const[Toplamboyut,settoplamboyut]=useState(0);
  const[Pmodal,setmodal]=useState(false);
  const[Modaldata,setmodaldata]=useState([]);
  const[Taskdurum,settaskdurum]=useState(false);

  useEffect(()=>{   // navbar options
    navigation.setOptions({
      headerStyle:{backgroundColor:"#1976d2"},
      headerTitleAlign:"center",
      headerTitleStyle:{fontWeight:"bold",fontSize:24,fontFamily:"notoserif"},
      title: "WpCloud",
      headerTintColor: "#ECF0F1",
      headerLeft:()=>(<TouchableOpacity style={{borderWidth:1,padding:3,paddingHorizontal:10,borderRadius:40,elevation:2,borderColor:"#8BC34A"}} onPress={()=>Documentpick(setdosyalar)}><Icon color={"#8BC34A"} size={24} name='cloud-upload'></Icon></TouchableOpacity>),
      headerRight:()=>(<><TouchableOpacity style={{marginRight:30,elevation:2}} onPress={() => Listele()}><Icon color={"#FFC107"} size={25} name='refresh'></Icon></TouchableOpacity><TouchableOpacity onPress={() => Signout()}><Icon color={"red"} size={27} name='sign-out'></Icon></TouchableOpacity></>)
  });

  })

  const Paylas = async (gelen) => { // Link paylaşım 
    try {

      const result = await Share.share({
        message:gelen,
          title:"WpCloud/"+Useremail,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  const storegelen=async()=>{   // Loginden gelen store
    
    const gelenmail= await AsyncStorage.getItem("email");
    setuseremail(gelenmail);

  }



  useEffect(()=>{
    Listele();
  },[giris])

useEffect(() => {   // backbutton iptal
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])
  
 useEffect(()=>{
  storegelen();
  settaskiptal(false);
  console.log(Taskdurum);
 },[])

  const Signout=async()=>{  // Çıkış işlemi

    GoogleSignin.configure({
      webClientId: '617305920728-2tfh9en61vsolhmceina34eqsq857j5e.apps.googleusercontent.com',
    });

    const googledurum = await GoogleSignin.isSignedIn();
    if(googledurum){
      await GoogleSignin.signOut().then(
        await auth().signOut()
      )
      setuseremail("");
      navigasyon.navigate("Login");
     
    }
    else{
      await auth().signOut().then(navigasyon.navigate("Login"));
      setuseremail("");
    }
   
  }
  
  const Uploadfiles=async()=>{   // Dosya upload işlemleri

    if(Dosyalar.length>=11){
      AlertDosyasayisi(setdosyalar)
      return;
    }
    else if(Dosyalar.length==""){
      return; 
    }
    else{
      setload(true);

      for(i=0;i<Dosyalar.length;i++){

          if(Dosyalar[i].size>524288000){
                AlertDosyaboyut(setdosyalar);
                setload(false);
              return;
          }
        else{

      const referance=storage().ref(Useremail+"/");
      const ref1=referance.child(short.generate()+Dosyalar[i].name);
      console.log(Dosyalar);
      const tasks=ref1.putFile(Dosyalar[i].fileCopyUri);
        // tasks.on("state_changed",(snap)=>{
        //   if(snap.state=="running"){  
        //     }
        //   })
      tasks.then(async item=>{
        var url=await ref1.getDownloadURL();
        console.log(Dosyalar.length);
      var obj={uzanti:url,name:item.metadata.name,tip:item.metadata.contentType,boyut:item.metadata.size,time:item.metadata.generation};
      setliste(prev=>[...prev,obj]);
      settoplamboyut(prev=>prev+item.metadata.size);
  
            if(i==Dosyalar.length){
                setload(false);
                setdosyalar([]);
            
            }
          }).catch(error=>console.log(error));
      }
      
    }
    }
  
  }

  const Listele=async()=>{  // Dosya listeleme işlemleri
  
    const liste = await storage().ref(Useremail+"/").list()
    var boyut=0;
    liste.items.map(async item=>{
      
      var url=await item.getDownloadURL();
      var meta=await item.getMetadata();
      boyut=boyut+meta.size
      var obj={uzanti:url,name:meta.name,tip:meta.contentType,boyut:meta.size,time:meta.generation};
      setliste(prev=>[...prev,obj]);
      settoplamboyut(boyut);
    })
    setgiris(true);
    setdosyalar([]);
    setload(false);
    return setliste([])
   
  
  //  liste.items.forEach((item)=>{item.getDownloadURL().then((itemurl)=>{item.getMetadata().then((meta)=>{
    
  //      //  var obj={uzanti:itemurl,name:meta.name,tip:meta.contentType,boyut:meta.size,time:meta.generation};
  //  // setliste(prev=>[...prev,{uzanti:itemurl,name:meta.name,tip:meta.contentType,boyut:meta.size,time:meta.generation}])
  //  //  array.push(obj);
  //   // setliste((prev)=>[...prev,obj]);
  // //  setliste(array)
  //  })})});
    
  //  console.log(array);
    
  }


  function formatBytes(a,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));
  return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}`}   // bit to mb


  const Sil=async(gelenisim,gelenboyut)=>{   // Silme işlemleri

    const ref=storage().ref(Useremail+"/"+gelenisim)
    await ref.delete();

    var Silinmis=Liste.filter(item=>item.name!==gelenisim)
    setliste(Silinmis);
    settoplamboyut(prev=>prev-gelenboyut)
    
  }
 
  const ModalP=()=>{   // Modal 
    
    if(Modaldata.tip!="image/png" && Modaldata.tip!="image/jpg" && Modaldata.tip!="image/jpeg"){
      return;
    }
    else{

    
    return(
      <View>
        <Modal isVisible={Pmodal}>
        <View style={{justifyContent:'center',alignItems:"center",flexDirection:"column"}}>
        <Image style={{
            width: 300,
            height: 300,
            resizeMode: "contain",
          }}
            source={{ uri: Modaldata.uzanti }} />
          <TouchableOpacity onPress={()=>setmodal(false)}><Text style={{fontSize:20,color:"whitesmoke",borderWidth:1,padding:5,marginTop:10,
          borderRadius:20,paddingHorizontal:20,elevation:10}}>Kapat</Text></TouchableOpacity>
        </View>
      </Modal>
      </View>
      
  );
}
  }
 

  return (
    <SafeAreaView style={styles.background}>
      <View style={{backgroundColor:"#1976d2",justifyContent:"space-between",flexDirection:'row',alignItems:"center",padding:7,elevation:20}}>
        <View style={{flexDirection:'row',alignItems:"center"}}>
          {Load ?  <><ActivityIndicator style={{ marginLeft: 5 }} size={35} color="#8BC34A" /></> : <><ActivityIndicator style={{ display:'none',marginLeft: 6 }} size={35} color="#8BC34A" />
          </> }
        </View>
        <View style={{borderColor:"#8BC34A",borderWidth:1,padding:2,borderRadius:20,paddingHorizontal:20,alignItems:"center",justifyContent:"center",flexDirection:"row",elevation:1}}>
        <Text style={{fontSize:14,fontWeight:"bold",marginRight:5,justifyContent:"flex-end",color:"#8BC34A",fontFamily:"notoserif"}}>{formatBytes(Toplamboyut)}
        </Text>
        <Icon color={"#8BC34A"} size={19} name='folder'/>
        </View>
      </View>
      <ModalP/>
      <FlatList 
      contentContainerStyle={{alignItems:"flex-start",width:"100%",paddingBottom:45}}
      horizontal={false}
      numColumns={1}
      keyExtractor={item=>item.name+short.generate()}
      data={Liste.sort((a, b) => a.time - b.time)}
      renderItem={({item})=>
      <><View style={{ flexDirection: "row", justifyContent: "center", padding: 5, alignItems: "center" }}>
        <TouchableOpacity onPress={()=>ModalP(setmodaldata(item),setmodal(true))}>

        {item.tip=="application/pdf"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/pdf.png")} />
      }
         {item.tip=="application/x-zip-compressed"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/rar2.png")} />
      }
         {item.tip=="application/zip"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/rar2.png")} />
      }

          {item.tip=="text/plain"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/text2.png")} />
      }
            {item.tip=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/mword.png")} />
      }
             {item.tip=="application/vnd.openxmlformats-officedocument.presentationml.presentation"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/powerpoint.png")} />
      }
           {item.tip=="video/mp4"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/mp4.png")} />
      }
          {item.tip=="image/png"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={{uri:item.uzanti}} />
      }
        {item.tip=="image/jpg"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={{uri:item.uzanti}} />
      }
       {item.tip=="image/jpeg"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={{uri:item.uzanti}} />
      }
         {item.tip=="video/mpeg"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/mp4.png")} />
      }
      {item.tip=="text/html"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/html.png")} />
      }
       {item.tip=="application/x-rar-compressed"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/rar2.png")} />
      }
       {item.tip=="application/octet-stream"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/unknown2.png")} />
      }
        {item.tip=="video/mpeg"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/mp4.png")} />
      }
       {item.tip=="video/flv"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/mp4.png")} />
      }
       {item.tip=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/exel.png")} />
      }
        {item.tip=="application/vnd.android.package-archive"  &&
      <Image style={{
        width: 80,
        height: 80,
        resizeMode: "center"
      }}
        source={require("../images/icons/apk.png")} />
      }
       <Image style={{
        width: 80,
        height: 0,
        resizeMode: "center"
      }}
        source={null} />

      {/* ........................................ */}

            </TouchableOpacity>
          <View style={{ alignItems: "flex-start" }}>
            <Text numberOfLines={4} style={{ fontFamily: "notoserif", color: "#1976d2", fontWeight: "bold", fontSize: 14, marginTop: 0, textAlign: "left", width: 250 }}>{item.name}</Text>
            <Text style={{ fontFamily: "notoserif", color: "black", fontWeight: "bold", fontSize: 14, marginTop: 0 }}>Boyut: {formatBytes(item.boyut)}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 5 }}>
              <TouchableOpacity onPress={() => Linking.openURL(item.uzanti)} style={{ marginRight: 25 }}><Icon name='download' color={"#1976d2"} size={23} /></TouchableOpacity>
              <TouchableOpacity onPress={() => Paylas(item.uzanti)} style={{ marginRight: 25, marginLeft: 10 }}><Icon name='send' color={"#8BC34A"} size={23} /></TouchableOpacity>
              <TouchableOpacity onPress={() => Sil(item.name, item.boyut)} style={{ marginLeft: 50, flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 20, paddingHorizontal: 15, elevation: 5, backgroundColor: "#ECEFF1", borderColor: "red" }}>
                <Icon name='remove' color={"red"} size={21} />
                <Text style={{ marginLeft: 5, fontSize: 16, color: "black", fontFamily: "notoserif" }}>Sil</Text></TouchableOpacity>
            </View>
          </View>
        </View><Divider style={{ borderColor: "black", marginTop: 5 }} bold={true} /></>
      }
      /> 
      <View style={styles.mailview}>
        <View style={{backgroundColor:"#1976d2",flexDirection:"row",padding:5,justifyContent:"space-between",alignItems:"center",maxWidth:"95%",borderRadius:40}}>
          {Dosyalar.length==0 ? <Text style={{backgroundColor:"#E3F2FD",fontSize:15,width:"75%",padding:3,color:"black",borderRadius:20,fontFamily:"notoserif"}}>Dosya seçilmedi.</Text> 
          : <Text style={{backgroundColor:"#E3F2FD",fontSize:15,width:"75%",padding:3,color:"black",borderRadius:20,fontFamily:"notoserif"}}>{Dosyalar.length} dosya seçildi.</Text> }

       <TouchableOpacity onPress={()=>Uploadfiles(Taskiptal)} style={{marginRight:3,flexDirection:"row",padding:6,justifyContent:"center",alignItems:"center",backgroundColor:"#8BC34A",borderWidth:1,borderRadius:20,elevation:10}}>
        <Icon style={{marginRight:4}} color={"black"} size={21} name='plus-circle'></Icon>
         <Text style={{fontSize:16,fontWeight:"600",color:"black"}}>Yükle</Text>
       </TouchableOpacity>
       </View>
      </View>
    </SafeAreaView>
  )
}
 
export default Home

const styles=StyleSheet.create({
  background:{backgroundColor:"#E3F2FD",flex:1},
  mailview:{flex:1,backgroundColor:"#1976d2",width:"100%",flexDirection:"row",justifyContent:"center",position:"absolute",
  bottom:0,alignItems:'center',elevation:20}
})