import React from 'react';

const FeaturesSection = () => {
  // Array containing the feature data from your image
  const features = [
    { title: 'Online Payments', desc: 'Accept payments via credit cards, debit cards, UPI, and net banking with Stripe integration.', icon: '💳' },
    { title: 'Auto Bill Generation', desc: 'Generate monthly maintenance bills automatically with customizable breakups for each flat.', icon: '📄' },
    { title: 'Resident Management', desc: 'Manage all residents, owners, and tenants with complete flat-wise records.', icon: '👥' },
    { title: 'Smart Reminders', desc: 'Send automated payment reminders via email to residents before and after due dates.', icon: '🔔' },
    { title: 'Analytics Dashboard', desc: 'Track collections, pending dues, and financial health with real-time insights.', icon: '📊' },
    { title: 'Secure & Private', desc: 'Bank-grade encryption ensures all financial data and personal information stays protected.', icon: '🛡️' },
    { title: 'Mobile Friendly', desc: 'Access your dashboard and make payments from any device, anywhere, anytime.', icon: '📱' },
    { title: 'Payment History', desc: 'Complete transaction history with downloadable receipts and invoices.', icon: '🕒' }
  ];

  const styles = {
    sectionBg: {
      backgroundColor: '#f8fafc', // Light gray background to contrast with the dark hero
      padding: '100px 0'
    },
    badge: {
      backgroundColor: '#d1e7e5',
      color: '#2a9d8f',
      fontSize: '0.85rem',
      fontWeight: '600',
      padding: '6px 16px'
    },
    card: {
      border: '1px solid #e2e8f0',
      borderRadius: '24px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      height: '100%',
      padding: '30px',
      backgroundColor: '#ffffff'
    },
    iconBox: {
      width: '50px',
      height: '50px',
      backgroundColor: '#eff6f5',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      marginBottom: '20px'
    }
  };

  return (
    <section style={styles.sectionBg} id='features'>
      <div className="container text-center">
        {/* Header Section */}
        <span className="badge rounded-pill mb-3" style={styles.badge}>Features</span>
        <h2 className="fw-bold mb-3" style={{ color: '#0f172a', fontSize: '2.5rem' }}>
          Everything You Need to Manage Your Society
        </h2>
        <p className="mx-auto mb-5 text-secondary" style={{ maxWidth: '700px', fontSize: '1.1rem' }}>
          A comprehensive platform designed for modern housing societies with powerful tools for admins and simple experience for residents.
        </p>

        {/* Features Grid */}
        <div className="row g-4 text-start">
          {features.map((f, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <div 
                style={styles.card} 
                className="feature-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={styles.iconBox}>{f.icon}</div>
                <h5 className="fw-bold mb-3" style={{ color: '#1e293b' }}>{f.title}</h5>
                <p className="text-secondary small leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;