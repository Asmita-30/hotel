import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Menu Sections with their items and image paths
const MENU_SECTIONS = [
  {
    id: "bakery",
    title: "BAKERY SPECIALS",
    emoji: "🥐",
    bgGradient: "linear-gradient(135deg, #FFF5E6, #FFE8D4)",
    items: [
      { id: 1, name: "Belgian Chocolate Macron", price: 80, desc: "Crispy shell with rich Belgian chocolate ganache", image: "/src/assets/menu/Belgian Chocolate Macron.png", tag: "Bestseller" },
      { id: 2, name: "Red Velvet Cupcake", price: 80, desc: "Velvety red sponge with cream cheese frosting", image: "/src/assets/menu/Red Velvet Cupcake.png", tag: "Popular" },
      { id: 3, name: "Burnt Basque Cheesecake", price: 180, desc: "Caramelized crust with creamy custard centre", image: "/src/assets/menu/Burnt Basque Cheesecake.png", tag: "Signature" }
    ]
  },
  {
    id: "chaat",
    title: "CHAAT CORNER",
    emoji: "🌶️",
    bgGradient: "linear-gradient(135deg, #FFF0E0, #FFE4CC)",
    items: [
      { id: 4, name: "Cheese Sev Puri", price: 100, desc: "Crispy puri topped with cheese, sev & chutneys", image: "/src/assets/menu/Cheese Sev Puri.png", tag: "Loaded" },
      { id: 5, name: "Dahi Ragda Puri", price: 70, desc: "Yoghurt, ragda & sweet chutney on crispy puri", image: "/src/assets/menu/Dahi Ragda Puri.png", tag: "Classic" },
      { id: 6, name: "Palak Patta Chaat", price: 80, desc: "Crispy spinach leaves with yoghurt & tamarind", image: "/src/assets/menu/Palak Patta Chaat.png", tag: "Crispy" }
    ]
  },
  {
    id: "pavbhaji",
    title: "PAV BHAJI & PULAV",
    emoji: "🫕",
    bgGradient: "linear-gradient(135deg, #FFF2E3, #FFE6D0)",
    items: [
      { id: 7, name: "Cheese Pav Bhaji", price: 150, desc: "Buttery pav with spicy bhaji & melted cheese", image: "/src/assets/menu/Cheese Pav Bhaji.png", tag: "Cheesy" },
      { id: 8, name: "Paneer Cheese Pav Bhaji", price: 220, desc: "Rich paneer bhaji with extra cheese pull", image: "/src/assets/menu/Paneer Cheese Pav Bhaji.png", tag: "Premium" },
      { id: 9, name: "Cheese Masala Pav", price: 120, desc: "Spicy masala pav topped with melted cheese", image: "/src/assets/menu/Cheese Masala Pav.png", tag: "Spicy" }
    ]
  },
  {
    id: "shakes",
    title: "SHAKES & COOLERS",
    emoji: "🥤",
    bgGradient: "linear-gradient(135deg, #E8F4F8, #DDEFF5)",
    items: [
      { id: 10, name: "Choco Nutella Shake", price: 120, desc: "Hazelnut cocoa shake topped with whipped cream", image: "/src/assets/menu/Choco Nutella Shake.png", tag: "Indulgent" },
      { id: 11, name: "Mango Shake", price: 150, desc: "Fresh alphonso mango thick shake", image: "/src/assets/menu/Mango Shake.png", tag: "Seasonal" },
      { id: 12, name: "Green Apple Mojito", price: 90, desc: "Zesty mint & green apple cooler with soda", image: "/src/assets/menu/Green Apple Mojito.png", tag: "Refreshing" }
    ]
  },
  {
    id: "fastfood",
    title: "CAFÉ FAST FOOD",
    emoji: "🍔",
    bgGradient: "linear-gradient(135deg, #FFF0E8, #FFE6DA)",
    items: [
      { id: 13, name: "Paneer Mozzarella Burger", price: 280, desc: "Grilled paneer patty with mozzarella & herb mayo", image: "/src/assets/menu/Paneer Mozzarella Burger.png", tag: "Gourmet" },
      { id: 14, name: "Smoky Barbeque Cottage Cheese Pizza", price: 320, desc: "BBQ sauce, cottage cheese, bell peppers & onions", image: "/src/assets/menu/Smoky Barbeque Cottage.png", tag: "Bestseller" },
      { id: 15, name: "Cheese Loaded Nachos", price: 300, desc: "Crispy nachos with four cheese sauce & salsa", image: "/src/assets/menu/Cheese Loaded Nachos.png", tag: "Loaded" }
    ]
  },
  {
    id: "desserts",
    title: "DESSERTS & SWEETS",
    emoji: "🍨",
    bgGradient: "linear-gradient(135deg, #FFF0F0, #FFE4E4)",
    items: [
      { id: 16, name: "Nutella Kunafa", price: 220, desc: "Crispy kunafa with creamy Nutella filling", image: "/src/assets/menu/Nutella Kunafa.png", tag: "Trending" },
      { id: 17, name: "Ferrero Brownie", price: 110, desc: "Fudgy brownie topped with Ferrero Rocher", image: "/src/assets/menu/Ferrero Brownie.png", tag: "Premium" },
      { id: 18, name: "Mango Falooda", price: 180, desc: "Mango jelly, vermicelli, basil seeds & ice cream", image: "/src/assets/menu/Mango Falooda.png", tag: "Refreshing" }
    ]
  },
  {
    id: "signatures",
    title: "PREMIUM SIGNATURES",
    emoji: "👑",
    bgGradient: "linear-gradient(135deg, #F5EDE0, #EDE0CC)",
    items: [
      { id: 19, name: "Pista Kunafa", price: 250, desc: "Persian pistachio cream & crushed pistachios", image: "/src/assets/menu/Pista Kunafa.png", tag: "Signature" },
      { id: 20, name: "Lotus Biscoff Kunafa", price: 220, desc: "Caramelised biscuit spread with Lotus crunch", image: "/src/assets/menu/Lotus Biscoff Kunafa.png", tag: "Trending" },
      { id: 21, name: "Almond Nest Kataif Kunafa", price: 200, desc: "Almond filled kataif pastry nest with honey", image: "/src/assets/menu/Almond Nest Kataif Kunafa.png", tag: "Artisan" }
    ]
  }
];

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

