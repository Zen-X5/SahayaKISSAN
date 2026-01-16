import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";
export default function Layout(){
    return(
        <>  
            <Navbar/>
            <ScrollToTop /> 
            <Outlet/>
            <Footer/>
        </>
    )
}