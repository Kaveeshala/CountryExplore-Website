import { useEffect, useState } from "react";
import { Dropdown, Avatar } from "antd";
import { UserOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/home';
  };

  const menuItems = [
    {
      key: 'profile',
      label: <a href="/profile">Profile</a>,
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <header
      className={`mx-auto max-w-7xl mt-2 bg-[#D8E4D3] shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />

        {/* Hamburger Icon */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black text-xl focus:outline-none"
          >
            {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden sm:flex items-center space-x-8">
          <Link to="/home" className="hover:underline transition text-black">Home</Link>
          <Link to="/aboutus" className="hover:underline transition text-black">About Us</Link>
          <Link to="/contactus" className="hover:underline transition text-black">Contact Us</Link>
        </nav>

        {/* Right Side */}
        <div className="hidden sm:block">
          {token ? (
            <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
              <Avatar icon={<UserOutlined />} className="cursor-pointer" />
            </Dropdown>
          ) : (
            <a
              href="/login"
              className="bg-[#347928] text-white hover:bg-[#347928]/80 hover:text-white font-semibold px-6 py-2 rounded transition"
            >
              Login
            </a>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col space-y-4 text-center">
          <Link to="/home" className="text-black hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/aboutus" className="text-black hover:underline" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contactus" className="text-black hover:underline" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-red-600 font-semibold"
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="bg-[#347928] text-white hover:bg-[#347928]/80 font-semibold px-6 py-2 rounded"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </a>
          )}
        </div>
      )}
    </header>
  );
}
