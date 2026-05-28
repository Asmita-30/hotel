import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Navigation Links
const NAV_LINKS = [
  { label: "Shop", page: "shop", icon: "🛍️" },
  { label: "Menu", page: "menu", icon: "🍽️" },
  { label: "Gifting", page: "gifting", icon: "🎁" },
  { label: "About Us", page: "about", icon: "✨" },
  { label: "Order", page: "order", icon: "🍔" },
];

// Marquee rotating items with all menu items
const MARQUEE_ITEMS = [
  "✦ Fresh Baked Daily",
  "✦ Belgian Chocolate Macaron - ₹80",
  "✦ Red Velvet Cupcake - ₹80",
  "✦ Burnt Basque Cheesecake - ₹180",
  "✦ Cheese Sev Puri - ₹100",
  "✦ Dahi Ragda Puri - ₹70",
  "✦ Palak Patta Chaat - ₹80",
  "✦ Cheese Pav Bhaji - ₹150",
  "✦ Paneer Cheese Pav Bhaji - ₹220",
  "✦ Cheese Masala Pav - ₹120",
  "✦ Choco Nutella Shake - ₹120",
  "✦ Mango Shake - ₹150",
  "✦ Green Apple Mojito - ₹90",
  "✦ Paneer Mozzarella Burger - ₹280",
  "✦ Smoky Barbeque Cottage Cheese Pizza - ₹320",
  "✦ Cheese Loaded Nachos - ₹300",
  "✦ Nutella Kunafa - ₹220",
  "✦ Ferrero Brownie - ₹110",
  "✦ Mango Falooda - ₹180",
  "✦ Pista Kunafa - ₹250",
  "✦ Lotus Biscoff Kunafa - ₹220",
  "✦ Almond Nest Kataif Kunafa - ₹200",
];

