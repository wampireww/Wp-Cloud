import React from 'react'
import { Helmet } from 'react-helmet'
const Nopage=()=> {
  return (
    <div className='nopage' >
         <Helmet>
                <meta charSet="utf-8" />
                <title>WpCloud</title>
            </Helmet>
        <h4 style={{color:"#CFD8DC"}}>Sayfa bulanamadı !  </h4>
    </div>
  )
}

export default Nopage