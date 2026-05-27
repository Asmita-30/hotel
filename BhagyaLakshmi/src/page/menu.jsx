import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Complete Menu Data with Images
const MENU_DATA = {
  bakery: {
    title: "BAKERY SPECIALS",
    emoji: "🥐",
    description: "Freshly baked everyday with premium ingredients",
    bgGradient: "linear-gradient(135deg, #FFF5E6, #FFE8D4)",
    items: [
      { id: 1, name: "Belgian Chocolate Macron", price: 80, desc: "Crispy almond shell with rich Belgian chocolate ganache", image: "/src/assets/menu/Belgian Chocolate Macron.png", tag: "Bestseller", calories: "180 cal" },
      { id: 2, name: "Red Velvet Cupcake", price: 80, desc: "Velvety red sponge with cream cheese frosting", image: "/src/assets/menu/Red Velvet Cupcake.png", tag: "Popular", calories: "210 cal" },
      { id: 3, name: "Burnt Basque Cheesecake", price: 180, desc: "Caramelized crust with creamy custard centre", image: "/src/assets/menu/Burnt Basque Cheesecake.png", tag: "Signature", calories: "320 cal" }
    ]
  },
  chaat: {
    title: "CHAAT CORNER",
    emoji: "🌶️",
    description: "Authentic street-style chaats bursting with flavors",
    bgGradient: "linear-gradient(135deg, #FFF0E0, #FFE4CC)",
    items: [
      { id: 4, name: "Cheese Sev Puri", price: 100, desc: "Crispy puri topped with cheese, sev & chutneys", image: "/src/assets/menu/Cheese Sev Puri.png", tag: "Cheesy", calories: "250 cal" },
      { id: 5, name: "Dahi Ragda Puri", price: 70, desc: "Yoghurt, ragda & sweet chutney on crispy puri", image: "/src/assets/menu/Dahi Ragda Puri.png", tag: "Classic", calories: "190 cal" },
      { id: 6, name: "Palak Patta Chaat", price: 80, desc: "Crispy spinach leaves with yoghurt & tamarind", image: "/src/assets/menu/Palak Patta Chaat.png", tag: "Crispy", calories: "170 cal" }
    ]
  },
  pavbhaji: {
    title: "PAV BHAJI & PULAV",
    emoji: "🫕",
    description: "Mumbai's favorite street food, made with love",
    bgGradient: "linear-gradient(135deg, #FFF2E3, #FFE6D0)",
    items: [
      { id: 7, name: "Cheese Pav Bhaji", price: 150, desc: "Buttery pav with spicy bhaji & melted cheese", image: "/src/assets/menu/Cheese Pav Bhaji.png", tag: "Cheesy", calories: "380 cal" },
      { id: 8, name: "Paneer Cheese Pav Bhaji", price: 220, desc: "Rich paneer bhaji with extra cheese pull", image: "/src/assets/menu/Paneer Cheese Pav Bhaji.png", tag: "Premium", calories: "420 cal" },
      { id: 9, name: "Cheese Masala Pav", price: 120, desc: "Spicy masala pav topped with melted cheese", image: "/src/assets/menu/Cheese Masala Pav.png", tag: "Spicy", calories: "290 cal" }
    ]
  },
  shakes: {
    title: "SHAKES & COOLERS",
    emoji: "🥤",
    description: "Refreshing shakes and coolers to beat the heat",
    bgGradient: "linear-gradient(135deg, #E8F4F8, #DDEFF5)",
    items: [
      { id: 10, name: "Choco Nutella Shake", price: 120, desc: "Hazelnut cocoa shake topped with whipped cream", image: "/src/assets/menu/Choco Nutella Shake.png", tag: "Indulgent", calories: "450 cal" },
      { id: 11, name: "Mango Shake", price: 150, desc: "Fresh alphonso mango thick shake", image: "/src/assets/menu/Mango Shake.png", tag: "Seasonal", calories: "380 cal" },
      { id: 12, name: "Green Apple Mojito", price: 90, desc: "Zesty mint & green apple cooler with soda", image: "/src/assets/menu/Green Apple Mojito.png", tag: "Refreshing", calories: "120 cal" }
    ]
  },
  fastfood: {
    title: "CAFÉ FAST FOOD",
    emoji: "🍔",
    description: "Gourmet fast food made with quality ingredients",
    bgGradient: "linear-gradient(135deg, #FFF0E8, #FFE6DA)",
    items: [
      { id: 13, name: "Paneer Mozzarella Burger", price: 280, desc: "Grilled paneer patty with mozzarella & herb mayo", image: "/src/assets/menu/Paneer Mozzarella Burger.png", tag: "Gourmet", calories: "550 cal" },
      { id: 14, name: "Smoky Barbeque Cottage Cheese Pizza", price: 320, desc: "BBQ sauce, cottage cheese, bell peppers & onions", image: "/src/assets/menu/Smoky Barbeque Cottage.png", tag: "Bestseller", calories: "620 cal" },
      { id: 15, name: "Cheese Loaded Nachos", price: 300, desc: "Crispy nachos with four cheese sauce & salsa", image: "/src/assets/menu/Cheese Loaded Nachos.png", tag: "Loaded", calories: "480 cal" }
    ]
  },
  desserts: {
    title: "DESSERTS & SWEETS",
    emoji: "🍨",
    description: "Decadent desserts to satisfy your sweet cravings",
    bgGradient: "linear-gradient(135deg, #FFF0F0, #FFE4E4)",
    items: [
      { id: 16, name: "Nutella Kunafa", price: 220, desc: "Crispy kunafa with creamy Nutella filling", image: "/src/assets/menu/Nutella Kunafa.png", tag: "Trending", calories: "520 cal" },
      { id: 17, name: "Ferrero Brownie", price: 110, desc: "Fudgy brownie topped with Ferrero Rocher", image: "/src/assets/menu/Ferrero Brownie.png", tag: "Premium", calories: "350 cal" },
      { id: 18, name: "Mango Falooda", price: 180, desc: "Mango jelly, vermicelli, basil seeds & ice cream", image: "/src/assets/menu/Mango Falooda.png", tag: "Refreshing", calories: "420 cal" }
    ]
  },
  signatures: {
    title: "PREMIUM SIGNATURES",
    emoji: "👑",
    description: "Our signature creations made with finest ingredients",
    bgGradient: "linear-gradient(135deg, #F5EDE0, #EDE0CC)",
    items: [
      { id: 19, name: "Pista Kunafa", price: 250, desc: "Persian pistachio cream & crushed pistachios", image: "/src/assets/menu/Pista Kunafa.png", tag: "Signature", calories: "550 cal" },
      { id: 20, name: "Lotus Biscoff Kunafa", price: 220, desc: "Caramelised biscuit spread with Lotus crunch", image: "/src/assets/menu/Lotus Biscoff Kunafa.png", tag: "Trending", calories: "530 cal" },
      { id: 21, name: "Almond Nest Kataif Kunafa", price: 200, desc: "Almond filled kataif pastry nest with honey", image: "/src/assets/menu/Almond Nest Kataif Kunafa.png", tag: "Artisan", calories: "500 cal" }
    ]
  }
};

