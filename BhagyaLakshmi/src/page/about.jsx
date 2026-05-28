import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

// About Data
const ABOUT_DATA = {
  name: "BhagyaLakshmi Snacks Corner",
  established: 2010,
  tagline: "Where Tradition Meets Taste",
  description: "Founded in 2010, BhagyaLakshmi Snacks Corner started as a small dream to bring authentic, high-quality snacks and desserts to food lovers. Over the years, we've grown into a beloved destination for those who appreciate the perfect blend of traditional recipes and modern culinary innovation.",
  story: "Our journey began in the heart of the city, with a simple philosophy - use the finest ingredients, prepare with love, and serve with a smile. What started as a small outlet has now become a go-to spot for food enthusiasts, families, and friends looking for delicious moments.",
  philosophy: "We believe that food is not just about taste - it's about emotion, memory, and connection. Every dish we create tells a story of passion, quality, and dedication to our craft."
};

// Milestones Data
const MILESTONES = [
  { year: 2010, title: "The Beginning", description: "First outlet opened with just 10 items on the menu", icon: "🌟", color: "#FFD700" },
  { year: 2013, title: "Expansion", description: "Added bakery & dessert section", icon: "🍰", color: "#FF8C42" },
  { year: 2016, title: "Signature Kunafa", description: "Launched our famous kunafa collection", icon: "🌿", color: "#D4AF37" },
  { year: 2019, title: "Online Ordering", description: "Started delivery services", icon: "📱", color: "#6BB5A0" },
  { year: 2022, title: "Gifting Division", description: "Launched premium gifting services", icon: "🎁", color: "#C8A0D8" },
  { year: 2024, title: "New Milestone", description: "Serving 5000+ happy customers monthly", icon: "🎯", color: "#E8A0A0" }
];

// Team Members
const TEAM_MEMBERS = [
  { name: "Chef Rajesh Kumar", role: "Head Chef & Founder", desc: "30+ years of culinary experience, passionate about authentic flavors", image: "👨‍🍳", color: "#FF8C42" },
  { name: "Priya Sharma", role: "Head of Operations", desc: "Ensures every order meets our quality standards", image: "👩‍💼", color: "#C8A0D8" },
  { name: "Amit Patel", role: "Master Baker", desc: "Behind our famous cakes & pastries", image: "👨‍🍳", color: "#D4AF37" },
  { name: "Neha Gupta", role: "Customer Experience", desc: "Making sure every customer leaves happy", image: "👩", color: "#6BB5A0" }
];

// Values Data
const VALUES = [
  { title: "Quality First", desc: "We never compromise on ingredient quality", icon: "✨", color: "#FFD700" },
  { title: "Customer Love", desc: "Your satisfaction is our top priority", icon: "❤️", color: "#E8A0A0" },
  { title: "Innovation", desc: "Constantly evolving our menu", icon: "💡", color: "#C8A0D8" },
  { title: "Authenticity", desc: "Staying true to traditional recipes", icon: "🏺", color: "#D4AF37" },
  { title: "Community", desc: "Giving back to our local community", icon: "🤝", color: "#6BB5A0" },
  { title: "Sustainability", desc: "Eco-friendly packaging & practices", icon: "🌱", color: "#8BC34A" }
];

// Stats Data
const STATS = [
  { number: "10+", label: "Years of Excellence", icon: "📅" },
  { number: "84+", label: "Menu Items", icon: "🍽️" },
  { number: "50k+", label: "Happy Customers", icon: "😊" },
  { number: "7", label: "Service Categories", icon: "🏷️" }
];

// Counter Component
function Counter({ target, label, icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(target);
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, target]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      style={{
        textAlign: "center",
        padding: "1.5rem",
        background: "#FFFFFF",
        borderRadius: 24,
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: "#C8A96E", fontFamily: "'Playfair Display', serif" }}>{count}+</div>
      <div style={{ fontSize: 13, color: "#8C7B6B", fontWeight: 500 }}>{label}</div>
    </motion.div>
  );
}

