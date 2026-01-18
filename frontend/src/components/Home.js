import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Agrove</h1>
          <p className="hero-subtitle">
            Smart Farm Management for Modern Farmers
          </p>
          <p className="hero-description">
            Manage your fields, track activities, and make data-driven decisions
            with our comprehensive agricultural platform.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary"
              onClick={() => navigate(isLoggedIn ? "/dashboard" : "/login")}
            >
              {isLoggedIn ? "Go to Dashboard" : "Get Started"}
            </button>
            <button 
              className="btn-secondary"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="placeholder-image">🌾</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Agrove?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Field Management</h3>
            <p>
              Easily register and manage multiple fields with detailed
              information about crops, soil type, and area measurements.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Activity Logging</h3>
            <p>
              Track all farm activities from sowing to harvest with precise
              dates, quantities, and detailed notes for complete records.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Smart Advisory</h3>
            <p>
              Get tailored agricultural advice for your crops and soil types,
              with expert tips for pest management and fertilization.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Analytics & Insights</h3>
            <p>
              Visualize your farm data with interactive charts, yield analytics,
              and trends to optimize your farming operations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📥</div>
            <h3>Data Export</h3>
            <p>
              Export your farm records as CSV files for backup, reporting, and
              sharing with agricultural advisors.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>
              Access Agrove on any device - desktop, tablet, or mobile - for
              seamless farm management anywhere, anytime.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How Agrove Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register Your Fields</h3>
            <p>
              Create an account and register all your fields with details like
              area, crop type, and soil information.
            </p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Log Activities</h3>
            <p>
              Record all farm activities including sowing, irrigation,
              fertilization, and harvesting with timestamps.
            </p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Insights</h3>
            <p>
              View analytics dashboards showing crop distribution, activity
              timelines, and yield productivity metrics.
            </p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Optimize & Export</h3>
            <p>
              Export your data, review advisory content, and optimize your
              farming strategies for better yields.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Detailed */}
      <section className="key-features">
        <div className="feature-detail">
          <div className="detail-content">
            <h3>Complete Field Management</h3>
            <p>
              Organize all your fields in one place. Track field names, total
              area in hectares, main crops, and soil types. Create, edit, and
              delete fields as your farm operations evolve.
            </p>
            <ul>
              <li>Register multiple fields with unique characteristics</li>
              <li>Track total farm area and crop distribution</li>
              <li>Monitor soil types for targeted interventions</li>
              <li>Quick access to field-specific activities</li>
            </ul>
          </div>
          <div className="detail-image">🌱</div>
        </div>

        <div className="feature-detail">
          <div className="detail-image">📋</div>
          <div className="detail-content">
            <h3>Comprehensive Activity Logs</h3>
            <p>
              Document every important farming event from preparation to
              harvest. Track activities with dates, quantities, and detailed
              notes for complete operational records.
            </p>
            <ul>
              <li>Log sowing, irrigation, fertilization, and pest control</li>
              <li>Record harvest quantities and yields</li>
              <li>Filter activities by field or date range</li>
              <li>Maintain complete audit trail of farm operations</li>
            </ul>
          </div>
        </div>

        <div className="feature-detail">
          <div className="detail-content">
            <h3>Smart Agricultural Advisory</h3>
            <p>
              Access curated advisory content tailored to specific crops and soil
              types. Get expert guidance on crop care, pest indicators, and
              fertilization strategies.
            </p>
            <ul>
              <li>Browse crop-specific advisory content</li>
              <li>Get soil-type-specific recommendations</li>
              <li>Learn pest management best practices</li>
              <li>Access fertilization and irrigation guidelines</li>
            </ul>
          </div>
          <div className="detail-image">💡</div>
        </div>

        <div className="feature-detail">
          <div className="detail-image">📊</div>
          <div className="detail-content">
            <h3>Advanced Analytics Dashboard</h3>
            <p>
              Turn your farm data into actionable insights. View interactive
              charts showing crop distribution, activity trends, and yield
              analytics.
            </p>
            <ul>
              <li>Visualize crop area distribution with pie charts</li>
              <li>Track activity trends over time with line graphs</li>
              <li>Analyze yield productivity by crop</li>
              <li>Get key insights and recommendations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Transform Your Farm Management?</h2>
        <p>
          Join farmers who are using Agrove to streamline their operations and
          increase productivity.
        </p>
        <button 
          className="btn-large"
          onClick={() => navigate(isLoggedIn ? "/dashboard" : "/register")}
        >
          {isLoggedIn ? "Access Dashboard" : "Start Your Free Trial Today"}
        </button>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <h2>The Agrove Advantage</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <span className="benefit-number">+50%</span>
            <p>Time Saved on Record Keeping</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-number">+30%</span>
            <p>Productivity Improvement</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-number">100%</span>
            <p>Data Security & Privacy</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-number">24/7</span>
            <p>Access Your Farm Data</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <div className="cta-content">
          <h3>Start Managing Your Farm Better Today</h3>
          <p>No credit card required. Simple setup. Immediate results.</p>
          <button 
            className="btn-signup"
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/register")}
          >
            {isLoggedIn ? "Go to Dashboard" : "Create Account"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