// Tag color mapping
const tagColors = {
  Bestseller: { bg: "#FFE0B5", text: "#C45100", border: "#FFB347", icon: "🔥" },
  Premium: { bg: "#E8D5F5", text: "#6A1B9A", border: "#BA68C8", icon: "💎" },
  Trending: { bg: "#FFD6E0", text: "#AD1457", border: "#F06292", icon: "📈" },
  Classic: { bg: "#D4E8D4", text: "#2E7D32", border: "#81C784", icon: "⭐" },
  Signature: { bg: "#FFF0C4", text: "#BF8F00", border: "#FFD54F", icon: "👑" },
  Indulgent: { bg: "#F5DEB3", text: "#8B4513", border: "#D2B48C", icon: "🍫" },
  Crispy: { bg: "#FFE0B2", text: "#E65100", border: "#FF9800", icon: "✨" },
  Loaded: { bg: "#FFF3E0", text: "#E65100", border: "#FFB74D", icon: "🧀" },
  Cheesy: { bg: "#FFF9C4", text: "#F57F17", border: "#FFF176", icon: "🧀" },
  Spicy: { bg: "#FFCCBC", text: "#BF360C", border: "#FF8A65", icon: "🌶️" },
  Seasonal: { bg: "#E0F7FA", text: "#006064", border: "#4DD0E1", icon: "🌸" },
  Refreshing: { bg: "#E0F2F1", text: "#004D40", border: "#80CBC4", icon: "💚" },
  Gourmet: { bg: "#F3E5F5", text: "#4A148C", border: "#CE93D8", icon: "🍽️" },
  Artisan: { bg: "#EFEBE9", text: "#4E342E", border: "#BCAAA4", icon: "🎨" },
  Popular: { bg: "#E8EAF6", text: "#1A237E", border: "#9FA8DA", icon: "❤️" },
  default: { bg: "#F5F5F5", text: "#424242", border: "#BDBDBD", icon: "🍽️" }
};

