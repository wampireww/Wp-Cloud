import React, { useEffect, useState } from 'react'
import { Route,Routes,BrowserRouter ,HashRouter} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Nopage from '../pages/Nopage'
import Signup from '../pages/Signup'


const RRoutes=()=> {

    const[girisyapildi,setgirisyapildi]=useState(false);

    useEffect(()=>{

      const giris = JSON.parse(localStorage.getItem('giris'));

      if(giris==true){
        setgirisyapildi(true)
      }
      else{
        setgirisyapildi(false)
      }
     
     // localStorage.clear();
    })
    if(girisyapildi===true){
      return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/Signup' element={<Home/>} />
                    <Route path='/Home' element={<Home/>} />
                    <Route path='*' element={<Nopage/>} />
                </Routes>
            </BrowserRouter>
        </div>
      );
    }
    else {

      return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='/Signup' element={<Signup/>} />
                    <Route path='/Home' element={<Login/>} />
                    <Route path='*' element={<Nopage/>} />
                </Routes>
            </BrowserRouter>
        </div>
      );

    }

      



  
 

    
    
 
}

export default RRoutes