import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const FOOTER_LINKS = {
  explore: [
    { label: "Shop", href: "#shop" },
    { label: "Menu", href: "#menu" },
    { label: "Gifting", href: "#gifting" },
    { label: "About Us", href: "#about" },
    { label: "Order", href: "#order" },
  ],
  support: [
    { label: "FAQ", href: "#faq" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Refund Policy", href: "#refund" },
  ],
  contact: [
    { label: "+91 98765 43210", href: "tel:+919876543210", icon: "📞" },
    { label: "hello@bhagyalakshmi.com", href: "mailto:hello@bhagyalakshmi.com", icon: "✉️" },
    { label: "123, Food Street, Mumbai", href: "#", icon: "📍" },
  ],
};

const SOCIAL_LINKS = [
  { name: "Instagram", icon: "📷", href: "#", color: "#E4405F" },
  { name: "Facebook", icon: "📘", href: "#", color: "#1877F2" },
  { name: "WhatsApp", icon: "💬", href: "#", color: "#25D366" },
  { name: "Swiggy", icon: "🍔", href: "#", color: "#FC8019" },
  { name: "Zomato", icon: "🍕", href: "#", color: "#CB202D" },
];

const MENU_CATEGORIES = [
  {
    name: "BAKERY SPECIALS",
    items: [
      "Belgian Chocolate Macaron – ₹80",
      "Red Velvet Cupcake – ₹80",
      "Burnt Basque Cheesecake – ₹180",
    ],
  },
  {
    name: "CHAAT CORNER",
    items: [
      "Cheese Sev Puri – ₹100",
      "Dahi Ragda Puri – ₹70",
      "Palak Patta Chaat – ₹80",
    ],
  },
  {
    name: "PAV BHAJI & PULAV",
    items: [
      "Cheese Pav Bhaji – ₹150",
      "Paneer Cheese Pav Bhaji – ₹220",
      "Cheese Masala Pav – ₹120",
    ],
  },
  {
    name: "SIGNATURE KUNAS",
    items: [
      "Pista Kunafa – ₹250",
      "Lotus Biscoff Kunafa – ₹220",
      "Nutella Kunafa – ₹220",
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

        /* Global Reset to Remove Gaps */
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .footer-root {
          width: 100%;
          background: linear-gradient(135deg, #0f0a07 0%, #1a120d 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .footer-root::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(circle at 20% 40%, rgba(212, 175, 55, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }

        .footer-container {
          width: 100%;
          max-width: 100%;
          margin: 0;
          padding: 2.5rem 3rem 1.5rem;
          position: relative;
          z-index: 1;
        }

        /* Newsletter Section - Compact */
        .newsletter-section {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.02));
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 20px;
          padding: 1.5rem 2rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .newsletter-content h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 500;
          color: #F5E6B8;
          margin-bottom: 0.3rem;
        }

        .newsletter-content p {
          font-size: 0.75rem;
          color: rgba(245, 230, 184, 0.6);
          letter-spacing: 0.02em;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .newsletter-input {
          background: rgba(15, 10, 7, 0.8);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 40px;
          padding: 0.6rem 1.2rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: #F5E6B8;
          width: 250px;
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #D4AF37;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
        }

        .newsletter-input::placeholder {
          color: rgba(245, 230, 184, 0.4);
        }

        .subscribe-btn {
          background: linear-gradient(135deg, #D4AF37, #B8942E);
          border: none;
          border-radius: 40px;
          padding: 0.6rem 1.5rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0f0a07;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .subscribe-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }

        /* Footer Grid - Compact */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 1.8rem;
          margin-bottom: 2rem;
        }

        .brand-col .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }

        .footer-logo-img {
          width: 45px;
          height: 45px;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        .footer-logo-text {
          display: flex;
          flex-direction: column;
        }

        .footer-logo-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 600;
          background: linear-gradient(135deg, #E8D07A, #C5A028);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .footer-logo-tagline {
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(212, 175, 55, 0.6);
          margin-top: 2px;
        }

        .brand-description {
          font-size: 0.75rem;
          line-height: 1.5;
          color: rgba(245, 230, 184, 0.7);
          margin-bottom: 1rem;
        }

        .opening-hours {
          background: rgba(212, 175, 55, 0.05);
          border-radius: 10px;
          padding: 0.7rem;
        }

        .opening-hours p {
          font-size: 0.65rem;
          color: #D4AF37;
          letter-spacing: 0.05em;
          margin-bottom: 0.2rem;
        }

        .opening-hours span {
          font-size: 0.7rem;
          color: #F5E6B8;
          font-weight: 500;
        }

        .footer-col h4 {
          font-family: 'Playfair Display', serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #D4AF37;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }

        .footer-col h4::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 30px;
          height: 2px;
          background: #D4AF37;
        }

        .footer-links {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 0.5rem;
        }

        .footer-links a {
          font-size: 0.75rem;
          color: rgba(245, 230, 184, 0.7);
          text-decoration: none;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .footer-links a:hover {
          color: #D4AF37;
          transform: translateX(3px);
        }

        .contact-links a {
          gap: 0.6rem;
        }

        .contact-icon {
          font-size: 0.9rem;
        }

        .social-section {
          margin-top: 0.8rem;
        }

        .social-title {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(212, 175, 55, 0.7);
          margin-bottom: 0.7rem;
        }

        .social-icons {
          display: flex;
          gap: 0.7rem;
          flex-wrap: wrap;
        }

        .social-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.3s ease;
          color: #D4AF37;
        }

        .social-icon:hover {
          transform: translateY(-3px);
          border-color: #D4AF37;
          background: rgba(212, 175, 55, 0.15);
        }

        .quick-menu-preview {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.4rem 0.8rem;
          margin-top: 0.5rem;
        }

        .menu-preview-item {
          font-size: 0.65rem;
          color: rgba(245, 230, 184, 0.6);
          display: flex;
          justify-content: space-between;
          transition: color 0.2s ease;
        }

        .menu-preview-item:hover {
          color: #D4AF37;
        }

        .menu-preview-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .menu-preview-price {
          font-weight: 500;
          color: #D4AF37;
        }

        /* Footer Bottom - Compact */
        .footer-bottom {
          border-top: 1px solid rgba(212, 175, 55, 0.12);
          padding-top: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.8rem;
          font-size: 0.65rem;
          color: rgba(245, 230, 184, 0.5);
          letter-spacing: 0.05em;
        }

        .copyright {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .payment-methods {
          display: flex;
          gap: 0.8rem;
        }

        .payment-methods span {
          font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-container {
            padding: 2rem 1.5rem 1rem;
          }
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .newsletter-section {
            flex-direction: column;
            text-align: center;
          }
          .newsletter-form {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 1.5rem 1rem 1rem;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .newsletter-input {
            width: 100%;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <footer className="footer-root" ref={ref}>
        <div className="footer-container">
          {/* Newsletter Section */}
          <motion.div
            className="newsletter-section"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={itemVariants}
          >
            <div className="newsletter-content">
              <h3>✦ Subscribe to Our Newsletter</h3>
              <p>Get exclusive offers, new arrival updates, and special discounts!</p>
            </div>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button
                type="submit"
                className="subscribe-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {subscribed ? "✓ Subscribed!" : "Subscribe"}
              </motion.button>
            </form>
          </motion.div>

          {/* Footer Grid */}
          <motion.div
            className="footer-grid"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* Brand Column */}
            <motion.div className="brand-col" variants={itemVariants}>
              <div className="footer-logo">
                <motion.img
                  src="/logo.png"
                  alt="BhagyaLakshmi Logo"
                  className="footer-logo-img floating"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <div className="footer-logo-text">
                  <span className="footer-logo-name">BhagyaLakshmi</span>
                  <span className="footer-logo-tagline">SNACKS CORNER</span>
                </div>
              </div>
              <p className="brand-description">
                Serving authentic Indian snacks, premium desserts, and signature kunafas since 2010. 
                Quality ingredients, passionate craft, and love in every bite.
              </p>
              <div className="opening-hours">
                <p>⏰ OPENING HOURS</p>
                <span>Mon - Sun: 11:00 AM - 11:00 PM</span>
              </div>
            </motion.div>

            {/* Explore Links */}
            <motion.div className="footer-col" variants={itemVariants}>
              <h4>Explore</h4>
              <ul className="footer-links">
                {FOOTER_LINKS.explore.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div className="footer-col" variants={itemVariants}>
              <h4>Support</h4>
              <ul className="footer-links">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <div className="social-section">
                <div className="social-title">Follow Us</div>
                <div className="social-icons">
                  {SOCIAL_LINKS.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="social-icon"
                      whileHover={{ scale: 1.1, backgroundColor: social.color + "20" }}
                      whileTap={{ scale: 0.95 }}
                      title={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact & Popular Items */}
            <motion.div className="footer-col" variants={itemVariants}>
              <h4>Contact Us</h4>
              <ul className="footer-links contact-links">
                {FOOTER_LINKS.contact.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="contact-icon">{link.icon}</span>
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <h4 style={{ marginTop: "1rem" }}>Popular Items</h4>
              <div className="quick-menu-preview">
                {MENU_CATEGORIES.slice(0, 4).map((category) =>
                  category.items.slice(0, 1).map((item, idx) => {
                    const [name, price] = item.split(" – ");
                    return (
                      <div key={idx} className="menu-preview-item">
                        <span className="menu-preview-name">{name.substring(0, 18)}</span>
                        <span className="menu-preview-price">{price}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Bottom */}
          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={itemVariants}
          >
            <div className="copyright">
              <span>© 2024 BhagyaLakshmi Snacks Corner</span>
              <span>✦</span>
              <span>All Rights Reserved</span>
            </div>
            <div className="payment-methods">
              <span>💳</span>
              <span>📱</span>
              <span>🍔</span>
              <span>🏷️</span>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}