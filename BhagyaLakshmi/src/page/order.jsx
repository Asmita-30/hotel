import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Menu Items Data
const MENU_ITEMS = [
  { id: 1, name: "Belgian Chocolate Macron", price: 80, category: "Bakery", desc: "Crispy shell with rich Belgian chocolate ganache", image: "/menu/Belgian Chocolate Macron.png", tag: "Bestseller", available: true },
  { id: 2, name: "Red Velvet Cupcake", price: 80, category: "Bakery", desc: "Velvety red sponge with cream cheese frosting", image: "/menu/Red Velvet Cupcake.png", tag: "Popular", available: true },
  { id: 3, name: "Burnt Basque Cheesecake", price: 180, category: "Bakery", desc: "Caramelized crust with creamy custard centre", image: "/menu/Burnt Basque Cheesecake.png", tag: "Signature", available: true },
  { id: 4, name: "Cheese Sev Puri", price: 100, category: "Chaat", desc: "Crispy puri topped with cheese, sev & chutneys", image: "/menu/Cheese Sev Puri.png", tag: "Cheesy", available: true },
  { id: 5, name: "Dahi Ragda Puri", price: 70, category: "Chaat", desc: "Yoghurt, ragda & sweet chutney on crispy puri", image: "/menu/Dahi Ragda Puri.png", tag: "Classic", available: true },
  { id: 6, name: "Palak Patta Chaat", price: 80, category: "Chaat", desc: "Crispy spinach leaves with yoghurt & tamarind", image: "/menu/Palak Patta Chaat.png", tag: "Crispy", available: true },
  { id: 7, name: "Cheese Pav Bhaji", price: 150, category: "Pav Bhaji", desc: "Buttery pav with spicy bhaji & melted cheese", image: "/menu/Cheese Pav Bhaji.png", tag: "Cheesy", available: true },
  { id: 8, name: "Paneer Cheese Pav Bhaji", price: 220, category: "Pav Bhaji", desc: "Rich paneer bhaji with extra cheese pull", image: "/menu/Paneer Cheese Pav Bhaji.png", tag: "Premium", available: true },
  { id: 9, name: "Cheese Masala Pav", price: 120, category: "Pav Bhaji", desc: "Spicy masala pav topped with melted cheese", image: "/menu/Cheese Masala Pav.png", tag: "Spicy", available: true },
  { id: 10, name: "Choco Nutella Shake", price: 120, category: "Shakes", desc: "Hazelnut cocoa shake topped with whipped cream", image: "/menu/Choco Nutella Shake.png", tag: "Indulgent", available: true },
  { id: 11, name: "Mango Shake", price: 150, category: "Shakes", desc: "Fresh alphonso mango thick shake", image: "/menu/Mango Shake.png", tag: "Seasonal", available: true },
  { id: 12, name: "Green Apple Mojito", price: 90, category: "Shakes", desc: "Zesty mint & green apple cooler with soda", image: "/menu/Green Apple Mojito.png", tag: "Refreshing", available: true },
  { id: 13, name: "Paneer Mozzarella Burger", price: 280, category: "Fast Food", desc: "Grilled paneer patty with mozzarella & herb mayo", image: "/menu/Paneer Mozzarella Burger.png", tag: "Gourmet", available: true },
  { id: 14, name: "Smoky Barbeque Cottage Cheese Pizza", price: 320, category: "Fast Food", desc: "BBQ sauce, cottage cheese, bell peppers & onions", image: "/menu/Smoky Barbeque Cottage.png", tag: "Bestseller", available: true },
  { id: 15, name: "Cheese Loaded Nachos", price: 300, category: "Fast Food", desc: "Crispy nachos with four cheese sauce & salsa", image: "/menu/Cheese Loaded Nachos.png", tag: "Loaded", available: true },
  { id: 16, name: "Nutella Kunafa", price: 220, category: "Desserts", desc: "Crispy kunafa with creamy Nutella filling", image: "/menu/Nutella Kunafa.png", tag: "Trending", available: true },
  { id: 17, name: "Ferrero Brownie", price: 110, category: "Desserts", desc: "Fudgy brownie topped with Ferrero Rocher", image: "/menu/Ferrero Brownie.png", tag: "Premium", available: true },
  { id: 18, name: "Mango Falooda", price: 180, category: "Desserts", desc: "Mango jelly, vermicelli, basil seeds & ice cream", image: "/menu/Mango Falooda.png", tag: "Refreshing", available: true },
  { id: 19, name: "Pista Kunafa", price: 250, category: "Signatures", desc: "Persian pistachio cream & crushed pistachios", image: "/menu/Pista Kunafa.png", tag: "Signature", available: true },
  { id: 20, name: "Lotus Biscoff Kunafa", price: 220, category: "Signatures", desc: "Caramelised biscuit spread with Lotus crunch", image: "/menu/Lotus Biscoff Kunafa.png", tag: "Trending", available: true },
  { id: 21, name: "Almond Nest Kataif Kunafa", price: 200, category: "Signatures", desc: "Almond filled kataif pastry nest with honey", image: "/menu/Almond Nest Kataif Kunafa.png", tag: "Artisan", available: true }
];