function getTagStyle(tag) {
  return tagColors[tag] || tagColors.default;
}

// Menu Item Card Component - with FULL IMAGE (contain)
function MenuItemCard({ item, index, onAddToCart, cartCount }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const tagStyle = getTagStyle(item.tag);
  const inCart = cartCount > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05, duration: 0.5, type: "spring", stiffness: 100 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: 28,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered 
          ? "0 25px 45px -12px rgba(0,0,0,0.2), 0 0 0 2px #C8A96E" 
          : "0 6px 18px rgba(0,0,0,0.05), 0 0 0 1px #F0E8D6",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Image Section - FULL IMAGE with contain */}
      <div style={{ 
        position: "relative", 
        height: 210, 
        backgroundColor: "#F8F0E0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}>
        <motion.img
          src={!imgError ? item.image : null}
          alt={item.name}
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: "12px",
          }}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
        {imgError && (
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #F5E8C8, #E8D5A8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 56,
          }}>
            🍽️
          </div>
        )}
        
        {/* Price Badge */}
        <motion.div
          animate={{ 
            x: hovered ? 0 : 20,
            opacity: hovered ? 1 : 0.95,
          }}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(44,24,16,0.85)",
            backdropFilter: "blur(6px)",
            borderRadius: 30,
            padding: "5px 14px",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 16,
            color: "#F5E8C8",
          }}
        >
          ₹{item.price}
        </motion.div>
        
        {/* Tag Badge */}
        <div style={{
          position: "absolute",
          bottom: 12,
          left: 12,
        }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 30,
              background: tagStyle.bg,
              color: tagStyle.text,
              border: `1px solid ${tagStyle.border}`,
              fontFamily: "'DM Sans', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span>{tagStyle.icon}</span> {item.tag}
          </span>
        </div>
        
        {/* Calories Info */}
        <div style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          borderRadius: 20,
          padding: "3px 8px",
          fontSize: 9,
          color: "#F5E8C8",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          🔥 {item.calories}
        </div>
      </div>
      
      {/* Content Section */}
      <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 17,
          fontWeight: 700,
          color: "#2C1810",
          margin: "0 0 6px 0",
          lineHeight: 1.3,
        }}>{item.name}</h3>
        
        <p style={{
          fontSize: 12,
          color: "#8C7B6B",
          lineHeight: 1.45,
          margin: "0 0 1rem 0",
          fontFamily: "'DM Sans', sans-serif",
        }}>{item.desc}</p>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
          style={{
            width: "100%",
            background: inCart 
              ? "linear-gradient(135deg, #2C1810, #3D2A1E)" 
              : "linear-gradient(135deg, #C8A96E, #B8942E)",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 40,
            padding: "10px 0",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s",
          }}
        >
          {inCart ? (
            <>
              ✓ Added ({cartCount})
            </>
          ) : (
            <>
              🛒 Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

// Section Component
function MenuSection({ section, sectionKey, index, onAddToCart, cartItems }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: "3.5rem" }}
      id={sectionKey}
    >
      {/* Section Header - Centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
        style={{
          background: section.bgGradient,
          borderRadius: 40,
          padding: "1rem 1.5rem",
          marginBottom: "1.8rem",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 32 }}>{section.emoji}</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
            fontWeight: 700,
            color: "#2C1810",
            margin: 0,
          }}>{section.title}</h2>
          <span style={{ fontSize: 32 }}>{section.emoji}</span>
        </div>
        <p style={{
          fontSize: 12,
          color: "#8C7B6B",
          margin: "6px 0 0 0",
          fontFamily: "'DM Sans', sans-serif",
        }}>{section.description}</p>
      </motion.div>
      
      {/* Items Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
        gap: "1.5rem",
      }}>
        {section.items.map((item, idx) => (
          <MenuItemCard
            key={item.id}
            item={item}
            index={idx}
            onAddToCart={onAddToCart}
            cartCount={cartItems[item.id] || 0}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Cart Sidebar
function CartSidebar({ cart, onUpdateQuantity, onClose, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: 380, background: "#FFFFFF",
        boxShadow: "-8px 0 30px rgba(0,0,0,0.12)",
        zIndex: 1000, display: "flex", flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{
        padding: "1.25rem",
        borderBottom: "1px solid #F0E8D6",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#FBF6EE",
      }}>
        <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#2C1810", fontWeight: 700 }}>
          🛒 Your Cart
        </h2>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            background: "#F0E8D6",
            border: "none",
            borderRadius: 50,
            width: 36,
            height: 36,
            cursor: "pointer",
            fontSize: 18,
            color: "#8B5E2A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </motion.button>
      </div>
      
      <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <div style={{ fontSize: 70, marginBottom: 16 }}>🍽️</div>
            <h3 style={{ color: "#2C1810", marginBottom: 6, fontSize: 18 }}>Your cart is empty</h3>
            <p style={{ color: "#8C7B6B", fontSize: 13 }}>Add some delicious items from the menu!</p>
          </div>
        ) : (
          cart.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                display: "flex",
                gap: 12,
                padding: "0.8rem 0",
                borderBottom: "1px solid #F0E8D6",
              }}
            >
              <div style={{
                width: 55,
                height: 55,
                borderRadius: 12,
                overflow: "hidden",
                background: "#F5E8C8",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }}
                  onError={(e) => { e.target.style.display = "none"; e.target.parentElement.innerText = "🍽️"; e.target.parentElement.style.fontSize = 24; }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 3px 0", fontSize: 14, fontWeight: 700, color: "#2C1810" }}>{item.name}</h4>
                <p style={{ margin: 0, fontSize: 12, color: "#C8A96E", fontWeight: 600 }}>₹{item.price}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 50,
                    border: "1px solid #E0D5C0",
                    background: "#FFFFFF",
                    cursor: "pointer",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#C8A96E",
                  }}
                >
                  −
                </motion.button>
                <span style={{ width: 22, textAlign: "center", fontWeight: 600 }}>{item.quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 50,
                    border: "1px solid #E0D5C0",
                    background: "#FFFFFF",
                    cursor: "pointer",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#C8A96E",
                  }}
                >
                  +
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      {cart.length > 0 && (
        <div style={{
          padding: "1.25rem",
          borderTop: "1px solid #F0E8D6",
          background: "#FBF6EE",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontSize: 15, color: "#8C7B6B" }}>Subtotal</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#C8A96E", fontFamily: "'Playfair Display', serif" }}>₹{total}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            onClick={onCheckout}
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(135deg, #C8A96E, #B8942E)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 40,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Proceed to Checkout → ₹{total}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

// Main Menu Component
export default function Menu() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("menuCart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);
  
  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("menuCart", JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: {
        ...item,
        quantity: (prev[item.id]?.quantity || 0) + 1
      }
    }));
    // Trigger cart update event for header
    window.dispatchEvent(new Event("cartUpdated"));
  };
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      const { [id]: _, ...rest } = cart;
      setCart(rest);
    } else {
      setCart(prev => ({
        ...prev,
        [id]: { ...prev[id], quantity: newQuantity }
      }));
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };
  
  const handleCheckout = () => {
    setCartOpen(false);
    setOrderSuccess(true);
    setTimeout(() => {
      setCart({});
      setOrderSuccess(false);
      window.dispatchEvent(new Event("cartUpdated"));
    }, 3000);
  };
  
  const cartItemsList = Object.values(cart);
  const totalItems = cartItemsList.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItemsList.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 70;
      const position = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: position, behavior: "smooth" });
    }
  };
  
  return (
    <div style={{
      minHeight: "100vh",
      background: "#FBF6EE",
      fontFamily: "'DM Sans', sans-serif",
      paddingTop: "68px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #F0E8D6; }
        ::-webkit-scrollbar-thumb { background: #C8A96E; border-radius: 10px; }
        body { margin: 0; background: #FBF6EE; }
      `}</style>
      
      {/* Quick Navigation Bar */}
      <div style={{
        position: "fixed",
        top: "68px",
        left: 0,
        right: 0,
        zIndex: 99,
        background: "#FBF6EE",
        borderBottom: "1px solid #F0E8D6",
        padding: "0.5rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
        overflowX: "auto",
      }}>
        {Object.entries(MENU_DATA).map(([key, section]) => (
          <button
            key={key}
            onClick={() => scrollToSection(key)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 11,
              fontWeight: 600,
              color: "#8C7B6B",
              cursor: "pointer",
              padding: "5px 12px",
              borderRadius: 25,
              whiteSpace: "nowrap",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.background = "#F0E8D6"}
            onMouseLeave={(e) => e.target.style.background = "transparent"}
          >
            {section.emoji} {section.title.split(" ")[0]}
          </button>
        ))}
      </div>
      
      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #FDF3E0, #F5E8C8)",
        textAlign: "center",
        padding: "2rem 1.5rem",
      }}>
        <span style={{ fontSize: 48, display: "block", marginBottom: 8 }}>🍽️</span>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 6vw, 2.8rem)",
          fontWeight: 800,
          color: "#2C1810",
          margin: 0,
        }}>
          Our <span style={{ color: "#C8A96E" }}>Menu</span>
        </h1>
        <p style={{
          fontSize: 14,
          color: "#8C7B6B",
          maxWidth: 500,
          margin: "0.5rem auto 0",
        }}>
          Discover our carefully crafted selection of premium snacks, desserts, and beverages.
        </p>
      </div>
      
      {/* Cart Button - Fixed */}
      <button
        onClick={() => setCartOpen(true)}
        style={{
          position: "fixed",
          top: "80px",
          right: "15px",
          zIndex: 98,
          background: "#2C1810",
          color: "#F5E8C8",
          border: "1px solid #C8A96E",
          borderRadius: 40,
          padding: "7px 16px",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        🛒 Cart
        {totalItems > 0 && (
          <span style={{
            background: "#C8A96E",
            color: "#2C1810",
            borderRadius: 50,
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 800,
          }}>
            {totalItems}
          </span>
        )}
      </button>
      
      {/* Menu Sections */}
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "1.5rem 1.5rem 2rem" }}>
        {Object.entries(MENU_DATA).map(([key, section], idx) => (
          <MenuSection
            key={key}
            sectionKey={key}
            section={section}
            index={idx}
            onAddToCart={addToCart}
            cartItems={cart}
          />
        ))}
      </div>
      
      {/* Floating Cart Summary */}
      {totalItems > 0 && !cartOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 90,
          }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCartOpen(true)}
            style={{
              background: "#2C1810",
              backdropFilter: "blur(12px)",
              border: "1px solid #C8A96E",
              borderRadius: 50,
              padding: "10px 24px",
              color: "#F5E8C8",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
          >
            <span>🛒 {totalItems} items</span>
            <span style={{ width: 1, height: 16, background: "#C8A96E" }} />
            <span>₹{totalPrice}</span>
            <span>→</span>
          </motion.button>
        </motion.div>
      )}
      
      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(44,24,16,0.5)",
                backdropFilter: "blur(4px)",
                zIndex: 999,
              }}
            />
            <CartSidebar
              cart={cartItemsList}
              onUpdateQuantity={updateQuantity}
              onClose={() => setCartOpen(false)}
              onCheckout={handleCheckout}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Order Success Toast */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{
              position: "fixed",
              bottom: 30,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#2C1810",
              color: "#F5E8C8",
              padding: "12px 24px",
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 600,
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 20 }}>🎉</span>
            Order placed successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}