// Timeline Item
function TimelineItem({ milestone, index, inView }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: index % 2 === 0 ? "row" : "row-reverse",
        alignItems: "center",
        gap: "2rem",
        marginBottom: "2rem",
        position: "relative",
      }}
    >
      <div style={{ flex: 1, textAlign: index % 2 === 0 ? "right" : "left" }}>
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          style={{
            background: "#FFFFFF",
            padding: "1.25rem",
            borderRadius: 20,
            boxShadow: hovered ? "0 10px 25px rgba(0,0,0,0.1)" : "0 4px 12px rgba(0,0,0,0.05)",
            border: hovered ? `2px solid ${milestone.color}` : "1px solid #F0E8D6",
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, justifyContent: index % 2 === 0 ? "flex-end" : "flex-start" }}>
            <span style={{ fontSize: 24 }}>{milestone.icon}</span>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#2C1810" }}>{milestone.title}</h3>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: "#8C7B6B", textAlign: index % 2 === 0 ? "right" : "left" }}>{milestone.description}</p>
        </motion.div>
      </div>
      
      <div style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        background: milestone.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontWeight: 800,
        fontSize: 16,
        position: "relative",
        zIndex: 2,
        boxShadow: "0 0 0 4px #FFFFFF, 0 0 0 8px rgba(200,169,110,0.2)",
      }}>
        {milestone.year}
      </div>
      
      <div style={{ flex: 1 }} />
      
      {index < MILESTONES.length - 1 && (
        <div style={{
          position: "absolute",
          left: "50%",
          top: 60,
          width: 2,
          height: 80,
          background: "linear-gradient(180deg, #C8A96E, transparent)",
          transform: "translateX(-50%)",
          zIndex: 1,
        }} />
      )}
    </motion.div>
  );
}

// Team Card
function TeamCard({ member, index, inView }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: 28,
        padding: "1.5rem",
        textAlign: "center",
        boxShadow: hovered ? "0 20px 35px -12px rgba(0,0,0,0.15)" : "0 4px 15px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          width: 100,
          height: 100,
          background: `linear-gradient(135deg, ${member.color}40, ${member.color}20)`,
          borderRadius: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1rem",
          fontSize: 48,
        }}
      >
        {member.image}
      </motion.div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#2C1810", margin: "0 0 4px 0" }}>{member.name}</h3>
      <p style={{ fontSize: 13, color: "#C8A96E", fontWeight: 600, margin: "0 0 8px 0" }}>{member.role}</p>
      <p style={{ fontSize: 12, color: "#8C7B6B", lineHeight: 1.5, margin: 0 }}>{member.desc}</p>
    </motion.div>
  );
}

// Value Card
function ValueCard({ value, index, inView }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: 20,
        padding: "1.5rem",
        textAlign: "center",
        boxShadow: hovered ? `0 10px 25px -8px ${value.color}40` : "0 2px 10px rgba(0,0,0,0.05)",
        border: hovered ? `1px solid ${value.color}` : "1px solid #F0E8D6",
        transition: "all 0.3s ease",
      }}
    >
      <motion.div
        animate={{ rotate: hovered ? 360 : 0, scale: hovered ? 1.2 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 40, marginBottom: 12 }}
      >
        {value.icon}
      </motion.div>
      <h4 style={{ fontSize: 16, fontWeight: 700, color: "#2C1810", margin: "0 0 8px 0" }}>{value.title}</h4>
      <p style={{ fontSize: 12, color: "#8C7B6B", lineHeight: 1.5, margin: 0 }}>{value.desc}</p>
    </motion.div>
  );
}

