'use client'; // Required for App Router if using state

import React, { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  // Inline Style Objects
  const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center', // Horizontal centering
  alignItems: 'center',     // Vertical centering
  minHeight: '100vh',       // Full height of the viewport
  backgroundColor: '#f3f4f6',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  margin: 0,                // Removes default browser padding/margin
};

  const cardStyle: React.CSSProperties = {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#1f2937',
  };

  const inputGroupStyle: React.CSSProperties = {
    marginBottom: '1rem',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    color: '#4b5563',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    boxSizing: 'border-box', // Crucial for padding
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1rem',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>StewardPro</h2>
        <h2 style={titleStyle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle} 
              placeholder="you@example.com" 
              required 
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle} 
              placeholder="••••••••" 
              required 
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
