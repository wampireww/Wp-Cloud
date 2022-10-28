import React from 'react'
import {
    Alert,
  } from 'react-native';


export const Alertdoldur=()=> {
    return(
        Alert.alert("Uyarı","Bilgileri eksiksiz doldurun !",[
          {
            text:"Tamam"
          },
        ],
        {cancelable:true}
        )
      )
}

export const Alertbasarili=()=>{

    return(
        Alert.alert("Tebrikler","Başarı ile hesap oluşturdunuz",[
          {
            text:"Tamam",     
          },
        ],
        {cancelable:true}
        )
      )

      
}

export const Alertmailgecersiz=(setemail)=>{

    setemail("");
    return(
      Alert.alert("Uyarı","Lütfen geçerli bir E-mail adresi girin !",[
        {
          text:"Tamam"
        },
      ],
      {cancelable:true}
      )
    )

}

export const Alertmailkullanimda=(setemail)=>{

    setemail("");
    return(
      Alert.alert("Uyarı","Girmiş olduğunuz E-mail bir başka hesap tarafından kullanılmaktadır.",[
        {
          text:"Tamam"
        },
      ],
      {cancelable:true}
      )
    )

}

export const Alertsifregecersiz=(setsifre)=>{

    setsifre("");
    return(
      Alert.alert("Uyarı","Şifreniz en az 6 karakterden oluşmalı !",[
        {
          text:"Tamam"
        },
      ],
      {cancelable:true}
      )
    )

}

export const AlertDosyasayisi=(setdosya)=>{

  setdosya([]);
  return(
    Alert.alert("Uyarı","Tek seferde en fazla 10 dosya yüklenebilir !",[
      {
        text:"Tamam",
      },
    ],
    {cancelable:true}
    )
  )

}

export const AlertDosyaboyut=(setdosya)=>{

  setdosya([]);
  return(
    Alert.alert("Uyarı","Yüklenecek dosyalar 500 mb dan büyük olamaz !",[
      {
        text:"Tamam",
      },
    ],
    {cancelable:true}
    )
  )

}

