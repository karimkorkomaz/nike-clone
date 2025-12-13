import React, { useRef, useState, useEffect, useContext } from "react";
import "../Styles/Navbar.css";
import Logo from '../Assets/brand.png';
import AuthModal from './AuthModal';
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";


/* ICONS */
const SearchIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
        <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const BagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
);

const HamburgerIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
        <path d="M4 6H20M4 12H20M4 18H20"
            stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CloseIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
        <path d="M18 6L6 18M6 6L18 18"
            stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Navbar = () => {

    const { user, logout } = useAuth();

    const { cart } = useContext(CartContext);  // CART BADGE

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [username, setUsername] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const modalRef = useRef();
    const navigate = useNavigate();

    /* SEARCH HANDLERS */
    const handleSearch = (e) => {
        if (e.key === "Enter" && searchTerm.trim() !== "") {
            navigate(`/search?q=${searchTerm}`);
        }
    };

    const handleSearchClick = () => {
        if (searchTerm.trim() !== "") {
            navigate(`/search?q=${searchTerm}`);
        }
    };

    /* LOGIN CHECK ON PAGE LOAD */
    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedRole = localStorage.getItem("role");
        const savedName = localStorage.getItem("name");

        if (token) {
            setIsLoggedIn(true);
            setRole(savedRole);
            setUsername(savedName);
        }
    }, []);

    /* MOBILE MENU */
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    /* LOGOUT */
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        setIsLoggedIn(false);
        setRole(null);
        setUsername("");

        alert("Logged out");
        window.location.href = "/";
    };

    /* LOGIN SUCCESS CALLBACK */
    const handleLoginSuccess = () => {
        const savedRole = localStorage.getItem("role");
        const savedName = localStorage.getItem("name");

        setIsLoggedIn(true);
        setRole(savedRole);
        setUsername(savedName);
    };

    return (
        <>
            <header className="nike-header">
                <nav className="main-nav">

                    <img src={Logo} alt="Logo" />

                    {/* NAVIGATION LINKS */}
                    <ul className="nav-links">
                       <li><a href="/">Home</a></li>
                       <li><a href="/Men">Men</a></li>
                       <li><a href="/Women">Women</a></li>
                       <li><a href="/Kids">Kids</a></li>
                       <li><a href="/Contact">Contact Us</a></li>

                        {user && (
                        <li><a href="/orders">My Orders</a></li>
                        )}


                 {role === "admin" && <li><a href="/admin">Add Product</a></li>}
                    </ul>


                    {/* RIGHT SIDE ICONS */}
                    <div className="nav-icons">

                        {/* SEARCH BAR */}
                        <div className="search-container">
                            <button className="search-icon" onClick={handleSearchClick}>
                                <SearchIcon />
                            </button>

                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>

                        {/* CART BUTTON WITH BADGE */}
                        <button
                            onClick={() => navigate("/cart")}
                            className="icon-btn bag-icon cart-btn"
                            style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}
                        >
                            <BagIcon />

                            {cart.length > 0 && (
                                <span className="cart-badge">{cart.length}</span>
                            )}
                        </button>

                        {/* LOGIN / LOGOUT */}
                        {!isLoggedIn ? (
                            <button className="button1" onClick={() => modalRef.current.openModal()}>
                                Login
                            </button>
                        ) : (
                            <button className="button1" onClick={handleLogout}>
                                Logout ({username})
                            </button>
                        )}

                        {/* MOBILE MENU BUTTON */}
                        <button className="hamburger" onClick={toggleMobileMenu}>
                            <HamburgerIcon />
                        </button>
                    </div>
                </nav>

                {/* AUTH MODAL */}
                <AuthModal ref={modalRef} onLogin={handleLoginSuccess} />
            </header>

            {/* MOBILE MENU */}
            <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
                <button className="close-btn" onClick={closeMobileMenu}>
                    <CloseIcon />
                </button>

                <ul onClick={closeMobileMenu}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/Men">Men</a></li>
                    <li><a href="/Women">Women</a></li>
                    <li><a href="/Kids">Kids</a></li>

                    {user && (
                    <li><a href="/orders">My Orders</a></li>
                    )}

                    {role === "admin" && (
                        <li><a href="/admin">Add Product</a></li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Navbar;
