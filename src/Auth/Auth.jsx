import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';

const Auth = () => {


    const location = useLocation();

    useEffect(() => {
        // Map paths to titles
        const titles = {
            "/auth/login": "Login | chill Gammer",
            "/auth/register": "Register | chill Gammer",
            
        };

        // Set the page title based on the current path
        document.title = titles[location.pathname] || "chill Gammer";
    }, [location]);
    return (
        <div className='bg-[#060D15] '>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Auth;