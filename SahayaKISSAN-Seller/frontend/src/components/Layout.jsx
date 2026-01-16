import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

export default function Layout(){
    return(
        <>  
  
            <Navbar/>
            <ScrollToTop /> 
            <Outlet/>
        </>
    )
}