// Main About Component
export default function About() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const storyInView = useInView(storyRef, { once: true });
  const visionInView = useInView(visionRef, { once: true });
  const missionInView = useInView(missionRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });
  const timelineInView = useInView(timelineRef, { once: true });
  const teamInView = useInView(teamRef, { once: true });
  const valuesInView = useInView(valuesRef, { once: true });
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  return (
    <div style={{
      minHeight: "100vh",
      background: "#FBF6EE",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #F0E8D6; }
          ::-webkit-scrollbar-thumb { background: #C8A96E; border-radius: 10px; }
        `}
      </style>
      
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        style={{
          background: "linear-gradient(135deg, #FDF3E0, #F5E8C8)",
          padding: "4rem 2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={heroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            style={{ fontSize: 64, marginBottom: 16 }}
          >
            🍽️
          </motion.div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            fontWeight: 800,
            color: "#2C1810",
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            About <span style={{ color: "#C8A96E" }}>Us</span>
          </h1>
          <p style={{
            fontSize: 18,
            color: "#8C7B6B",
            maxWidth: 600,
            margin: "1rem auto 0",
            lineHeight: 1.6,
          }}>
            Discover the story behind BhagyaLakshmi Snacks Corner
          </p>
        </motion.div>
        
        {/* Decorative Elements */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, background: "rgba(200,169,110,0.05)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 250, height: 250, background: "rgba(200,169,110,0.08)", borderRadius: "50%" }} />
      </motion.div>
      
      {/* Stats Section */}
      <div ref={statsRef} style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
        }}>
          {STATS.map((stat, idx) => (
            <Counter key={idx} target={stat.number} label={stat.label} icon={stat.icon} />
          ))}
        </div>
      </div>
      
      {/* Story Section - Left Text, Right Image */}
      <div ref={storyRef} style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem", overflow: "hidden" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "4rem",
          alignItems: "center",
        }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 48, display: "block", marginBottom: 16 }}>📖</span>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: "#2C1810",
                margin: "0 0 16px 0",
              }}>
                Our Story
              </h2>
              <p style={{ fontSize: 16, color: "#8C7B6B", lineHeight: 1.8, marginBottom: 16 }}>
                {ABOUT_DATA.description}
              </p>
              <p style={{ fontSize: 16, color: "#8C7B6B", lineHeight: 1.8, marginBottom: 16 }}>
                {ABOUT_DATA.story}
              </p>
              <p style={{ fontSize: 16, color: "#8C7B6B", lineHeight: 1.8 }}>
                {ABOUT_DATA.philosophy}
              </p>
            </div>
            
            <div style={{
              display: "flex",
              gap: 16,
              marginTop: 24,
              padding: "1rem 0",
              borderTop: "2px solid #F0E8D6",
            }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#C8A96E" }}>Est. 2010</div>
                <div style={{ fontSize: 12, color: "#8C7B6B" }}>Year Founded</div>
              </div>
              <div style={{ width: 1, background: "#F0E8D6" }} />
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#C8A96E" }}>100%</div>
                <div style={{ fontSize: 12, color: "#8C7B6B" }}>Fresh Ingredients</div>
              </div>
              <div style={{ width: 1, background: "#F0E8D6" }} />
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#C8A96E" }}>7 Days</div>
                <div style={{ fontSize: 12, color: "#8C7B6B" }}>Open Weekly</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              position: "relative",
              borderRadius: 32,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="/about/VISION.png"
              alt="BhagyaLakshmi Store"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.style.background = "linear-gradient(135deg, #F5E8C8, #E8D5A8)";
                e.target.parentElement.style.minHeight = "400px";
                e.target.parentElement.style.display = "flex";
                e.target.parentElement.style.alignItems = "center";
                e.target.parentElement.style.justifyContent = "center";
                e.target.parentElement.innerHTML = '<div style="text-align:center"><span style="font-size:64px">🏪</span><p style="color:#8C7B6B;margin-top:16px">Our Store Image</p></div>';
              }}
            />
            <motion.div
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle, transparent 30%, rgba(200,169,110,0.1) 100%)",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Vision & Mission Section - Left Image, Right Text then Left Text, Right Image */}
      
      {/* Vision: Left Image, Right Text */}
      <div ref={visionRef} style={{ background: "#FFFFFF", marginTop: "2rem", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                borderRadius: 32,
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src="/about/VISION.png"
                alt="Our Vision"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background = "linear-gradient(135deg, #E8F4F8, #DDEFF5)";
                  e.target.parentElement.style.minHeight = "350px";
                  e.target.parentElement.style.display = "flex";
                  e.target.parentElement.style.alignItems = "center";
                  e.target.parentElement.style.justifyContent = "center";
                  e.target.parentElement.innerHTML = '<div style="text-align:center"><span style="font-size:64px">👁️</span><p style="color:#8C7B6B;margin-top:16px">Vision Image</p></div>';
                }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span style={{ fontSize: 48, display: "block", marginBottom: 16 }}>👁️</span>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: "#2C1810",
                margin: "0 0 16px 0",
              }}>
                Our Vision
              </h2>
              <p style={{ fontSize: 16, color: "#8C7B6B", lineHeight: 1.8 }}>
                To become the most beloved snack destination that brings people together through 
                exceptional food experiences. We envision a future where BhagyaLakshmi is synonymous 
                with quality, innovation, and heartfelt hospitality - creating smiles one bite at a time.
              </p>
              <div style={{
                marginTop: 24,
                padding: "1rem",
                background: "#FBF6EE",
                borderRadius: 16,
                borderLeft: `4px solid #C8A96E`,
              }}>
                <p style={{ fontSize: 14, fontStyle: "italic", color: "#2C1810", margin: 0 }}>
                  "To serve happiness on every plate and create unforgettable food memories"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Mission: Left Text, Right Image */}
      <div ref={missionRef} style={{ overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span style={{ fontSize: 48, display: "block", marginBottom: 16 }}>🎯</span>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: "#2C1810",
                margin: "0 0 16px 0",
              }}>
                Our Mission
              </h2>
              <p style={{ fontSize: 16, color: "#8C7B6B", lineHeight: 1.8 }}>
                Our mission is to delight every customer with freshly prepared, high-quality snacks 
                and desserts that combine traditional flavors with contemporary presentation. We are 
                committed to using the finest ingredients, maintaining impeccable hygiene standards, 
                and providing exceptional service that makes every visit special.
              </p>
              <div style={{ marginTop: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <span style={{ fontSize: 14, color: "#2C1810" }}>100% Fresh Ingredients</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <span style={{ fontSize: 14, color: "#2C1810" }}>Hygiene Certified Kitchen</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <span style={{ fontSize: 14, color: "#2C1810" }}>Timely Delivery Guaranteed</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                borderRadius: 32,
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src="/about/MISSION.png"
                alt="Our Mission"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background = "linear-gradient(135deg, #FFF0F0, #FFE4E4)";
                  e.target.parentElement.style.minHeight = "350px";
                  e.target.parentElement.style.display = "flex";
                  e.target.parentElement.style.alignItems = "center";
                  e.target.parentElement.style.justifyContent = "center";
                  e.target.parentElement.innerHTML = '<div style="text-align:center"><span style="font-size:64px">🎯</span><p style="color:#8C7B6B;margin-top:16px">Mission Image</p></div>';
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Values Section */}
      <div ref={valuesRef} style={{ background: "#FFFFFF", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span style={{ fontSize: 48 }}>💎</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#2C1810",
              margin: "0.5rem 0 1rem",
            }}>
              Our Core Values
            </h2>
            <p style={{ fontSize: 16, color: "#8C7B6B", maxWidth: 600, margin: "0 auto 3rem" }}>
              The principles that guide everything we do
            </p>
          </motion.div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}>
            {VALUES.map((value, idx) => (
              <ValueCard key={idx} value={value} index={idx} inView={valuesInView} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Timeline Section */}
      <div ref={timelineRef} style={{ padding: "4rem 2rem", overflow: "hidden" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span style={{ fontSize: 48 }}>⏰</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#2C1810",
              margin: "0.5rem 0 1rem",
            }}>
              Our Journey
            </h2>
            <p style={{ fontSize: 16, color: "#8C7B6B", maxWidth: 600, margin: "0 auto 3rem" }}>
              Milestones that shaped BhagyaLakshmi
            </p>
          </motion.div>
          
          <div style={{ position: "relative" }}>
            {MILESTONES.map((milestone, idx) => (
              <TimelineItem key={idx} milestone={milestone} index={idx} inView={timelineInView} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div ref={teamRef} style={{ background: "#FFFFFF", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span style={{ fontSize: 48 }}>👥</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#2C1810",
              margin: "0.5rem 0 1rem",
            }}>
              Meet Our Team
            </h2>
            <p style={{ fontSize: 16, color: "#8C7B6B", maxWidth: 600, margin: "0 auto 3rem" }}>
              The passionate people behind your favorite snacks
            </p>
          </motion.div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
          }}>
            {TEAM_MEMBERS.map((member, idx) => (
              <TeamCard key={idx} member={member} index={idx} inView={teamInView} />
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
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
          Experience the Taste of Quality
        </h2>
        <p style={{ fontSize: 16, color: "#D4B896", maxWidth: 500, margin: "0 auto 1.5rem" }}>
          Visit us or order online to taste our delicious creations
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/menu"}
            style={{
              background: "#C8A96E",
              color: "#2C1810",
              border: "none",
              borderRadius: 40,
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            View Our Menu →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/order"}
            style={{
              background: "transparent",
              color: "#F5E8C8",
              border: "1px solid #C8A96E",
              borderRadius: 40,
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Order Online →
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}