const CATEGORIES = ["All", "Bakery", "Chaat", "Pav Bhaji", "Shakes", "Fast Food", "Desserts", "Signatures"];

const tagColors = {
  Bestseller: { bg: "#FFE0B5", text: "#C45100", icon: "🔥" },
  Premium: { bg: "#E8D5F5", text: "#6A1B9A", icon: "💎" },
  Trending: { bg: "#FFD6E0", text: "#AD1457", icon: "📈" },
  Classic: { bg: "#D4E8D4", text: "#2E7D32", icon: "⭐" },
  Signature: { bg: "#FFF0C4", text: "#BF8F00", icon: "👑" },
  Indulgent: { bg: "#F5DEB3", text: "#8B4513", icon: "🍫" },
  Crispy: { bg: "#FFE0B2", text: "#E65100", icon: "✨" },
  Loaded: { bg: "#FFF3E0", text: "#E65100", icon: "🧀" },
  Cheesy: { bg: "#FFF9C4", text: "#F57F17", icon: "🧀" },
  Spicy: { bg: "#FFCCBC", text: "#BF360C", icon: "🌶️" },
  Seasonal: { bg: "#E0F7FA", text: "#006064", icon: "🌸" },
  Refreshing: { bg: "#E0F2F1", text: "#004D40", icon: "💚" },
  Gourmet: { bg: "#F3E5F5", text: "#4A148C", icon: "🍽️" },
  Artisan: { bg: "#EFEBE9", text: "#4E342E", icon: "🎨" },
  Popular: { bg: "#E8EAF6", text: "#1A237E", icon: "❤️" },
  default: { bg: "#F5F5F5", text: "#424242", icon: "🍽️" }
};

