import React, { useState, useEffect } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#ebcfb2] shadow-md">
      <div className="text-xl font-bold">CampusRank Ke</div>
      <div className="flex items-center md:hidden">
        <button onClick={toggleMenu} className="text-gray-700 hover:text-c3a287 focus:outline-none">
          <FaBars size={24} />
        </button>
      </div>
      <nav className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <div className="relative my-4 md:my-0 md:mr-4">
          <input
            className="w-full md:w-48 px-3 py-2 rounded-full focus:md:w-55 focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
            type="text"
            placeholder="Search Campus..."
          />
          <div className="absolute top-0 right-0 flex items-center justify-center w-10 h-full text-gray-400">
            <FaSearch />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center">
          <Link to="/contact" className="block text-gray-700 hover:text-c3a287 md:mr-4 my-2 md:my-0">
            Contact
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="block text-gray-700 hover:text-c3a287 md:mr-4 my-2 md:my-0">
                <CgProfile size={24} title="Profile" />
              </Link>
              <button
                className="block text-gray-700 hover:text-c3a287 md:mr-4 my-2 md:my-0"
                onClick={() => localStorage.removeItem('token')}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="block text-gray-700 hover:text-c3a287 md:mr-4 my-2 md:my-0"
                onClick={() => setIsLoginFormOpen(true)}
              >
                Login
              </button>
              {isLoginFormOpen && <LoginForm onClose={() => setIsLoginFormOpen(false)} />}
              <button
                className="block text-gray-700 hover:text-c3a287 md:mr-4 my-2 md:my-0"
                onClick={() => setIsRegisterFormOpen(true)}
              >
                Register
              </button>
              {isRegisterFormOpen && <RegisterForm onClose={() => setIsRegisterFormOpen(false)} />}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
