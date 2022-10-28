import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Dosyalistele, Dosyasil } from '../components/Firebase';
import { Divider } from '@mui/material';
import uuid from 'react-uuid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import rar3 from '../images/rar3.png'
import txt from '../images/text3.png'
import pdf from '../images/pdf.png'
import mword from '../images/mword.png'
import power from '../images/powerpoint.png'
import exel from '../images/exel.png'
import mp4 from '../images/mp4.png'
import html from '../images/html.png'
import apk from '../images/apk.png'
import unknown2 from '../images/unknown2.png'
import mp3 from '../images/mp3.png'
import {EmailShareButton ,EmailIcon } from 'react-share';
import { Helmet } from 'react-helmet'


const Home=()=> {

const[Dosyaliste,setdosyalistele]=useState([]);
const[Toplamdosyaboyutu,settoplamdosyaboyutu]=useState(0);


 useEffect(()=>{

   Dosyalistele(setdosyalistele,settoplamdosyaboyutu);
  
  
 },[])  

 const Deletefile=(urlname,urlboyut)=>{

    Dosyasil(urlname,setdosyalistele,Dosyaliste,urlboyut,settoplamdosyaboyutu,Toplamdosyaboyutu);
 }

return(
 <div className='home'>
    <Helmet>
                <meta charSet="utf-8" />
                <title>WpCloud</title>
            </Helmet>
    <div className='navbar'>
        <Navbar gonder={setdosyalistele} boyut={Toplamdosyaboyutu} set={settoplamdosyaboyutu}/>
    </div>
    <div className='homebody'>
    {Dosyaliste.sort((a, b) => a.time - b.time)
    .map((url)=>
    <Card key={uuid()} className='card'>
      <>
      {url.tip=="application/x-zip-compressed"  &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={rar3}>
        </CardMedia>

      }
       {url.tip=="application/zip"  &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={rar3}>
        </CardMedia>
      }
       {url.tip=="text/plain" &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={txt}>
        </CardMedia>
      } 
       {url.tip=="application/pdf" &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={pdf}>
        </CardMedia>
      } 
       {url.tip=="application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={mword}>
        </CardMedia>
      } 
       {url.tip=="application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={power}>
        </CardMedia>
      } 
        {url.tip=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={exel}>
        </CardMedia>
      } 
        {url.tip=="video/mp4" &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={mp4}>
        </CardMedia>
      } 
       {url.tip=="image/png" &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={url.data}>
        </CardMedia>
      }
       {url.tip=="image/jpg" &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={url.data}>
        </CardMedia>
      }
       {url.tip=="image/jpeg" &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={url.data}>
        </CardMedia>
      }
       {url.tip=="video/mpeg" &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={mp4}>
        </CardMedia>
      }
       {url.tip=="text/html" &&
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={html}>
        </CardMedia>
      }
      {url.tip=="application/vnd.android.package-archive" && 
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={apk}>
        </CardMedia>  
        
      }
       {url.tip=="application/octet-stream" && 
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={unknown2}>
        </CardMedia>  
        
      }
       {url.tip=="audio/mpeg" && 
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={mp3}>
        </CardMedia>  
        
      }
       {url.tip=="video/flv" && 
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={mp4}>
        </CardMedia>  
        
      }
       {url.tip=="video/quicktime" && 
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={mp4}>
        </CardMedia>  
        
      }
       {url.tip=="video/fli" && 
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={mp4}>
        </CardMedia>  
        
      }
        {url.tip=="application/x-rar-compressed" && 
      <CardMedia
        style={{objectFit:"scale-down"}}
          component="img"
          height="50"
        image={rar3}>
        </CardMedia>  
        
      }
        <CardContent  style={{width: 'max-content'}}>
          <Typography gutterBottom variant="p" style={{fontSize:12,width:200}} component="div">
            {url.name}
          </Typography>
          <Divider style={{color:"#43A047"}} />
          {/* <Typography variant="body2"  style={{fontSize:10,color:"black"}} color="text.secondary">
            Dosya Tipi: {url.tip}
          </Typography> */}
          <Typography variant="body2" style={{fontSize:12,color:"black",justifyContent:"center",alignItems:"center",fontWeight:"bold"}} color="text.secondary">
            Boyut: {url.boyut}
            <a style={{marginLeft:30}} href={url.data}  target="_blank"><DownloadIcon style={{fontSize:21}}/></a>
            <a style={{marginLeft:15}} onClick={()=>Deletefile(url.name,url.hamboyut)} ><DeleteIcon style={{fontSize:18,color:"red",marginBottom:2}}/></a>
            <EmailShareButton style={{marginLeft:15,marginBottom:10}} subject='WpCloud Link' separator={url.data} url={url.data}>
            <EmailIcon bgStyle={{backgroundColor:"red"}} color="red" iconFillColor="white" size={18} round={true}></EmailIcon>
           </EmailShareButton>
          </Typography> 
        </CardContent>    
        </>
        </Card>     
      )}    
    
  
    
      </div>
    <Divider style={{color:"#43A047"}} />
    
    </div>
 )
}

export default Home