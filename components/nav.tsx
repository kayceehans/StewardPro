"use client";
import React, { useState, useEffect, useMemo } from 'react';

export default function nav() {
  const styles: Record<string, React.CSSProperties> = {
     layout: {
       display: 'flex',
       flexDirection: 'column',
       minHeight: '100vh',
       backgroundColor: '#f3f4f6',
       fontFamily: 'system-ui, sans-serif',
     },
     nav: {
       display: 'flex',
       justifyContent: 'space-between',
       alignItems: 'center',
      // padding: isMobile ? '10px 15px' : '15px 40px',
       backgroundColor: '#ffffff',
       boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
       position: 'sticky',
       top: 0,
       zIndex: 100,
       //flexWrap: isMobile ? 'wrap' : 'nowrap',
       gap: '10px'
     },
     navLinks: {
       display: 'flex',
       gap: '20px',
       listStyle: 'none',
       margin: 0,
       padding: 0,
       fontSize: '0.9rem',
       //order: isMobile ? 3 : 2,
       //width: isMobile ? '100%' : 'auto',
      // justifyContent: isMobile ? 'center' : 'flex-start'
     },
     link: {
       textDecoration: 'none',
       color: '#4b5563',
       fontWeight: '500',
       cursor: 'pointer'
     },
     dashboardContent: {
       //padding: isMobile ? '15px' : '30px 40px',
       maxWidth: '1200px',
       margin: '0 auto',
       width: '100%'
     },
     card: {
       backgroundColor: 'white',
       padding: '20px',
       borderRadius: '12px',
       boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
       marginBottom: '25px'
     },
     input: {
       padding: '10px',
       borderRadius: '8px',
       border: '1px solid #d1d5db',
       marginRight: '10px',
      // marginBottom: isMobile ? '10px' : '0',
       //width: isMobile ? '100%' : 'auto'
     },
     button: {
       padding: '10px 20px',
       backgroundColor: '#2563eb',
       color: 'white',
       border: 'none',
       borderRadius: '8px',
       cursor: 'pointer',
       fontWeight: '600'
     },
     table: { width: '100%', borderCollapse: 'collapse' },
     th: { textAlign: 'left', padding: '12px', borderBottom: '2px solid #f3f4f6', color: '#6b7280' },
     td: { padding: '12px', borderBottom: '1px solid #f3f4f6' }
   };

 const name = 'Pastor Femi'
  return (
    <div style={styles.container}>
    {/* TOP NAVIGATION LAYOUT */}
      <nav style={styles.nav}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#111827' }}>
          Steward Pro
        </div>

        <ul style={styles.navLinks}>
          <li><a href="/finance" style={styles.link}>Service Seeds Record</a></li>
          <li><a href="/mydashboard" style={styles.link}>Sermon Form</a></li>
          <li ><a href="/" style={styles.link}><span style={{ fontWeight: 'bold', color: '#eb1e1e' }}>Log out</span></a></li>
        </ul>

        <div style={{ fontSize: '0.9rem', color: '#374151', order: 2 }}>
          Welcome, <span style={{ fontWeight: 'bold', color: '#2563eb' }}>{name}</span>
        </div>
      </nav>
    </div>
  );
}

