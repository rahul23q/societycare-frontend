import React, { useState, useEffect } from 'react';

// Counter logic that handles "0" gracefully
const DynamicCounter = ({ endValue, isLive = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // If we aren't in "Live Mode" or the value is 0, just stay at 0
    if (!isLive || endValue === 0) {
      setCount(0);
      return;
    }

    let start = 0;
    const end = parseInt(endValue.toString().replace(/\D/g, ''));
    const duration = 2000;
    let timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [endValue, isLive]);

  const suffix = endValue.toString().replace(/[0-9.]/g, '');
  return <span>{count}{suffix}</span>;
};

const HeroSection = () => {
  // Set this to 'true' when you want to show the animation/actual numbers
  // Set to 'false' while you are still developing to show the "Starting State"
  const [isLive, setIsLive] = useState(false); 

  const stats = [
    { label: 'Societies', value: '0' },
    { label: 'Residents', value: '0' },
    { label: 'Collected', value: '₹0' },
    { label: 'Uptime', value: '100%' }
  ];

  return (
    <div className="text-white vh-100 d-flex align-items-center" 
         style={{ background: 'radial-gradient(circle at center, #2d8a7d 0%, #1a5d54 100%)' }}>
      <div className="container text-center">
        
        <h1 className="display-4 fw-bold mb-4">
          Building the Future of <br />
          <span style={{ color: '#ff8a65' }}>Society Management</span>
        </h1>

        {/* Stats Grid */}
        <div className="row g-4 justify-content-center mt-5">
          {stats.map((stat, index) => (
            <div className="col-6 col-md-3" key={index}>
              <div className="p-4 h-100" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                borderRadius: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <h2 className="fw-bold display-6 mb-1">
                  <DynamicCounter endValue={stat.value} isLive={isLive} />
                </h2>
                <p className="text-white-50 small mb-0">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Developer Toggle (Only for your testing) */}
        <div className="mt-5">
          <button 
            className="btn btn-sm btn-outline-light opacity-50"
            onClick={() => setIsLive(!isLive)}
          >
            Debug: {isLive ? "Switch to Real Stats (0)" : "Simulate Growth"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;