export default function Header({ onNavigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { scrollY } = useScroll();

  // Load cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("orderCart");
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const count = Object.values(cart).reduce((sum, item) => sum + (item.quantity || 1), 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };
    
    updateCartCount();
    
    // Listen for storage events
    window.addEventListener("storage", updateCartCount);
    
    // Custom event for cart updates
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);
    
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // Update navbar background based on scroll
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setScrolled(latest > 40);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const navBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(251, 246, 238, 0)", "rgba(251, 246, 238, 0.98)"]
  );

  const handleNavigation = (page) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .header-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }

        /* Marquee Strip */
        .marquee-container {
          background: linear-gradient(135deg, #D4AF37 0%, #C5A028 100%);
          overflow: hidden;
          padding: 8px 0;
          position: relative;
          z-index: 10;
        }

        .marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marqueeScroll 45s linear infinite;
          width: fit-content;
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-item {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #1a0f0a;
          padding: 0 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .marquee-item::before {
          content: "★";
          font-size: 8px;
          color: #1a0f0a;
          opacity: 0.7;
        }

        /* Main Navbar */
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4rem;
          height: 80px;
          transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          backdrop-filter: blur(0px);
          background: #FBF6EE;
        }

        .navbar.scrolled {
          height: 68px;
          backdrop-filter: blur(12px);
          background: rgba(251, 246, 238, 0.95);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
        }

        /* Logo */
        .logo-link {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          text-decoration: none;
          cursor: pointer;
        }

        .logo-image {
          width: 48px;
          height: 48px;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
          transition: transform 0.3s ease;
        }

        .logo-image:hover {
          transform: scale(1.02);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #2C1810;
          line-height: 1.2;
        }

        .logo-name span {
          font-weight: 400;
          color: #C8A96E;
        }

        .logo-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C8A96E;
          margin-top: 2px;
        }

        /* Desktop Navigation - BLACK TEXT */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #2C1810;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 0;
          position: relative;
          transition: color 0.25s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #C8A96E;
        }

        .nav-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #C8A96E, #D4AF37);
          transition: width 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }

        .nav-link:hover .nav-underline,
        .nav-link.active .nav-underline {
          width: 100%;
        }

        /* Right Icons */
        .nav-icons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-btn {
          background: rgba(200, 169, 110, 0.1);
          border: 1px solid rgba(200, 169, 110, 0.3);
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justifyContent: center;
          transition: all 0.25s ease;
          color: #2C1810;
        }

        .icon-btn:hover {
          background: rgba(200, 169, 110, 0.2);
          border-color: #C8A96E;
          transform: translateY(-2px);
          color: #C8A96E;
        }

        .cart-wrapper {
          position: relative;
        }

        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #C8A96E;
          color: #2C1810;
          font-size: 0.6rem;
          font-weight: 800;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
        }

        .order-btn {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #C8A96E, #B8942E);
          border: none;
          color: #2C1810;
          padding: 0.65rem 1.6rem;
          border-radius: 40px;
          cursor: pointer;
          transition: all 0.25s ease;
          margin-left: 0.3rem;
        }

        .order-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(200, 169, 110, 0.3);
          background: linear-gradient(135deg, #D4AF37, #C8A96E);
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .hamburger-line {
          width: 24px;
          height: 2px;
          background: #2C1810;
          transition: all 0.3s ease;
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: #FBF6EE;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          padding: 2rem;
        }

        .mobile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .mobile-close {
          background: rgba(200, 169, 110, 0.1);
          border: 1px solid rgba(200, 169, 110, 0.3);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #2C1810;
          font-size: 1.5rem;
          transition: all 0.2s ease;
        }

        .mobile-close:hover {
          background: rgba(200, 169, 110, 0.2);
          transform: rotate(90deg);
        }

        .mobile-nav-links {
          list-style: none;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .mobile-nav-item {
          border-bottom: 1px solid rgba(200, 169, 110, 0.15);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 0;
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: #2C1810;
          text-decoration: none;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .mobile-nav-link:hover {
          color: #C8A96E;
          padding-left: 0.5rem;
        }

        .mobile-footer {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(200, 169, 110, 0.15);
        }

        .mobile-footer-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C8A96E;
          margin-bottom: 1rem;
        }

        .mobile-social {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .mobile-social-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #2C1810;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border: 1px solid rgba(200, 169, 110, 0.3);
          border-radius: 30px;
          transition: all 0.2s ease;
        }

        .mobile-social-link:hover {
          background: rgba(200, 169, 110, 0.1);
          border-color: #C8A96E;
          color: #C8A96E;
        }

        .gold-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #C8A96E, #D4AF37, #C8A96E, transparent);
          opacity: 0.3;
        }

        @media (max-width: 1000px) {
          .navbar {
            padding: 0 2rem;
          }
          .nav-links {
            gap: 1.5rem;
          }
        }

        @media (max-width: 900px) {
          .navbar {
            padding: 0 1.5rem;
          }
          .nav-links {
            display: none;
          }
          .order-btn {
            display: none;
          }
          .hamburger {
            display: flex;
          }
        }

        @media (max-width: 550px) {
          .logo-name {
            font-size: 1rem;
          }
          .logo-tagline {
            display: none;
          }
          .logo-image {
            width: 38px;
            height: 38px;
          }
          .icon-btn {
            padding: 6px;
          }
          .icon-btn svg {
            width: 16px;
            height: 16px;
          }
          .marquee-item {
            font-size: 8px;
            padding: 0 1rem;
          }
        }
      `}</style>

      <div className="header-root">
        {/* Animated Marquee Strip */}
        <motion.div
          className="marquee-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span key={idx} className="marquee-item">{item}</span>
            ))}
          </div>
        </motion.div>

        {/* Main Navigation Bar */}
        <motion.nav
          style={{ background: navBg }}
          className={`navbar ${scrolled ? "scrolled" : ""}`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 100 }}
        >
          {/* Logo Section */}
          <motion.div
            className="logo-link"
            onClick={() => handleNavigation("shop")}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.img
              src="/logo.png"
              alt="BhagyaLakshmi Logo"
              className="logo-image"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="logo-text">
              <span className="logo-name">
                Bhagya<span>Lakshmi</span>
              </span>
              <span className="logo-tagline">SNACKS CORNER</span>
            </div>
          </motion.div>

          {/* Desktop Navigation Links */}
          <motion.ul
            className="nav-links"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.2 }
              }
            }}
          >
            {NAV_LINKS.map((link) => (
              <motion.li
                key={link.label}
                variants={{
                  hidden: { opacity: 0, y: -15 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4 }}
              >
                <button
                  className={`nav-link ${currentPage === link.page ? "active" : ""}`}
                  onClick={() => handleNavigation(link.page)}
                >
                  {link.label}
                  <span className="nav-underline" />
                </button>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right Side Icons & CTA */}
          <motion.div
            className="nav-icons"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <motion.button
              className="icon-btn"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <line x1="15" y1="15" x2="21" y2="21" />
              </svg>
            </motion.button>

            <div className="cart-wrapper">
              <motion.button
                className="icon-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Cart"
                onClick={() => handleNavigation("order")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </motion.button>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    className="cart-badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              className="order-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavigation("order")}
              animate={{
                boxShadow: ["0px 0px 0px rgba(200,169,110,0)", "0px 0px 12px rgba(200,169,110,0.4)", "0px 0px 0px rgba(200,169,110,0)"]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              ORDER NOW
            </motion.button>

            {/* Hamburger Menu Button */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </motion.div>
        </motion.nav>

        {/* Decorative Gold Divider */}
        <motion.div
          className="gold-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="mobile-header">
              <motion.div
                className="logo-link"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => handleNavigation("shop")}
              >
                <img src="/logo.png" alt="Logo" className="logo-image" style={{ width: 40, height: 40 }}
                  onError={(e) => { e.target.style.display = "none"; }} />
                <div className="logo-text">
                  <span className="logo-name" style={{ fontSize: "1.1rem" }}>BhagyaLakshmi</span>
                </div>
              </motion.div>
              <motion.button
                className="mobile-close"
                onClick={() => setMenuOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            <ul className="mobile-nav-links">
              {NAV_LINKS.map((link, idx) => (
                <motion.li
                  key={link.label}
                  className="mobile-nav-item"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 + 0.2 }}
                >
                  <button
                    className="mobile-nav-link"
                    onClick={() => handleNavigation(link.page)}
                  >
                    <span>{link.icon} {link.label}</span>
                    <motion.span
                      initial={{ x: -5, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.08 + 0.3 }}
                    >
                      →
                    </motion.span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mobile-footer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="mobile-footer-title">Connect With Us</p>
              <div className="mobile-social">
                <a href="#" className="mobile-social-link">Instagram</a>
                <a href="#" className="mobile-social-link">WhatsApp</a>
                <a href="#" className="mobile-social-link">Swiggy</a>
                <a href="#" className="mobile-social-link">Zomato</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}