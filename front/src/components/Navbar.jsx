import { useState } from "react";
import "./Navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className={`navbar-sidebar ${sidebarOpen ? "open" : ""}`}>
        <IoMdClose onClick={handleToggleSidebar} className="icon-navbar-close" size={30} />
        <ul className="nav">
          <li className="active">
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#services">Sorteo</a>
          </li>
          <li>
            <a href="#tickets">Tickets</a>
          </li>
          <li>
            <a href="#contact-us">Contacto</a>
          </li>
          <li>
            <Link className="nav-signIn" to="/signIn">
              SignIn
            </Link>
          </li>
        </ul>
      </div>
      <header className="navbar-desktop">
        <a href="#" className="logo">
          Rifas <span className="tree">Oscar</span>
        </a>
        <div className="menuToggle"></div>
        <ul className="nav">
          <li className="active">
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#services">Sorteo</a>
          </li>
          <li>
            <a href="#tickets">Tickets</a>
          </li>
          <li>
            <a href="#contact-us">Contacto</a>
          </li>
          <li>
            <Link className="nav-signIn" to="/signIn">
              SignIn
            </Link>
          </li>
        </ul>
      </header>
      {/*Responsive*/}
      <header className="navbar-mobile">
        <RxHamburgerMenu onClick={handleToggleSidebar} className="icon-navbar-mobile" size={40} />
        <a href="#" className="logo">
          Rifas <span className="tree">Oscar</span>
        </a>
      </header>
    </>
  );
};
