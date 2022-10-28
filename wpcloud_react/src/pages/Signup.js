import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { _Signup } from '../components/Firebase';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Login from './Login';
import { useLocation, useNavigate } from 'react-router-dom';

const Signup=()=> {

  const Navigate=useNavigate();
 
  const[Adsoyad,setadsoyad]=useState("");
  const[Email,setemail]=useState("");
  const[Sifre,setsifre]=useState("");
  const[Ülke,setulke]=useState("");
  const[Hatauyelik,sethatauyelik]=useState(false);
  const[Hatatext,sethatatext]=useState(false);
  const[Hesapolustutext,sethesapolustutext]=useState(false);

  const _adsoyad=(e)=>{
       
    setadsoyad(e.target.value);

  }

  const _email=(e)=>{
       
    setemail(e.target.value);

  }

  const _sifre=(e)=>{
       
    setsifre(e.target.value);

  }

  const _ulke=(e)=>{
       
    setulke(e.target.value);

  }

  const _Hesapolustur=(e)=>{
    e.preventDefault();
    if(Email=="" || Sifre=="" || Adsoyad=="" || Ülke==""){
      sethatatext(true)
  }
  else {   
    _Signup(Adsoyad,Email,Sifre,Ülke,sethatauyelik,sethesapolustutext).catch(error=>console.log(error))
    
  }

  }

  const Burayatikla=()=>{

    Navigate("/");

  }

  
  return (
    <div className='login'>
                <Helmet>
                <meta charSet="utf-8" />
                <title>WpCloud</title>
            </Helmet>
            <div className='signupform'>
            {Hatauyelik &&
             <Stack sx={{ width: '100%' }} spacing={2}>
             <Alert style={{color:"red",borderRadius:15,marginBottom:10,fontSize:15}} variant="outlined" severity="error" color='error'
              onClose={() =>sethatauyelik(false)}>Girmiş olduğunuz E-mail bir başkası tarafından kullanılmaktadır !</Alert>
           </Stack>
            }
              {Hatatext &&
             <Stack sx={{ width: '100%',marginTop:1}} spacing={2}>
             <Alert style={{color:"red",borderRadius:15,marginBottom:10,fontSize:15}} variant="outlined" severity="error" color='error'
              onClose={() =>sethatatext(false)}>Bilgileri eksiksiz doldurun !</Alert>
           </Stack>
            }
                 {Hesapolustutext &&
             <Stack sx={{ width: '100%',marginTop:1  }} spacing={2}>
             <Alert style={{color:"green",borderRadius:15,marginBottom:10,fontSize:15}} variant="outlined" severity="success" color='success'
              onClose={() =>sethesapolustutext(false)}>Hesabınız başarı ile oluşturuldu.<Link style={{marginBottom:2,color:"red",fontSize:15}}
              component="button"
              variant="inherit"
              underline="hover"    
              onClick={() => {
                  Burayatikla()
              }}
            >
              buraya 
            </Link> tıklayarak giriş yapabilirsiniz.</Alert>
           </Stack>
            }
      <div style={{marginBottom:30}}>
      <img src={require('../images/WpCloud.png')} />
      </div>
        <h1 style={{fontSize:25,marginBottom:-5}}>Hesap oluştur <GroupAddOutlinedIcon sx={{ fontSize: 35,color:'green',position:"relative",marginBottom:1 ,marginLeft:1}}/></h1>
        
        <Divider style={{color:"#43A047"}} />
        <form>
        <Box
        style={{display:'grid',width:'100%',marginTop:5}}    
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
      value={Adsoyad}
      onChange={(text)=>_adsoyad(text)}
       color="success"
        size="small"
        id="outlined-name"
        label="İsim Soyisim"
      />
       <TextField
       value={Ülke}
       onChange={(text)=>_ulke(text)}
        color="success"
        size="small"
        id="outlined-name"
        label="Ülke"
        style={{marginTop:10}}
      />
       <TextField
       value={Email}
       onChange={(text)=>_email(text)}
       color="success"
        size="small"
        id="outlined-name"
        label="E-mail"
        style={{marginTop:10}}
      />
      <TextField
      value={Sifre}
      onChange={(text)=>_sifre(text)}
      color="success"
        size="small"
        id="outlined-name"
        label="Şifre"
        style={{marginTop:10}}
      />
    </Box>
    <Button type='submit' onClick={(e)=>_Hesapolustur(e)} style={{width:'50%',backgroundColor:"#43A047",fontSize:"15px",textTransform: 'capitalize' ,marginTop:10}} variant="contained">Üye ol</Button>
   
        </form> 
        </div>  
    </div>
  )
}   

export default Signup