function MenuItemCard({ item, onAddToCart, cartCount }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const tagStyle = tagColors[item.tag] || tagColors.default;
  const inCart = cartCount > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered ? "0 15px 35px -10px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ position: "relative", height: 170, background: "#F8F0E0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={!imgError ? item.image : null}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }}
          onError={() => setImgError(true)}
        />
        {imgError && (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #F5E8C8, #E8D5A8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42 }}>🍽️</div>
        )}
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(44,24,16,0.85)", borderRadius: 20, padding: "3px 10px", fontSize: 13, fontWeight: 700, color: "#F5E8C8" }}>₹{item.price}</div>
        <div style={{ position: "absolute", bottom: 10, left: 10 }}>
          <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 15, background: tagStyle.bg, color: tagStyle.text, display: "inline-flex", alignItems: "center", gap: 3 }}>{tagStyle.icon} {item.tag}</span>
        </div>
      </div>
      <div style={{ padding: "0.8rem 1rem 1rem" }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2C1810", margin: "0 0 4px" }}>{item.name}</h3>
        <p style={{ fontSize: 11, color: "#8C7B6B", lineHeight: 1.4, margin: "0 0 10px" }}>{item.desc}</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
          style={{ width: "100%", background: inCart ? "#2C1810" : "#C8A96E", color: "#FFFFFF", border: "none", borderRadius: 25, padding: "7px 0", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
        >{inCart ? `✓ Added (${cartCount})` : "🛒 Add to Cart"}</motion.button>
      </div>
    </motion.div>
  );
}

function CartSidebar({ cart, onUpdateQuantity, onClose, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const packagingFee = 10;
  const total = subtotal + deliveryFee + packagingFee;
  
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 380, background: "#FFFFFF", boxShadow: "-5px 0 25px rgba(0,0,0,0.1)", zIndex: 1000, display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif" }}
    >
      <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #F0E8D6", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FBF6EE" }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#2C1810" }}>🛒 Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)</h2>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} style={{ background: "#F0E8D6", border: "none", borderRadius: 50, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</motion.button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0.8rem 1.25rem" }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🍽️</div>
            <p style={{ color: "#8C7B6B", fontSize: 13 }}>Your cart is empty. Add some delicious items!</p>
          </div>
        ) : (
          cart.map(item => (
            <motion.div key={item.id} layout style={{ display: "flex", gap: 10, padding: "0.7rem 0", borderBottom: "1px solid #F0E8D6" }}>
              <div style={{ width: 55, height: 55, borderRadius: 10, overflow: "hidden", background: "#F5E8C8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "5px" }} onError={(e) => { e.target.style.display = "none"; e.target.parentElement.innerText = "🍽️"; e.target.parentElement.style.fontSize = 22; }} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 700, color: "#2C1810" }}>{item.name}</h4>
                <p style={{ margin: 0, fontSize: 12, color: "#C8A96E", fontWeight: 600 }}>₹{item.price}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} style={{ width: 26, height: 26, borderRadius: 20, border: "1px solid #E0D5C0", background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>−</motion.button>
                <span style={{ width: 22, textAlign: "center", fontWeight: 600 }}>{item.quantity}</span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} style={{ width: 26, height: 26, borderRadius: 20, border: "1px solid #E0D5C0", background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>+</motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #F0E8D6", background: "#FBF6EE" }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ color: "#8C7B6B", fontSize: 12 }}>Subtotal</span><span style={{ fontWeight: 600, fontSize: 12 }}>₹{subtotal}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ color: "#8C7B6B", fontSize: 12 }}>Delivery Fee</span><span style={{ fontWeight: 600, fontSize: 12 }}>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ color: "#8C7B6B", fontSize: 12 }}>Packaging Fee</span><span style={{ fontWeight: 600, fontSize: 12 }}>₹{packagingFee}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: "1px dashed #E0D5C0" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#2C1810" }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#C8A96E" }}>₹{total}</span>
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }} onClick={onCheckout} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #C8A96E, #B8942E)", color: "#FFFFFF", border: "none", borderRadius: 35, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Proceed to Checkout →</motion.button>
        </div>
      )}
    </motion.div>
  );
}

// Checkout Modal - Complete with Order Summary
function CheckoutModal({ isOpen, onClose, cart, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    landmark: "",
    paymentMethod: "cod",
    notes: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const packagingFee = 10;
  const total = subtotal + deliveryFee + packagingFee;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert("Please fill all required fields!");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSubmit({ 
        ...formData, 
        items: cart, 
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        packagingFee: packagingFee,
        total: total, 
        orderId: "BL" + Math.floor(Math.random() * 1000000),
        orderDate: new Date().toLocaleString()
      });
      setFormData({ name: "", phone: "", address: "", city: "", pincode: "", landmark: "", paymentMethod: "cod", notes: "" });
    }, 2000);
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(44,24,16,0.6)", backdropFilter: "blur(4px)", zIndex: 1000 }}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "95%", maxWidth: 550, height: "auto", maxHeight: "85vh", background: "#FFFFFF", borderRadius: 28, zIndex: 1001, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", overflow: "hidden" }}
          >
            {/* Modal Header */}
            <div style={{ padding: "1rem 1.25rem", background: "linear-gradient(135deg, #C8A96E, #B8942E)", color: "#FFFFFF", flexShrink: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 22 }}>📝</span>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Complete Your Order</h2>
                </div>
                <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 50, width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</motion.button>
              </div>
              <p style={{ fontSize: 11, margin: "6px 0 0 0", opacity: 0.8 }}>Please fill in your details to place order</p>
            </div>
            
            {/* Modal Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem" }}>
              <form onSubmit={handleSubmit}>
                {/* Order Items Summary */}
                <div style={{ background: "#FBF6EE", borderRadius: 16, padding: "12px 15px", marginBottom: 20 }}>
                  <h4 style={{ margin: "0 0 10px 0", fontSize: 14, fontWeight: 700, color: "#2C1810" }}>🍽️ Your Order Items</h4>
                  {cart.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                      <span>{item.name} x {item.quantity}</span>
                      <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: "1px dashed #E0D5C0", marginTop: 8, paddingTop: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "#8C7B6B" }}>Subtotal</span>
                      <span style={{ fontSize: 12 }}>₹{subtotal}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "#8C7B6B" }}>Delivery Fee</span>
                      <span style={{ fontSize: 12 }}>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "#8C7B6B" }}>Packaging Fee</span>
                      <span style={{ fontSize: 12 }}>₹{packagingFee}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, paddingTop: 6, borderTop: "1px dashed #E0D5C0" }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: "#2C1810" }}>Total Amount</span>
                      <span style={{ fontWeight: 800, fontSize: 18, color: "#C8A96E" }}>₹{total}</span>
                    </div>
                  </div>
                </div>
                
                {/* Full Name */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#2C1810", marginBottom: 4 }}>Full Name <span style={{ color: "#e74c3c" }}>*</span></label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 13, outline: "none", transition: "border-color 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#C8A96E"} onBlur={(e) => e.target.style.borderColor = "#ddd"} placeholder="Enter your full name" />
                </div>
                
                {/* Phone Number */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#2C1810", marginBottom: 4 }}>Phone Number <span style={{ color: "#e74c3c" }}>*</span></label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 13, outline: "none" }} onFocus={(e) => e.target.style.borderColor = "#C8A96E"} onBlur={(e) => e.target.style.borderColor = "#ddd"} placeholder="Enter your phone number" />
                </div>
                
                {/* Delivery Address */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#2C1810", marginBottom: 4 }}>Delivery Address <span style={{ color: "#e74c3c" }}>*</span></label>
                  <textarea required rows={2} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 13, fontFamily: "'DM Sans', sans-serif", resize: "none", outline: "none" }} onFocus={(e) => e.target.style.borderColor = "#C8A96E"} onBlur={(e) => e.target.style.borderColor = "#ddd"} placeholder="House/Flat No., Street, Area" />
                </div>
                
                {/* City and Pincode */}
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#2C1810", marginBottom: 4 }}>City <span style={{ color: "#e74c3c" }}>*</span></label>
                    <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 13, outline: "none" }} onFocus={(e) => e.target.style.borderColor = "#C8A96E"} onBlur={(e) => e.target.style.borderColor = "#ddd"} placeholder="City" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#2C1810", marginBottom: 4 }}>Pincode <span style={{ color: "#e74c3c" }}>*</span></label>
                    <input type="text" required value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 13, outline: "none" }} onFocus={(e) => e.target.style.borderColor = "#C8A96E"} onBlur={(e) => e.target.style.borderColor = "#ddd"} placeholder="Pincode" />
                  </div>
                </div>
                
                {/* Landmark */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#2C1810", marginBottom: 4 }}>Landmark (Optional)</label>
                  <input type="text" value={formData.landmark} onChange={(e) => setFormData({ ...formData, landmark: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 13, outline: "none" }} onFocus={(e) => e.target.style.borderColor = "#C8A96E"} onBlur={(e) => e.target.style.borderColor = "#ddd"} placeholder="Nearby landmark" />
                </div>
                
                {/* Payment Method */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#2C1810", marginBottom: 6 }}>Payment Method <span style={{ color: "#e74c3c" }}>*</span></label>
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                      <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === "cod"} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} style={{ cursor: "pointer" }} />
                      <span style={{ fontSize: 13 }}>💰 Cash on Delivery</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                      <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === "card"} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} style={{ cursor: "pointer" }} />
                      <span style={{ fontSize: 13 }}>💳 Card / UPI</span>
                    </label>
                  </div>
                </div>
                
                {/* Special Instructions */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#2C1810", marginBottom: 4 }}>Special Instructions (Optional)</label>
                  <textarea rows={2} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 12, fontFamily: "'DM Sans', sans-serif", resize: "none", outline: "none" }} onFocus={(e) => e.target.style.borderColor = "#C8A96E"} onBlur={(e) => e.target.style.borderColor = "#ddd"} placeholder="Any special requests? (e.g., extra spicy, less sugar)" />
                </div>
                
                {/* Submit Button */}
                <button type="submit" disabled={isProcessing} style={{ width: "100%", padding: "14px", background: isProcessing ? "#B0A090" : "linear-gradient(135deg, #C8A96E, #B8942E)", color: "#FFFFFF", border: "none", borderRadius: 40, fontSize: 15, fontWeight: 700, cursor: isProcessing ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}>
                  {isProcessing ? "⏳ Processing..." : "✅ Place Order"}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Success Modal with Full Order Details
function SuccessModal({ isOpen, onClose, orderDetails }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => onClose(), 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);
  
  if (!isOpen || !orderDetails) return null;
  
  return (
    <AnimatePresence>
      {isOpen && orderDetails && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(44,24,16,0.7)", backdropFilter: "blur(4px)", zIndex: 2000 }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: 420, background: "#FFFFFF", borderRadius: 32, padding: "1.5rem", textAlign: "center", zIndex: 2001, boxShadow: "0 25px 50px rgba(0,0,0,0.3)", maxHeight: "90vh", overflowY: "auto" }}
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} style={{ width: 70, height: 70, background: "#4CAF50", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 15px" }}><span style={{ fontSize: 42, color: "#FFFFFF" }}>✓</span></motion.div>
            
            <h2 style={{ color: "#2C1810", marginBottom: 6, fontSize: 22 }}>Order Placed Successfully!</h2>
            <p style={{ color: "#8C7B6B", marginBottom: 6, fontSize: 13 }}>Thank you for ordering from BhagyaLakshmi</p>
            <p style={{ color: "#C8A96E", fontWeight: 600, marginBottom: 16, fontSize: 12 }}>Order ID: {orderDetails.orderId}</p>
            
            {/* Delivery Address */}
            <div style={{ background: "#FBF6EE", borderRadius: 16, padding: "12px", marginBottom: 16, textAlign: "left" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#2C1810", marginBottom: 8 }}>📍 Delivery Address</p>
              <p style={{ fontSize: 12, color: "#2C1810", marginBottom: 4 }}><strong>{orderDetails.name}</strong></p>
              <p style={{ fontSize: 11, color: "#8C7B6B", marginBottom: 2 }}>{orderDetails.address}</p>
              <p style={{ fontSize: 11, color: "#8C7B6B", marginBottom: 2 }}>{orderDetails.city} - {orderDetails.pincode}</p>
              <p style={{ fontSize: 11, color: "#8C7B6B", marginBottom: 0 }}>📞 {orderDetails.phone}</p>
            </div>
            
            {/* Order Summary */}
            <div style={{ background: "#FBF6EE", borderRadius: 16, padding: "12px", marginBottom: 16, textAlign: "left" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#2C1810", marginBottom: 8 }}>🍽️ Order Summary</p>
              {orderDetails.items.map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 11 }}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #E0D5C0", marginTop: 6, paddingTop: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><span style={{ fontSize: 11, color: "#8C7B6B" }}>Subtotal</span><span style={{ fontSize: 11 }}>₹{orderDetails.subtotal}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><span style={{ fontSize: 11, color: "#8C7B6B" }}>Delivery Fee</span><span style={{ fontSize: 11 }}>{orderDetails.deliveryFee === 0 ? "Free" : `₹${orderDetails.deliveryFee}`}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 11, color: "#8C7B6B" }}>Packaging Fee</span><span style={{ fontSize: 11 }}>₹{orderDetails.packagingFee}</span></div>
                <div style={{ borderTop: "1px solid #E0D5C0", marginTop: 4, paddingTop: 4 }}><div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 700, fontSize: 13, color: "#2C1810" }}>Total Paid</span><span style={{ fontWeight: 800, fontSize: 16, color: "#C8A96E" }}>₹{orderDetails.total}</span></div></div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div style={{ background: "#FBF6EE", borderRadius: 16, padding: "12px", marginBottom: 18, textAlign: "left" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#2C1810", marginBottom: 4 }}>💳 Payment Method</p>
              <p style={{ fontSize: 12, color: "#8C7B6B" }}>{orderDetails.paymentMethod === "cod" ? "💰 Cash on Delivery" : "💳 Card / UPI"}</p>
              <p style={{ fontSize: 11, color: "#8C7B6B", marginTop: 6 }}>📅 Order Date: {orderDetails.orderDate}</p>
            </div>
            
            <div style={{ background: "#E8F5E9", borderRadius: 12, padding: "10px", marginBottom: 18 }}>
              <p style={{ fontSize: 12, color: "#2E7D32", marginBottom: 0 }}>🚚 Estimated Delivery Time: 45-60 minutes</p>
            </div>
            
            <button onClick={onClose} style={{ background: "linear-gradient(135deg, #C8A96E, #B8942E)", color: "#FFFFFF", border: "none", borderRadius: 35, padding: "12px 28px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%" }}>Continue Shopping →</button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Main Order Component
export default function Order() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const savedCart = localStorage.getItem("orderCart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);
  
  useEffect(() => {
    localStorage.setItem("orderCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);
  
  const addToCart = (item) => {
    setCart(prev => ({ ...prev, [item.id]: { ...item, quantity: (prev[item.id]?.quantity || 0) + 1 } }));
  };
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      const { [id]: _, ...rest } = cart;
      setCart(rest);
    } else {
      setCart(prev => ({ ...prev, [id]: { ...prev[id], quantity: newQuantity } }));
    }
  };
  
  const handleCheckout = () => { setCartOpen(false); setCheckoutOpen(true); };
  const handleOrderSubmit = (orderData) => { setCheckoutOpen(false); setOrderDetails(orderData); setSuccessOpen(true); setCart({}); };
  const handleSuccessClose = () => { setSuccessOpen(false); setOrderDetails(null); };
  
  const cartItemsList = Object.values(cart);
  const totalItems = cartItemsList.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItemsList.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const { scrollYProgress } = useScroll();
  const headerBg = useTransform(scrollYProgress, [0, 0.1], ["rgba(251,246,238,0)", "rgba(251,246,238,0.95)"]);
  
  return (
    <div style={{ minHeight: "100vh", background: "#FBF6EE", fontFamily: "'DM Sans', sans-serif", paddingTop: "68px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F0E8D6; }
        ::-webkit-scrollbar-thumb { background: #C8A96E; border-radius: 10px; }
        body { margin: 0; background: #FBF6EE; }
        input, textarea { font-family: 'DM Sans', sans-serif; }
      `}</style>
      
      {/* Fixed Header */}
      <motion.nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: headerBg, backdropFilter: "blur(12px)", borderBottom: "1px solid #F0E8D6", padding: "0 1.5rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{ width: 38, height: 38, background: "linear-gradient(135deg, #C8A96E, #B8942E)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✦</div>
          <div><div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#2C1810" }}>BhagyaLakshmi</div><div style={{ fontSize: 7, color: "#C8A96E", letterSpacing: "0.15em", fontWeight: 600, textTransform: "uppercase" }}>Snacks Corner</div></div>
        </div>
        <div style={{ position: "relative" }}>
          <input type="text" placeholder="Search menu..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: "7px 14px 7px 36px", borderRadius: 30, border: "1px solid #E0D5C0", background: "#FFFFFF", fontSize: 12, width: 200, outline: "none" }} />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13 }}>🔍</span>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} onClick={() => setCartOpen(true)} style={{ position: "relative", background: "#2C1810", color: "#F5E8C8", border: "none", borderRadius: 35, padding: "6px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>🛒 Cart{totalItems > 0 && <span style={{ background: "#C8A96E", color: "#2C1810", borderRadius: 50, width: 19, height: 19, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800 }}>{totalItems}</span>}</motion.button>
      </motion.nav>
      
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "1.5rem 1rem", background: "linear-gradient(135deg, #FDF3E0, #F5E8C8)" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 800, color: "#2C1810", margin: 0 }}>Order <span style={{ color: "#C8A96E" }}>Online</span></h1>
        <p style={{ fontSize: 12, color: "#8C7B6B", maxWidth: 400, margin: "0.3rem auto 0" }}>Freshly prepared with love. Delivered to your doorstep.</p>
      </div>
      
      {/* Categories */}
      <div style={{ padding: "0.5rem 1rem", display: "flex", gap: 5, overflowX: "auto", borderBottom: "1px solid #F0E8D6", background: "#FFFFFF", position: "sticky", top: 68, zIndex: 49 }}>
        {CATEGORIES.map(cat => (
          <motion.button key={cat} whileTap={{ scale: 0.95 }} onClick={() => setActiveCategory(cat)} style={{ padding: "4px 12px", borderRadius: 25, background: activeCategory === cat ? "#C8A96E" : "transparent", color: activeCategory === cat ? "#FFFFFF" : "#8C7B6B", border: activeCategory === cat ? "none" : "1px solid #E0D5C0", fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>{cat}</motion.button>
        ))}
      </div>
      
      {/* Menu Grid */}
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "1.2rem" }}>
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center", padding: "2rem" }}><div style={{ fontSize: 48, marginBottom: 10 }}>🔍</div><h3 style={{ color: "#2C1810", fontSize: 16 }}>No items found</h3><p style={{ color: "#8C7B6B", fontSize: 12 }}>Try a different search or category</p></motion.div>
          ) : (
            <motion.div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
              {filteredItems.map((item) => (<MenuItemCard key={item.id} item={item} onAddToCart={addToCart} cartCount={cart[item.id]?.quantity || 0} />))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Floating Cart Button */}
      {totalItems > 0 && !cartOpen && (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 90 }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} onClick={() => setCartOpen(true)} style={{ background: "#2C1810", border: "1px solid #C8A96E", borderRadius: 50, padding: "8px 20px", color: "#F5E8C8", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}><span>🛒 {totalItems} items</span><span style={{ width: 1, height: 14, background: "#C8A96E" }} /><span>₹{totalPrice}</span><span>→</span></motion.button>
        </motion.div>
      )}
      
      {/* Cart Sidebar */}
      <AnimatePresence>{cartOpen && (<><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(44,24,16,0.5)", backdropFilter: "blur(4px)", zIndex: 999 }} /><CartSidebar cart={cartItemsList} onUpdateQuantity={updateQuantity} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} /></>)}</AnimatePresence>
      
      {/* Checkout Modal */}
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} cart={cartItemsList} onSubmit={handleOrderSubmit} />
      
      {/* Success Modal */}
      <SuccessModal isOpen={successOpen} onClose={handleSuccessClose} orderDetails={orderDetails} />
    </div>
  );
}