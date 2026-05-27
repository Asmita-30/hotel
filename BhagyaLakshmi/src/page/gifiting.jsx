import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";

// Gifting Categories Data
const GIFTING_CATEGORIES = [
  {
    id: "birth",
    title: "Birth Announcements",
    emoji: "👶",
    tagline: "Celebrate the arrival of your little miracle",
    description: "Make your baby's arrival extra special with our customised sweet treats. Perfect for baby showers, naming ceremonies, and birth announcements.",
    bgGradient: "linear-gradient(135deg, #FFF5F0, #FFE8E0)",
    accentColor: "#E8A0A0",
    image: "/src/assets/menu/Birth Announcements.png",
    products: [
      { name: "Personalised Baby Name Cookies", price: "₹299/dozen", desc: "Custom cookies with baby's name and birth details" },
      { name: "It's a Boy/Girl Cupcakes", price: "₹399/box", desc: "Blue or pink themed cupcakes with toppers" },
      { name: "Baby Shower Cake", price: "₹899/kg", desc: "Two-tier cake with baby theme decorations" },
      { name: "Mini Announcement Macarons", price: "₹499/box", desc: "Assorted macarons with 'Welcome Baby' message" }
    ]
  },
  {
    id: "personalised",
    title: "Personalised Desserts",
    emoji: "🎂",
    tagline: "Made just for you, with love",
    description: "Custom desserts tailored to your preferences. From name engravings to photo prints, we make every dessert uniquely yours.",
    bgGradient: "linear-gradient(135deg, #FFF0F5, #FFE4EE)",
    accentColor: "#C8A0D8",
    image: "/src/assets/menu/Personalised Desserts.png",
    products: [
      { name: "Photo Print Cake", price: "₹999/kg", desc: "Edible photo print on your favorite cake flavor" },
      { name: "Name Engraved Cheesecake", price: "₹599", desc: "Personalised message engraved on creamy cheesecake" },
      { name: "Custom Message Brownies", price: "₹399/box", desc: "Brownie box with custom written message" },
      { name: "Birthday Number Cake", price: "₹1199", desc: "Number shaped cake with your choice of toppings" }
    ]
  },
  {
    id: "wedding",
    title: "Wedding Gifting",
    emoji: "💍",
    tagline: "Sweet memories for your special day",
    description: "Elegant and luxurious dessert hampers for weddings, engagements, and anniversaries. Perfect for guests and wedding parties.",
    bgGradient: "linear-gradient(135deg, #FFF5E8, #FFEDD8)",
    accentColor: "#D4AF37",
    image: "/src/assets/menu/Wedding Gifting.png",
    products: [
      { name: "Wedding Favours Box", price: "₹199/box", desc: "Assorted sweets in elegant packaging" },
      { name: "Couple Name Macarons", price: "₹799/dozen", desc: "Macarons printed with couple's names" },
      { name: "Luxury Dessert Hamper", price: "₹1499", desc: "Premium selection of sweets & chocolates" },
      { name: "Anniversary Cake", price: "₹1099/kg", desc: "Custom cake with anniversary wishes" }
    ]
  },
  {
    id: "corporate",
    title: "Corporate Gifting",
    emoji: "🏢",
    tagline: "Impress your clients & employees",
    description: "Premium corporate gift boxes that leave a lasting impression. Custom branding available for bulk orders.",
    bgGradient: "linear-gradient(135deg, #E8F4F0, #DEEEE8)",
    accentColor: "#6BB5A0",
    image: "/src/assets/menu/Corporate Gifting.png",
    products: [
      { name: "Corporate Hamper", price: "₹999/box", desc: "Branded box with premium sweets" },
      { name: "Festive Gift Box", price: "₹599/box", desc: "Seasonal treats in festive packaging" },
      { name: "Thank You Cookies", price: "₹399/jar", desc: "Personalised 'Thank You' cookie jar" },
      { name: "Premium Dry Fruit Box", price: "₹1299/box", desc: "Luxury dry fruits & chocolates combo" }
    ]
  }
];

// Testimonials
const TESTIMONIALS = [
  { id: 1, name: "Priya Sharma", event: "Birth Announcement", text: "The personalized cookies for my baby's announcement were absolutely beautiful! Everyone loved them.", rating: 5, image: "👩" },
  { id: 2, name: "Rahul Mehta", event: "Wedding", text: "The wedding favours were a hit with our guests. Elegant packaging and delicious treats!", rating: 5, image: "👨" },
  { id: 3, name: "Neha Gupta", event: "Corporate", text: "Excellent service and the corporate boxes were perfect for our Diwali gifting.", rating: 5, image: "👩" },
  { id: 4, name: "Amit Patel", event: "Birthday", text: "The custom cake with photo print exceeded our expectations. Highly recommended!", rating: 5, image: "👨" }
];

