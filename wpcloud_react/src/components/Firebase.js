import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getFirestore , doc, setDoc,collection,query,where,getDocs} from 'firebase/firestore';
import {getStorage,ref,uploadBytes,listAll, getDownloadURL,getMetadata,deleteObject } from 'firebase/storage';

  const short = require('short-uuid');
  const firebaseConfig = {
    apiKey: "AIzaSyDiWFnTmIoze94XfVf0ivBG6bxSSnW8nyI",
    authDomain: "wpcloud-aed4a.firebaseapp.com",
    projectId: "wpcloud-aed4a",
    storageBucket: "wpcloud-aed4a.appspot.com",
    messagingSenderId: "617305920728",
    appId: "1:617305920728:web:d72b76d961df3cc036b3ad",
    measurementId: "G-XEJ5BKYSJQ"
  };

      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
    export const storage=getStorage(app);
    const auth=getAuth(app);
    const db=getFirestore(app);
   const googleprovider=new GoogleAuthProvider();
   const EmailHesap = JSON.parse(localStorage.getItem('Hesapemail'));  // DOSYALARI LİSTELEME
   const alluploadref=ref(storage,EmailHesap);  // DOSYALARI LİSTELEME /// 
 
 export  const _Signin=async(email,password,Navigate,sethatagiris)=>{

  const uyesorgu = collection(db,"Users");
  const q =query(uyesorgu, where("Email", "==", email),where("Sifre","==",password));
  const querySnapshot = await getDocs(q);

  console.log(querySnapshot.empty);

  if(querySnapshot.empty==false){    
    
    localStorage.setItem("giris",JSON.stringify(true));
    localStorage.setItem("Hesapemail",JSON.stringify(email));
      Navigate("/Home")
      window.location.reload();
      
  }
  else{

     sethatagiris(true);
    
  }
    
  }

export const _Signup=async(adsoyad,email,sifre,ulke,sethatauyelik,sethesapolustutext)=>{

  const uyesorgu = collection(db,"Users");
  const q =query(uyesorgu, where("Email", "==", email));
  const querySnapshot = await getDocs(q);

    if(querySnapshot.empty==false){

      sethatauyelik(true);
     
    }
    else {

      await setDoc(doc(db, "Users",email), {
        Adsoyad: adsoyad,
        Ülke: ulke,
        Sifre: sifre,   
        Email:email
      }).then(user=> createUserWithEmailAndPassword(auth,email,sifre), sethesapolustutext(true))
      .catch(error=>console.log(error));


    }

}

export const _Googlesignin=async(Navigate)=>{

   signInWithPopup(auth,googleprovider).then(async result=>{

    const credential=GoogleAuthProvider.credentialFromResult(result);
     const token= credential.accessToken;
     const user=result.user;
      console.log(user);

      const uyesorgu = collection(db,"Users");
    const q =query(uyesorgu, where("Email", "==", user.email));
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty==true){

     await setDoc(doc(db,"Users",user.email), {
        Adsoyad: user.displayName,
        Email:user.email
      }).then(
         Navigate('/Home'),
        console.log("EKLENDİ"),
        localStorage.setItem("giris",JSON.stringify(true)),
        localStorage.setItem("Hesapemail",JSON.stringify(user.email)),
      ).catch(error=>console.log("EKLENEMEDİ"));

      window.location.reload();

    }
    else{
      localStorage.setItem("giris",JSON.stringify(true));
      localStorage.setItem("Hesapemail",JSON.stringify(user.email));
       Navigate('/Home');
       window.location.reload();
     
      
      console.log("uye var");
    }

  })


}

export const Uploadfiles=(Dosyayukle,setprogreesscircle,gonder,boyut,set)=>{

  const Email = JSON.parse(localStorage.getItem('Hesapemail'));
  const arrayim=[];
  
  for (let i = 0; i < Dosyayukle.length; i++) {
    setprogreesscircle(true)
    const deger=Dosyayukle.length;
    const referance=ref(storage,Email+'/'+short.generate()+Dosyayukle[i].name)
   uploadBytes(referance,Dosyayukle[i]).then((item1)=>{
     
      getDownloadURL(item1.ref).then((url)=>{
        getMetadata(item1.ref).then((meta)=>{
         boyut=boyut+meta.size;
         set(boyut);
        //  console.log(meta.size) 
         // array(prev=>[...prev,{data:urlname:item.name,tip:meta.contentType,boyut:formatBytes(meta.size)}])
            arrayim.push({data:url,name:item1.metadata.name,tip:meta.contentType,boyut:formatBytes(meta.size),time:meta.generation})
           const obje={data:url,name:item1.metadata.name,tip:meta.contentType,boyut:formatBytes(meta.size),time:meta.generation,hamboyut:meta.size}
           gonder((prev)=>[...prev,obje]);
        })
      })
      if(i+1==deger){
        setprogreesscircle(false);
        
       // console.log(arrayim);
        //  window.location.reload(false);
     //   var obj={data:item.data,name:item.name,tip:item.tip,boyut:item.boyut},
        // console.log(liste
      }
      
   }).catch(error=>console.log(error));
}


  // const referance=ref(storage,Email+'/'+Dosyayukle.name+uuid())
  // uploadBytes(referance,Dosyayukle).then(()=>{
  //   alert("dosyalar yuklendi");
  // }).catch(error=>alert(error));

}

// if(!(i+1 < deger)){
//   setprogreesscircle(false);
//    console.log("yüklendi ")
// }
// else {
//   setprogreesscircle(true);
//   console.log(i);
//   console.log("yükleniyor");
// }

function formatBytes(a,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}`}



export const Dosyalistele=(setdosyalistele,settoplamdosyaboyutu)=>{
  var toplam=0;
  listAll(alluploadref).then((item)=>{
      item.items.forEach((item)=>{
       
      //  setdosyalistele(prev=>[...prev,item.name]);
        getDownloadURL(item).then((url)=>{
          getMetadata(item).then((meta)=>{
          
            
            setdosyalistele(prev=>[...prev,{data:url,name:item.name,tip:meta.contentType,boyut:formatBytes(meta.size),time:meta.generation,hamboyut:meta.size}])
            
            toplam=toplam+meta.size;
            settoplamdosyaboyutu(toplam);
           
          })
      
        })

      })

  });
}

export const Dosyasil=(dosyaismi,setdosyalistele,dosyalar,urlboyut,settoplamdosyaboyutu,Toplamdosyaboyutu)=>{

  const Email = JSON.parse(localStorage.getItem('Hesapemail'));
  const deleteref=ref(storage,Email+'/'+dosyaismi);
  deleteObject(deleteref).then(()=>{

     let silinmişarray = dosyalar.filter(item => item.name !== dosyaismi);
     setdosyalistele(silinmişarray);
    settoplamdosyaboyutu(Toplamdosyaboyutu-parseFloat(urlboyut));
   
    
  })

}
