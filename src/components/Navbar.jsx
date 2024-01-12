import React, {useContext} from "react";
import { NavLink } from 'react-router-dom';
import "../styles/base.css"
import "../styles/Navbar.css";
import { AppContext } from "./AppContext";


function Navbar(){
    const { isUserLogged, setIsUserLogged, handleLogout } = useContext(
        AppContext
      );
      let userData = localStorage.getItem('user') === 'null' ? '' : JSON.parse(localStorage.getItem('user'));
    const isUserLoggedLS = localStorage.getItem("isUserLogged") === "true";
    function logOut(){
        localStorage.setItem("isUserLogged", false)
        localStorage.setItem("user", null);
        handleLogout();
    }
    return (
        <header className="full-block">
            <div className="header-navigation-container" id="scroll-container">
                <div className="container">
                    <div className="navigation">
                        <div className="navigation-left-side">
                            <NavLink to="/"><img src="./../src/assets/logo.svg" width="200px" alt="" /></NavLink>                        
                        </div>
                        <div className="navigation-right-side">
                            <nav>
                                {(userData ? userData?.role !== 'admin' : true)? (
                            <ul>
                                <li>
                                    <NavLink className="page" to="/">Home</NavLink>                        
                                </li>
                                <li>
                                    <NavLink className="page"  to="/shoes">Shoes</NavLink>                        
                                </li>
                                {/* <li>
                                    <NavLink className="page"  to="/accessories">Accessories</NavLink>                        
                                </li> */}
                                <li>
                                    <NavLink className="page"  to="/contactUs">Contact Us</NavLink>                        
                                </li>
                                {!isUserLoggedLS && <li>
                                   <NavLink className="page"  to="/login">Log In</NavLink>                 
                                </li>}
                                {!isUserLoggedLS && <li>
                                     <NavLink className="page"  to="/signup">Sign Up</NavLink>                   
                                </li>}
                                {(isUserLogged || isUserLoggedLS) && <li>
                                   <NavLink to="/" onClick={logOut}  className="custom-active-class">Log Out</NavLink>                     
                                </li>}
                                {(isUserLogged || isUserLoggedLS) && <li>
                                   <span className="navlinkName">Hello {JSON.parse(localStorage.getItem("user")).username}</span>                     
                                </li>}
                                <li>
                                    <NavLink to="/cart">
                                        <img src="./../src/assets/shopping-cart.svg" width="30px" alt=""/>
                                    </NavLink>                        
                                </li>
                            </ul>
                            ):(
                                <ul>
                                <li>
                                    <NavLink className="page" to="/">Home</NavLink>                        
                                </li>
                                <li>
                                    <NavLink className="page" to="/adminProduct">Product</NavLink>                        
                                </li>
                                {(isUserLogged || isUserLoggedLS) && <li>
                                   <NavLink to="/" onClick={logOut}  className="custom-active-class">Log Out</NavLink>                     
                                </li>}
                                {(isUserLogged || isUserLoggedLS) && <li>
                                   <span className="navlinkName">Hello {JSON.parse(localStorage.getItem("user")).username}<br/>Your are Logged as Admin</span>                     
                                </li>}
                                <li>
                                    <NavLink to="/cart">
                                        <img src="./../src/assets/shopping-cart.svg" width="30px" alt=""/>
                                    </NavLink>                        
                                </li>
                            </ul>
                            )}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;