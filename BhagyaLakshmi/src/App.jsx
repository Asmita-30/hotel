import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import Components
import Header from "./componets/header";
import Footer from "./componets/footer";

// Import Pages
import Shop from "./page/shop";
import Menu from "./page/menu";
import Gifting from "./page/gifiting";
import About from "./page/about";
import Order from "./page/order";

// Page Transition Animation
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={{ minHeight: "100vh", paddingTop: "88px" }}
    >
      {children}
    </motion.div>
  );
}

// Loading Component
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#FBF6EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ fontSize: 64, marginBottom: 20 }}
      >
        ✦
      </motion.div>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 20,
          color: "#C8A96E",
          fontWeight: 600,
        }}
      >
        Loading BhagyaLakshmi...
      </motion.div>
      <div style={{
        width: 200,
        height: 2,
        background: "#F0E8D6",
        marginTop: 30,
        borderRadius: 2,
        overflow: "hidden",
      }}>
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "50%",
            height: "100%",
            background: "#C8A96E",
            borderRadius: 2,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("shop");
  const [loading, setLoading] = useState(false);

  const navigateTo = (page) => {
    setLoading(true);
    setCurrentPage(page);
    setTimeout(() => {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "shop":
        return <Shop />;
      case "menu":
        return <Menu />;
      case "gifting":
        return <Gifting />;
      case "about":
        return <About />;
      case "order":
        return <Order />;
      default:
        return <Shop />;
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FBF6EE",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            background: #FBF6EE;
          }
          
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #F0E8D6;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #C8A96E;
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #B8942E;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          ::selection {
            background: #C8A96E;
            color: #2C1810;
          }
        `}
      </style>

      <Header onNavigate={navigateTo} currentPage={currentPage} />

      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <PageWrapper key={currentPage}>
          {renderPage()}
        </PageWrapper>
      </AnimatePresence>

      <Footer />

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: typeof window !== 'undefined' && window.scrollY > 300 ? 1 : 0,
          scale: typeof window !== 'undefined' && window.scrollY > 300 ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          width: 50,
          height: 50,
          borderRadius: 25,
          background: "#2C1810",
          color: "#F5E8C8",
          border: "1px solid #C8A96E",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          zIndex: 100,
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
        whileHover={{
          scale: 1.1,
          background: "#C8A96E",
          color: "#2C1810",
        }}
        whileTap={{ scale: 0.9 }}
      >
        ↑
      </motion.button>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{
          position: "fixed",
          bottom: 100,
          right: 30,
          width: 55,
          height: 55,
          borderRadius: 28,
          background: "#25D366",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
          cursor: "pointer",
          zIndex: 100,
          boxShadow: "0 4px 15px rgba(37,211,102,0.3)",
          textDecoration: "none",
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 6px 20px rgba(37,211,102,0.4)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        💬
      </motion.a>
    </div>
  );
}