// Process Steps
const PROCESS_STEPS = [
  { step: "01", title: "Choose Your Occasion", desc: "Select from our range of gifting categories", icon: "🎯" },
  { step: "02", title: "Customise Your Gift", desc: "Add personal messages, names, or photos", icon: "✏️" },
  { step: "03", title: "Review & Approve", desc: "Get a digital proof before production", icon: "👀" },
  { step: "04", title: "Delivery", desc: "Freshly prepared & beautifully packaged", icon: "🚚" }
];

// FAQ Data
const FAQS = [
  { q: "What is the minimum order quantity for corporate gifting?", a: "Corporate gifting orders start from 20 boxes. Custom branding is available for orders above 50 boxes." },
  { q: "How far in advance should I place an order?", a: "We recommend placing orders at least 5-7 days in advance for personalised items. For bulk corporate orders, please allow 10-12 days." },
  { q: "Do you offer delivery across the city?", a: "Yes, we offer free delivery for orders above ₹2000 within city limits. Delivery charges apply for other areas." },
  { q: "Can I get a sample before placing a bulk order?", a: "Yes, samples are available for bulk orders. A nominal sample fee applies, which is refundable on final order." }
];

// Category Card Component
function CategoryCard({ category, index, inView }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: 32,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered ? "0 30px 50px -20px rgba(0,0,0,0.3)" : "0 8px 25px rgba(0,0,0,0.08)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
        <motion.img
          src={category.image}
          alt={category.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          onError={(e) => { e.target.style.display = "none"; e.target.parentElement.style.background = category.bgGradient; e.target.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:64px">${category.emoji}</div>`; }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 0.7 : 0 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #2C1810, #000000)",
          }}
        />
        <div style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: category.accentColor,
          borderRadius: 30,
          padding: "8px 16px",
          fontSize: 28,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
          {category.emoji}
        </div>
      </div>
      
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 24,
          fontWeight: 700,
          color: "#2C1810",
          margin: "0 0 8px 0",
        }}>{category.title}</h3>
        <p style={{
          fontSize: 14,
          color: "#8C7B6B",
          lineHeight: 1.5,
          margin: "0 0 16px 0",
        }}>{category.tagline}</p>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: category.accentColor,
            color: "#FFFFFF",
            border: "none",
            borderRadius: 40,
            padding: "10px 24px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onClick={() => document.getElementById(category.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          Explore {category.title} →
        </motion.button>
      </div>
    </motion.div>
  );
}

// Product Card for each category detail
function ProductCard({ product, accentColor }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: 20,
        padding: "1.25rem",
        boxShadow: hovered ? `0 10px 25px -8px ${accentColor}40` : "0 2px 12px rgba(0,0,0,0.05)",
        border: `1px solid ${hovered ? accentColor : "#F0E8D6"}`,
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <h4 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18,
          fontWeight: 700,
          color: "#2C1810",
          margin: 0,
        }}>{product.name}</h4>
        <span style={{
          background: accentColor + "20",
          color: accentColor,
          padding: "4px 10px",
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 700,
        }}>{product.price}</span>
      </div>
      <p style={{
        fontSize: 13,
        color: "#8C7B6B",
        lineHeight: 1.5,
        margin: 0,
      }}>{product.desc}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: 16,
          background: "transparent",
          border: `1px solid ${accentColor}`,
          color: accentColor,
          borderRadius: 30,
          padding: "6px 16px",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          width: "100%",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => { e.target.style.background = accentColor; e.target.style.color = "#FFFFFF"; }}
        onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = accentColor; }}
      >
        Enquire Now →
      </motion.button>
    </motion.div>
  );
}

// Testimonial Card
function TestimonialCard({ testimonial, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{
        background: "#FFFFFF",
        borderRadius: 24,
        padding: "1.5rem",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        border: "1px solid #F0E8D6",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          background: "linear-gradient(135deg, #C8A96E, #B8942E)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          color: "#FFFFFF",
        }}>{testimonial.image}</div>
        <div>
          <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#2C1810" }}>{testimonial.name}</h4>
          <p style={{ margin: 0, fontSize: 12, color: "#C8A96E" }}>{testimonial.event}</p>
        </div>
      </div>
      <p style={{ fontSize: 14, color: "#8C7B6B", lineHeight: 1.6, fontStyle: "italic" }}>"{testimonial.text}"</p>
      <div style={{ marginTop: 12, color: "#C8A96E", fontSize: 14 }}>{"★".repeat(testimonial.rating)}</div>
    </motion.div>
  );
}

