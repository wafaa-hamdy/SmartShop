import React from 'react'
import style from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from "../Footer/Footer";
import { useEffect } from 'react'


export default function Layout() {

 

  return <>

  <Navbar/>


<div className="container  MY-5 py-18 lg:12"> 

   <Outlet/>

</div>




<Footer/>
  </>
   
 
}
