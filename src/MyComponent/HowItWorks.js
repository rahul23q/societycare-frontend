import React from 'react';

const HowItWorks = () => {
  const steps = [
    { 
      id: '01', 
      title: 'Register Your Society', 
      desc: 'Sign up as an admin and add your society details. Set up flats, blocks, and maintenance amounts.', 
      icon: '👤+' 
    },
    { 
      id: '02', 
      title: 'Add Residents', 
      desc: 'Invite residents to join via email. They can register and link their flats to their accounts.', 
      icon: '⚙️' 
    },
    { 
      id: '03', 
      title: 'Generate Bills', 
      desc: 'Create monthly bills automatically. Customize charges for maintenance, water, parking, and more.', 
      icon: '🚀' 
    },
    { 
      id: '04', 
      title: 'Collect Payments', 
      desc: 'Residents pay online securely. Track all payments in real-time with instant confirmations.', 
      icon: '💳' 
    }
  ];

  const theme = {
    teal: '#2a9d8f',
    lightTeal: '#eff6f5',
    badgeBg: '#d1e7e5'
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#ffffff' }} id='how-it-works'>
      <div className="container text-center py-5">
        
        {/* Section Header */}
        <div className="d-flex justify-content-center">
          <span className="badge rounded-pill mb-3" style={{ backgroundColor: theme.badgeBg, color: theme.teal, padding: '8px 16px' }}>
            How It Works
          </span>
        </div>
        <h2 className="fw-bold display-5 mb-3" style={{ color: '#0f172a' }}>Get Started in Minutes</h2>
        <p className="text-secondary mx-auto mb-5" style={{ maxWidth: '600px' }}>
          Simple setup process to get your society up and running with digital payments.
        </p>

        {/* Steps Grid */}
        <div className="row g-4 position-relative mt-4">
          
          {/* Connector Line (Shows only on Desktop) */}
          <div className="d-none d-lg-block position-absolute" style={{ 
            height: '2px', 
            backgroundColor: '#e2e8f0', 
            top: '30%', 
            left: '12%', 
            right: '12%', 
            zIndex: 0 
          }}></div>

          {steps.map((step, index) => (
            <div className="col-12 col-md-6 col-lg-3 position-relative" key={index} style={{ zIndex: 1 }}>
              
              {/* Number Badge */}
              <div className="mx-auto" style={{ 
                width: '42px', 
                height: '42px', 
                backgroundColor: theme.teal, 
                color: 'white', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                border: '4px solid white',
                position: 'relative',
                top: '20px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                {step.id}
              </div>

              {/* Card Container */}
              <div className="p-4 pt-5 h-100 bg-white" style={{ 
                border: '1px solid #e2e8f0', 
                borderRadius: '24px',
                transition: 'all 0.3s ease'
              }}>
                
                {/* Icon Box */}
                <div className="mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ 
                  width: '64px', 
                  height: '64px', 
                  backgroundColor: theme.teal, 
                  borderRadius: '16px',
                  color: 'white',
                  fontSize: '1.6rem'
                }}>
                  {step.icon}
                </div>

                <h5 className="fw-bold mb-3" style={{ color: '#1e293b' }}>{step.title}</h5>
                <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
                  {step.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;