// Individual Product Card Component
function ProductCard({ item, index, onAdd, cart }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const inCart = cart.find(c => c.id === item.id);
  const tagStyle = getTagStyle(item.tag);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered 
          ? "0 20px 35px -12px rgba(0,0,0,0.15), 0 0 0 2px #C8A96E" 
          : "0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px #F0E8D6",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Image Container */}
      <div style={{ 
        position: "relative", 
        height: 200, 
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
            fontSize: 48,
          }}>
            🍽️
          </div>
        )}
        
        {/* Price Badge */}
        <div style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "rgba(44,24,16,0.85)",
          backdropFilter: "blur(4px)",
          borderRadius: 20,
          padding: "4px 12px",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 15,
          color: "#F5E8C8",
        }}>
          ₹{item.price}
        </div>
        
        {/* Tag */}
        <div style={{
          position: "absolute",
          bottom: 12,
          left: 12,
        }}>
          <span style={{
            fontSize: 9,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 15,
            background: tagStyle.bg,
            color: tagStyle.text,
            border: `1px solid ${tagStyle.border}`,
            fontFamily: "'DM Sans', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}>
            {tagStyle.icon} {item.tag}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div style={{ padding: "0.9rem 1rem 1rem" }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 15,
          fontWeight: 700,
          color: "#2C1810",
          margin: "0 0 5px 0",
          lineHeight: 1.3,
        }}>{item.name}</h3>
        
        <p style={{
          fontSize: 11,
          color: "#8C7B6B",
          lineHeight: 1.4,
          margin: "0 0 0.8rem 0",
          fontFamily: "'DM Sans', sans-serif",
        }}>{item.desc}</p>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={(e) => { e.stopPropagation(); onAdd(item); }}
          style={{
            width: "100%",
            background: inCart 
              ? "#2C1810" 
              : "#C8A96E",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 25,
            padding: "8px 0",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s",
          }}
        >
          {inCart ? `✓ Added (${inCart.qty})` : "🛒 Add to Cart"}
        </motion.button>
      </div>
    </motion.div>
  );
}

// Section Header Component - Centered
function SectionHeader({ title, emoji, bgGradient, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{
        background: bgGradient,
        borderRadius: 40,
        padding: "0.8rem 1.5rem",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <span style={{ fontSize: 28 }}>{emoji}</span>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
        fontWeight: 700,
        color: "#2C1810",
        margin: 0,
      }}>{title}</h2>
      <span style={{ fontSize: 28 }}>{emoji}</span>
    </motion.div>
  );
}