// FAQ Accordion Item
function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        borderBottom: "1px solid #F0E8D6",
      }}
    >
      <motion.button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: "#2C1810", textAlign: "left" }}>{faq.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          style={{ fontSize: 20, color: "#C8A96E" }}
        >
          ▼
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: 14, color: "#8C7B6B", lineHeight: 1.6, paddingBottom: "1.25rem", margin: 0 }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Inquiry Modal
function InquiryModal({ isOpen, onClose, category }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 2000);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(44,24,16,0.7)",
              backdropFilter: "blur(4px)",
              zIndex: 1000,
            }}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 500,
              background: "#FFFFFF",
              borderRadius: 32,
              padding: "2rem",
              zIndex: 1001,
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ textAlign: "center", padding: "2rem" }}
              >
                <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                <h3 style={{ color: "#2C1810", marginBottom: 8 }}>Thank You!</h3>
                <p style={{ color: "#8C7B6B" }}>We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#2C1810", margin: 0 }}>
                    Enquire about {category}
                  </h2>
                  <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#8C7B6B" }}>✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      marginBottom: 12,
                      border: "1px solid #F0E8D6",
                      borderRadius: 12,
                      fontSize: 14,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      marginBottom: 12,
                      border: "1px solid #F0E8D6",
                      borderRadius: 12,
                      fontSize: 14,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      marginBottom: 12,
                      border: "1px solid #F0E8D6",
                      borderRadius: 12,
                      fontSize: 14,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />
                  <textarea
                    placeholder="Tell us about your requirement"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      marginBottom: 16,
                      border: "1px solid #F0E8D6",
                      borderRadius: 12,
                      fontSize: 14,
                      fontFamily: "'DM Sans', sans-serif",
                      resize: "none",
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: "linear-gradient(135deg, #C8A96E, #B8942E)",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: 40,
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Send Enquiry →
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Main Gifting Component
export default function Gifting() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const categoriesRef = useRef(null);
  const categoriesInView = useInView(categoriesRef, { once: true, amount: 0.1 });
  
  const handleEnquire = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
    setModalOpen(true);
  };
  
  return (
    <div style={{
      minHeight: "100vh",
      background: "#FBF6EE",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F0E8D6; }
        ::-webkit-scrollbar-thumb { background: #C8A96E; border-radius: 10px; }
      `}</style>
      
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        style={{
          background: "linear-gradient(135deg, #FDF3E0, #F5E8C8)",
          textAlign: "center",
          padding: "4rem 2rem",
          position: "relative",
          overflow: "hidden",
          opacity: opacity,
        }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            style={{ fontSize: 80, marginBottom: 16 }}
          >
            🎁
          </motion.div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: 800,
            color: "#2C1810",
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            Thoughtful <span style={{ color: "#C8A96E" }}>Gifting</span>
          </h1>
          <p style={{
            fontSize: 18,
            color: "#8C7B6B",
            maxWidth: 650,
            margin: "1rem auto 0",
            lineHeight: 1.6,
          }}>
            Make every occasion memorable with our beautifully crafted, 
            customisable dessert gift boxes. Perfect for all celebrations.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginTop: "2rem" }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => categoriesRef.current?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "#2C1810",
                color: "#F5E8C8",
                border: "none",
                borderRadius: 50,
                padding: "14px 36px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Explore Collections →
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Decorative elements */}
        <div style={{ position: "absolute", bottom: -50, left: -50, width: 200, height: 200, background: "rgba(200,169,110,0.08)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: -50, right: -50, width: 250, height: 250, background: "rgba(200,169,110,0.05)", borderRadius: "50%" }} />
      </motion.div>
      
      {/* Categories Grid */}
      <div ref={categoriesRef} style={{ maxWidth: 1400, margin: "0 auto", padding: "4rem 2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <span style={{ fontSize: 48 }}>✨</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
            fontWeight: 700,
            color: "#2C1810",
            margin: "0.5rem 0",
          }}>Our Gifting Collections</h2>
          <p style={{ fontSize: 16, color: "#8C7B6B", maxWidth: 600, margin: "0 auto" }}>
            Choose from our curated selection of premium gifting options
          </p>
        </motion.div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}>
          {GIFTING_CATEGORIES.map((category, idx) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={idx}
              inView={categoriesInView}
            />
          ))}
        </div>
      </div>
      
      {/* Detailed Sections for each category */}
      {GIFTING_CATEGORIES.map((category, catIdx) => {
        const SectionObserver = () => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, amount: 0.2 });
          
          return (
            <motion.div
              ref={ref}
              id={category.id}
              style={{
                background: category.bgGradient,
                padding: "4rem 2rem",
                marginBottom: catIdx < GIFTING_CATEGORIES.length - 1 ? 0 : undefined,
              }}
            >
              <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "3rem",
                  alignItems: "center",
                }}>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <div style={{
                      width: 80,
                      height: 80,
                      background: category.accentColor + "20",
                      borderRadius: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 48,
                      marginBottom: 20,
                    }}>
                      {category.emoji}
                    </div>
                    <h2 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                      fontWeight: 700,
                      color: "#2C1810",
                      margin: "0 0 16px 0",
                    }}>{category.title}</h2>
                    <p style={{ fontSize: 16, color: "#8C7B6B", lineHeight: 1.6, marginBottom: 24 }}>
                      {category.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEnquire(category.title)}
                      style={{
                        background: category.accentColor,
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: 40,
                        padding: "12px 28px",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Enquire Now →
                    </motion.button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: "1rem",
                    }}>
                      {category.products.map((product, idx) => (
                        <ProductCard
                          key={idx}
                          product={product}
                          accentColor={category.accentColor}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        };
        return <SectionObserver key={category.id} />;
      })}
      
      {/* Process Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ padding: "4rem 2rem", background: "#FFFFFF", textAlign: "center" }}
      >
        <span style={{ fontSize: 48 }}>📋</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 700,
          color: "#2C1810",
          margin: "0.5rem 0 1rem",
        }}>How It Works</h2>
        <p style={{ fontSize: 16, color: "#8C7B6B", maxWidth: 600, margin: "0 auto 3rem" }}>
          Simple, transparent, and hassle-free process
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem",
          maxWidth: 1000,
          margin: "0 auto",
        }}>
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              style={{
                textAlign: "center",
                padding: "1.5rem",
                background: "#FBF6EE",
                borderRadius: 24,
              }}
            >
              <div style={{
                width: 60,
                height: 60,
                background: "linear-gradient(135deg, #C8A96E, #B8942E)",
                borderRadius: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: 20,
                fontWeight: 800,
                color: "#FFFFFF",
              }}>{step.step}</div>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{step.icon}</div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: "#2C1810", margin: "0 0 8px" }}>{step.title}</h4>
              <p style={{ fontSize: 13, color: "#8C7B6B", margin: 0 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Testimonials */}
      <div style={{ padding: "4rem 2rem", background: "#FBF6EE" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 48 }}>⭐</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "#2C1810",
            margin: "0.5rem 0 1rem",
          }}>What Our Customers Say</h2>
          <p style={{ fontSize: 16, color: "#8C7B6B", marginBottom: "3rem" }}>
            Loved by hundreds of happy customers
          </p>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}>
            {TESTIMONIALS.map((testimonial, idx) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={idx}
                inView={true}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div style={{ padding: "4rem 2rem", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span style={{ fontSize: 48 }}>❓</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#2C1810",
              margin: "0.5rem 0",
            }}>Frequently Asked Questions</h2>
          </div>
          
          {FAQS.map((faq, idx) => (
            <FAQItem
              key={idx}
              faq={faq}
              index={idx}
              isOpen={openFAQ === idx}
              onToggle={() => setOpenFAQ(openFAQ === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
      
      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          background: "linear-gradient(135deg, #2C1810, #3D2A1E)",
          margin: "2rem",
          borderRadius: 40,
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
          fontWeight: 700,
          color: "#F5E8C8",
          margin: "0 0 1rem",
        }}>
          Need a Custom Gift Box?
        </h2>
        <p style={{ fontSize: 16, color: "#D4B896", maxWidth: 500, margin: "0 auto 1.5rem" }}>
          Let us help you create the perfect gift for your special occasion
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleEnquire("Custom Gift")}
          style={{
            background: "#C8A96E",
            color: "#2C1810",
            border: "none",
            borderRadius: 50,
            padding: "14px 36px",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Get in Touch →
        </motion.button>
      </motion.div>
      
      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        category={selectedCategory}
      />
    </div>
  );
}