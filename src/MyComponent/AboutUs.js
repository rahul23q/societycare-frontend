import React from 'react';
import { 
  Target, 
  Users, 
  ShieldCheck, 
  Award, 
  Building2, 
  Heart 
} from "lucide-react";

export default function AboutUs() {
  const themeTeal = "#2a9d8f";
  const themeDark = "#1a1d23";

  return (
    <div className="bg-white">
      {/* --- Hero Section --- */}
      <section 
        className="py-5 text-white text-center" 
        style={{ background: `linear-gradient(135deg, ${themeTeal} 0%, #1a5d54 100%)`, borderRadius: '0 0 50px 50px' }}
      >
        <div className="container py-5">
          <div className="badge bg-white bg-opacity-20 mb-3 px-3 py-2 rounded-pill">Our Mission</div>
          <h1 className="display-4 fw-bold mb-3">Building the Future of <br/>Society Management</h1>
          <p className="lead mx-auto opacity-75" style={{ maxWidth: '700px' }}>
            SocietyCare was born out of a simple idea: that managing a housing society shouldn't be a full-time job. We are dedicated to making residential living seamless, transparent, and digital.
          </p>
        </div>
      </section>

      {/* --- Values Section --- */}
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Values that drive us</h2>
            <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: themeTeal }}></div>
          </div>
          
          <div className="row g-4">
            {[
              { 
                icon: ShieldCheck, 
                title: "Unmatched Security", 
                desc: "We treat your financial and personal data with bank-grade encryption and privacy standards." 
              },
              { 
                icon: Heart, 
                title: "Resident First", 
                desc: "Every feature we build is designed to make life easier for the people living in the society." 
              },
              { 
                icon: Target, 
                title: "Absolute Transparency", 
                desc: "No more hidden ledgers. Every rupee collected and spent is visible to authorized members." 
              }
            ].map((value, i) => (
              <div key={i} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-4 text-center" style={{ borderRadius: '24px' }}>
                  <div className="mx-auto mb-3 p-3 rounded-circle" style={{ backgroundColor: '#eff6f5', width: '70px' }}>
                    <value.icon size={30} style={{ color: themeTeal }} />
                  </div>
                  <h5 className="fw-bold">{value.title}</h5>
                  <p className="text-secondary small mb-0">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- The Story Section --- */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="p-2 rounded-4 shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80" 
                  alt="Modern Building" 
                  className="img-fluid rounded-4"
                />
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5">
              <h2 className="fw-bold mb-4">Why SocietyCare?</h2>
              <p className="text-secondary">
                For years, housing societies have relied on manual registers, paper receipts, and physical collection boxes. This led to errors, disputes, and massive delays in maintenance.
              </p>
              <p className="text-secondary">
                We built <strong>SocietyCare</strong> to bridge the gap between administrators and residents. Today, over 500+ societies use our platform to collect ₹10Cr+ in maintenance fees every month.
              </p>
              <div className="d-flex gap-4 mt-4">
                <div>
                  <h4 className="fw-bold mb-0" style={{ color: themeTeal }}>500+</h4>
                  <p className="small text-secondary">Societies</p>
                </div>
                <div className="border-start ps-4">
                  <h4 className="fw-bold mb-0" style={{ color: themeTeal }}>50k+</h4>
                  <p className="small text-secondary">Residents</p>
                </div>
                <div className="border-start ps-4">
                  <h4 className="fw-bold mb-0" style={{ color: themeTeal }}>99.9%</h4>
                  <p className="small text-secondary">Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-5 text-center">
        <div className="container py-4">
          <div className="card p-5 border-0 shadow-lg text-white" style={{ backgroundColor: themeDark, borderRadius: '30px' }}>
            <h2 className="fw-bold">Ready to digitize your society?</h2>
            <p className="opacity-75 mb-4">Join hundreds of societies already using SocietyCare.</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn px-4 py-2 fw-bold text-white" style={{ backgroundColor: themeTeal, borderRadius: '10px' }}>
                Get Started
              </button>
              <button className="btn btn-outline-light px-4 py-2 fw-bold" style={{ borderRadius: '10px' }}>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}