// Cart Component
function Cart({ cart, onRemove, onClose, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: 360, background: "#FFFFFF",
        boxShadow: "-5px 0 30px rgba(0,0,0,0.1)",
        zIndex: 1000, display: "flex", flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{
        padding: "1rem 1.25rem",
        borderBottom: "1px solid #F0E8D6",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#FBF6EE",
      }}>
        <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#2C1810", fontWeight: 700 }}>
          🛒 Your Order
        </h2>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose}
          style={{ background: "#F0E8D6", border: "none", borderRadius: 50, width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#8B5E2A" }}>
          ✕
        </motion.button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2.5rem 0", color: "#B0A090" }}>
            <div style={{ fontSize: 50, marginBottom: 12 }}>🍽️</div>
            <p style={{ fontSize: 14, fontWeight: 500 }}>Your cart is empty</p>
          </div>
        ) : cart.map(item => (
          <motion.div key={item.id} layout
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "0.7rem 0",
              borderBottom: "1px solid #F5EDE0",
            }}>
            <div style={{
              width: 50, height: 50, borderRadius: 10,
              background: "#F5E8C8",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden",
            }}>
              <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "5px" }} 
                onError={(e) => { e.target.style.display = "none"; e.target.parentElement.innerText = "🍽️"; e.target.parentElement.style.fontSize = 22; }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#2C1810" }}>{item.name}</p>
              <p style={{ margin: 0, fontSize: 11, color: "#C8A96E" }}>₹{item.price} × {item.qty}</p>
            </div>
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => onRemove(item.id)}
              style={{ background: "#FEF0EC", border: "none", borderRadius: 15, width: 26, height: 26, cursor: "pointer", color: "#C0392B", fontSize: 14, fontWeight: 700 }}>
              −
            </motion.button>
          </motion.div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ padding: "1rem", borderTop: "1px solid #F0E8D6", background: "#FBF6EE" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#8C7B6B", fontSize: 13 }}>Total</span>
            <span style={{ fontWeight: 800, fontSize: 20, color: "#C8A96E", fontFamily: "'Playfair Display', serif" }}>₹{total}</span>
          </div>
          <motion.button whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
            onClick={onCheckout}
            style={{
              width: "100%", padding: "10px",
              background: "linear-gradient(135deg, #C8A96E, #B8942E)",
              color: "#FFFFFF", border: "none", borderRadius: 30,
              fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}>
            Place Order → ₹{total}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

// Main Shop Component
export default function Shop() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [{ ...item, qty: 1 }, ...prev];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (item?.qty > 1) return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
      return prev.filter(i => i.id !== id);
    });
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handleCheckout = () => {
    setCartOpen(false);
    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setOrderPlaced(false);
    }, 2500);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FBF6EE",
      fontFamily: "'DM Sans', sans-serif",
      width: "100%",
      margin: 0,
      padding: 0,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #F5EDE0; }
        ::-webkit-scrollbar-thumb { background: #C8A96E; border-radius: 10px; }
        body { margin: 0; padding: 0; background: #FBF6EE; }
      `}</style>

      {/* Category Navigation Bar */}
      <div style={{
        position: "sticky",
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
        {MENU_SECTIONS.map(section => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 11,
              fontWeight: 600,
              color: "#8C7B6B",
              cursor: "pointer",
              padding: "6px 14px",
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

      {/* Hero Section - Directly below header */}
      <div style={{
        background: "linear-gradient(135deg, #FDF3E0, #F5E8C8)",
        textAlign: "center",
        padding: "2rem 1rem",
        width: "100%",
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
          fontWeight: 700,
          color: "#2C1810",
          margin: 0,
        }}>
          Explore Our <span style={{ color: "#C8A96E" }}>Menu</span>
        </h1>
        <p style={{
          fontSize: 14,
          color: "#8C7B6B",
          maxWidth: 450,
          margin: "0.5rem auto 0",
        }}>
          Handcrafted with love — from our kitchen to your table
        </p>
      </div>

      {/* Floating Cart Button */}
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
          padding: "8px 16px",
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
        {MENU_SECTIONS.map((section, idx) => {
          const SectionObserver = () => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, amount: 0.15 });
            return (
              <div ref={ref} id={section.id} style={{ marginBottom: "2.5rem" }}>
                <SectionHeader 
                  title={section.title} 
                  emoji={section.emoji} 
                  bgGradient={section.bgGradient}
                  index={idx}
                  inView={isInView}
                />
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "1.25rem",
                }}>
                  {section.items.map((item, itemIdx) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      index={itemIdx}
                      onAdd={addToCart}
                      cart={cart}
                    />
                  ))}
                </div>
              </div>
            );
          };
          return <SectionObserver key={section.id} />;
        })}
      </div>

      {/* Floating Cart Summary */}
      {cart.length > 0 && !cartOpen && (
        <div style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 90,
        }}>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              background: "#2C1810",
              border: "1px solid #C8A96E",
              borderRadius: 40,
              padding: "8px 20px",
              color: "#F5E8C8",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <span>🛒 {totalItems} items</span>
            <span style={{ width: 1, height: 14, background: "#C8A96E" }} />
            <span>₹{totalPrice}</span>
            <span>→</span>
          </button>
        </div>
      )}

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <div
              onClick={() => setCartOpen(false)}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(44,24,16,0.4)",
                zIndex: 999,
              }}
            />
            <Cart
              cart={cart}
              onRemove={removeFromCart}
              onClose={() => setCartOpen(false)}
              onCheckout={handleCheckout}
            />
          </>
        )}
      </AnimatePresence>

      {/* Order Success Toast */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            style={{
              position: "fixed",
              bottom: 80,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#2C1810",
              color: "#F5E8C8",
              padding: "10px 20px",
              borderRadius: 40,
              fontSize: 12,
              fontWeight: 600,
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
              whiteSpace: "nowrap",
            }}
          >
            🎉 Order placed successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}