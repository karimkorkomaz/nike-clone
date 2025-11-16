import React, { useRef, useState } from "react";

import '../Styles/Navbar.css';
import Logo from '../Assets/brand.png';
import AuthModal from './AuthModal';



const SearchIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);



const BagIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M8 8.4C8 6.2 9.79086 4.4 12 4.4C14.2091 4.4 16 6.2 16 8.4V9H8V8.4ZM7 9H17V19.8C17 20.9201 16.1201 21.8 15 21.8H9C7.87989 21.8 7 20.9201 7 19.8V9Z" stroke="#111111" strokeWidth="1.5"></path></svg>
);

const HamburgerIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M4 6H20M4 12H20M4 18H20" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);

const CloseIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);




const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    }
    const modalRef = useRef();

    return (
        <>
            <header className="nike-header">
               
                
                <nav className="main-nav">
                   
                    <img src={Logo}/>
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/Men">Men</a></li>
                        <li><a href="/Women">Women</a></li>
                        <li><a href="/Kids">Kids</a></li>
                        <li><a href="/Contact">Contact Us</a></li>
                       
                    </ul>
                    
                        
                    
                    <div className="nav-icons">
                        <div className="search-container">
                            <button className="search-icon">
                                <SearchIcon />
                            </button>
                           
                            <input type="text" placeholder="Search" />
                        </div>
                      
                        <a href="#" className="icon-btn bag-icon">
                            <BagIcon />
                        </a>
                        <button className='button1' onClick={() => modalRef.current.openModal()}>
                        Login
                       </button>
                        
                        <button className="hamburger" onClick={toggleMobileMenu}>
                            <HamburgerIcon />
                        </button>
                    </div>
                </nav>
                <AuthModal ref={modalRef} />
            </header>


            {/* MOBILE*/}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <button className="close-btn" onClick={closeMobileMenu}>
                    <CloseIcon />
                </button>
                <ul onClick={closeMobileMenu}>
                    <li><a href="#">New & Featured</a></li>
                    <li><a href="#">Men</a></li>
                    <li><a href="#">Women</a></li>
                    <li><a href="#">Kids</a></li>
                    <li><a href="#">Sale</a></li>
                    <li><a href="#">SNKRS</a></li>
                </ul>
                <div className="mobile-sub-links">
                 
                    <a href="#">Help</a>
                    <a href="#">Join Us</a>
                    <a href="#">Sign In</a>
                </div>
            </div>
        </>
    );
};

export default Navbar;