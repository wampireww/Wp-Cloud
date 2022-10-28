import React, { useState } from 'react'
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Uploadfiles } from './Firebase';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import FolderIcon from '@mui/icons-material/Folder';

const Navbar=({gonder,boyut,set})=> {

  const Navigate=useNavigate();
  const Email = JSON.parse(localStorage.getItem('Hesapemail'));
  const[Dosyayukle,setdosyayukle]=useState([]);
  const[Progresscircle,setprogreesscircle]=useState(false);

const Cikisyap=()=>{
    
    localStorage.clear();
    Navigate("/");
    window.location.reload();

}

function formatBytes(a,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}`}


const Dosyaupload=()=>{
  
  console.log(Dosyayukle);
  if(Dosyayukle==""){
    return;
  }
  Uploadfiles(Dosyayukle,setprogreesscircle,gonder,boyut,set)
  
}

  return (
      <header className='navbar'>
        <nav>
        <img src={require('../images/wpnavbar1.png')} />
        <div className='upload'>
        <input className='inputsection' onChange={(e)=>setdosyayukle(e.target.files)}  multiple type="file"  />
        <Button onClick={()=>Dosyaupload()} style={{width:136,color:"#dbe2e5",borderColor:"green",borderWidth:1,fontSize:"12px",textTransform: 'capitalize',
          borderRadius:40,height:25,fontWeight:"bold"  }} variant="outlined" component="label">
            <AddIcon style={{backgroundColor:"green",borderRadius:40,height:14,marginRight:5}}/>
         Dosya Yükle
      </Button>
</div>
  <div style={{marginLeft:10,marginTop:2}}>
    {Progresscircle ?  
     <CircularProgress size={30} color={"primary"} />
      : <CircularProgress style={{display:"none"}} size={30} color={"primary"} /> }
    </div>  
            <ul>
             
                <li className='item1'><p style={{fontSize:16,color:"#00416A",marginTop:16,fontWeight:"600",marginRight:5}}>{Email}</p></li>
                <li className='item3'><Button type='text' disabled={true} style={{backgroundColor:"#00416A",width:'100%',color:"#ECEFF1",borderColor:"red",borderWidth:1,fontSize:"11px",textTransform: 'capitalize',borderRadius:40,height:40,fontWeight:"bold"  }}
     variant="inlined"  endIcon={<FolderIcon style={{backgroundColor:"green",borderRadius:40,height:20,padding:2}}/>}>{formatBytes(boyut)} / 5GB</Button></li>
                <li className='item3'><Button type='submit' style={{backgroundColor:"#00416A",width:'100%',color:"#ECEFF1",borderColor:"red",borderWidth:1,fontSize:"12px",textTransform: 'capitalize',borderRadius:40,height:30 ,fontWeight:"bold"  }}
     variant="inlined" onClick={()=>Cikisyap()} startIcon={<LogoutIcon style={{backgroundColor:"red",borderRadius:40,height:14}}/>}>Çıkış Yap</Button></li>
    
            </ul>
        </nav>
      </header>
  )
}

export default Navbar

