import React from 'react';
import Navbar from '../Components/Navbar';

import Footer from '../Components/Footer';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <div>
        <div className='font-poppins'>
          <header>
            <section>
              {/* <TopBrands></TopBrands> */}
            </section>
            <nav> <Navbar></Navbar></nav>
          </header>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default Main;