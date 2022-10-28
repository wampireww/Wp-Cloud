import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import GoogleIcon from '@mui/icons-material/Google';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { _Googlesignin, _Signin } from '../components/Firebase';
import Stack from '@mui/material/Stack';

const Login=()=> {
  
  const Navigate=useNavigate();
 
  const[Email,setemail]=useState("");
  const[Sifre,setsifre]=useState("");
  const[Hatagiris,sethatagiris]=useState(false);
  const[Hatatext,sethatatext]=useState(false);


  const _email=(e)=>{
       
    setemail(e.target.value);

  }
  const _sifre=(e)=>{
       
    setsifre(e.target.value);

  }

  const Uyeol=()=>{
      Navigate("/Signup")
  }



  const Googlegiris=(e)=>{
      e.preventDefault();
      _Googlesignin(Navigate);

  }

  const Normalgiris=(e)=>{
    e.preventDefault();
    if(Email=="" || Sifre==""){
        sethatatext(true)
    }
    else {   
      _Signin(Email,Sifre,Navigate,sethatagiris);
      setemail("");
      setsifre("");
    }
   
} 

  return (
    <div className='login'>
                <Helmet>
                <meta charSet="utf-8" />
                <title>WpCloud</title>
            </Helmet>
            <div className='loginform'>
              {Hatagiris &&
             <Stack sx={{ width: '100%' }} spacing={2}>
             <Alert style={{color:"red",borderRadius:15,marginBottom:10}} variant="outlined" severity="error" color='error' 
             onClose={() =>sethatagiris(false)}>E-mail veya Şifreniz hatalı !</Alert>
           </Stack>
            }
              {Hatatext &&
             <Stack sx={{ width: '100%',marginTop:1 }} spacing={2}>
             <Alert style={{color:"red",borderRadius:15,marginBottom:10}} variant="outlined" severity="error" color='error'
              onClose={() =>sethatatext(false)}>E-mail veya Şifre boş bırakılamaz !</Alert>
           </Stack>
            }
                  
           
      
        <img src={require('../images/WpCloud.png')} />
        <form>
       
        <Box
      component="form"
      sx={{
        
        '& > :not(style)': { m: 2, width: '50ch',boxShadow: 1,display: 'grid'},
        
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        onChange={(text)=>_email(text)}
        value={Email}
        size="small"
        id="outlined-name"
        label="E-mail"
      />
      
      <TextField
      onChange={(text)=>_sifre(text)}
      value={Sifre}
        size="small"
        id="outlined-name2"
        label="Şifre"
        type="password" 
      />
    </Box>
    <Button type='submit'onClick={(e)=>Normalgiris(e)} style={{width:'50%',color:"text.secondary",bgcolor: 'error.main',fontSize:"15px",textTransform: 'capitalize' }} 
    variant="contained">Giriş</Button>
    <h4 style={{fontSize:20,padding:10}}>Veya</h4> 
    <Button type='submit' onClick={(e)=>Googlegiris(e)}  style={{width:'50%',color:"text.secondary",bgcolor: 'error.main',fontSize:"15px",textTransform: 'capitalize'  }}
     variant="contained" startIcon={<GoogleIcon style={{backgroundColor:"#DB4437",borderRadius:20,padding:1}} />}>Google ile giriş yap</Button>
    <Divider style={{marginTop:20}}/>
        <p style={{fontSize:15}}>Eğer bir hesabın yoksa <Link style={{marginBottom:3,color:"red",fontSize:15  }}
      component="button"
      variant="body1"
      underline="hover"
      onClick={() => {
        Uyeol();
      }}
    >
      buraya 
    </Link> tıklayarak hesap oluşturabilirsin ! </p>
 
        </form>
       
        </div>  
        
    </div>
    
  )
}   

export default Login
