import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const styles = {
    footerBg: {
      backgroundColor: '#0a1128', // Dark navy background from image
      color: '#ffffff',
      padding: '80px 0 30px 0'
    },
    logoBox: {
      backgroundColor: '#2a9d8f',
      padding: '6px',
      borderRadius: '8px',
      display: 'inline-flex',
      marginRight: '10px'
    },
    socialIcon: {
      width: '36px',
      height: '36px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textDecoration: 'none',
      transition: 'background 0.3s'
    },
    footerLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      fontSize: '0.95rem',
      marginBottom: '12px',
      display: 'block',
      transition: 'color 0.3s'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: '15px',
      fontSize: '0.95rem'
    }
  };

  return (
    <footer style={styles.footerBg}>
      <div className="container">
        <div className="row g-4">
          
          {/* Brand and Description */}
          <div className="col-12 col-lg-4 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-3">
              <div style={styles.logoBox}>
                <img src="https://img.icons8.com/ios-filled/22/ffffff/company.png" alt="logo" />
              </div>
              <span className="fw-bold fs-4">SocietyCare</span>
            </div>
            <p className="text-white-50 pe-lg-5" style={{ lineHeight: '1.6' }}>
              The complete solution for housing society maintenance management. 
              Simplify collections, track payments, and keep residents happy.
            </p>
            <div className="d-flex gap-2 mt-4">
              <a href="#" style={styles.socialIcon}><i className="bi bi-twitter-x"></i></a>
              <a href="#" style={styles.socialIcon}><i className="bi bi-facebook"></i></a>
              <a href="#" style={styles.socialIcon}><i className="bi bi-instagram"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold mb-4">Quick Links</h6>
            <a href="#" style={styles.footerLink}>Features</a>
            <a href="#" style={styles.footerLink}>How It Works</a>
            <a href="#" style={styles.footerLink}>Pricing</a>
            <a href="#" style={styles.footerLink}>Sign In</a>
          </div>

          {/* Support */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold mb-4">Support</h6>
            <a href="#" style={styles.footerLink}>Help Center</a>
            <a href="#" style={styles.footerLink}>Documentation</a>
            <a href="#" style={styles.footerLink}>Privacy Policy</a>
            <a href="#" style={styles.footerLink}>Terms of Service</a>
          </div>

          {/* Contact Us */}
          <div className="col-12 col-md-4 col-lg-4">
            <h6 className="fw-bold mb-4">Contact Us</h6>
            <div style={styles.contactItem}>
              <i className="bi bi-envelope text-info"></i>
              <span>rahuls232004@gmail.com</span>
            </div>
            <div style={styles.contactItem}>
              <i className="bi bi-telephone text-info"></i>
              <span>+91 9724221975</span>
            </div>
            <div style={styles.contactItem}>
              <i className="bi bi-geo-alt text-info"></i>
              <span>Silvassa, DNH, India</span>
            </div>
          </div>
        </div>

        <hr className="mt-5 mb-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        
        {/* Copyright */}
        <div className="text-center text-white-50 small">
          © {currentYear} SocietyCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;