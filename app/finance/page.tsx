"use client";
import React, { useState, useMemo } from 'react';
import  Nav from "@/components/nav"

// --- Types ---
interface CurrencyEntry {
  currency: string;
  tithe: string;
  offering: string;
  thanksgiving: string;
  welfare: string;
  projects: string;
  firstFruits: string;
  seed: string;
  vow: string;
  other: string;
}

interface ForeignEntry {
  type: string;
  amount: string;
}

// --- Initial Data ---
const CURRENCY_LABELS = ['Dollar','Euro','Naira','Other Currency'];

const INITIAL_ENTRIES: CurrencyEntry[] = CURRENCY_LABELS.map(curr => ({
  currency: curr, tithe: '', offering: '', thanksgiving: '', welfare: '', 
  projects: '', firstFruits: '', seed: '', vow: '', other: ''
}));

const INITIAL_FOREIGN: ForeignEntry[] = [
  { type: 'Dollar', amount: '' },
  { type: 'Euro', amount: '' },
  { type: 'Naira', amount: '' },
  { type: 'Other Currency', amount: '' }
];

export default function ParishFinancialRecord() {
  const [formData, setFormData] = useState({
    typeOfService: '',
    date: '',
    currencyEntries: INITIAL_ENTRIES,
    foreignCurrencies: INITIAL_FOREIGN,
  });

  const categories: (keyof Omit<CurrencyEntry, 'currency'>)[] = [
    'tithe', 'offering', 'thanksgiving', 'welfare', 'projects', 'firstFruits', 'seed', 'vow', 'other'
  ];

  // --- Calculations ---
  const columnTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    categories.forEach(cat => {
      totals[cat] = formData.currencyEntries.reduce((sum, row) => sum + (parseFloat(row[cat]) || 0), 0);
    });
    return totals;
  }, [formData.currencyEntries]);

  const grandTotal = Object.values(columnTotals).reduce((a, b) => a + b, 0);

  // --- Handlers ---
  const handleEntryChange = (index: number, field: keyof CurrencyEntry, value: string) => {
    if (value !== '' && isNaN(Number(value))) return;
    const updated = [...formData.currencyEntries];
    (updated[index][field] as string) = value;
    setFormData({ ...formData, currencyEntries: updated });
  };

  const handleForeignChange = (index: number, value: string) => {
    if (value !== '' && isNaN(Number(value))) return;
    const updated = [...formData.foreignCurrencies];
    updated[index].amount = value;
    setFormData({ ...formData, foreignCurrencies: updated });
  };

  const handleReset = () => {
    if (confirm("Clear all form data?")) {
      setFormData({ typeOfService: '', date: '', currencyEntries: INITIAL_ENTRIES, foreignCurrencies: INITIAL_FOREIGN });
    }
  };

  // --- Styles ---
  const tableHeader: React.CSSProperties = { border: '1px solid #004080', padding: '4px', fontSize: '10px', backgroundColor: '#f0f4f8', color: '#004080', textAlign: 'center', textTransform: 'uppercase' };
  const cell: React.CSSProperties = { border: '1px solid #004080', padding: '0' };
  const input: React.CSSProperties = { width: '100%', border: 'none', padding: '4px', outline: 'none', textAlign: 'right', fontSize: '12px', color: '#000' };
 // --- STYLES ---
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

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      {/* TOP NAVIGATION LAYOUT */}
       <Nav/>
      {/* Control Panel (Hidden on Print) */}
      <div className="no-print" style={{ display: 'flex', gap: '10px', marginBottom: '20px', background: '#f8f9fa', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <button onClick={() => window.print()} style={{ padding: '8px 16px', background: '#004080', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Print to PDF</button>
        <button onClick={handleReset} style={{ padding: '8px 16px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reset Data</button>
      </div>

      <style>{`@media print { .no-print { display: none !important; } body { padding: 0; } }`}</style>

      {/* Header Fields */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#004080', fontWeight: 'bold' }}>
        <div>TYPE OF SERVICE: <input type="text" value={formData.typeOfService} onChange={e => setFormData({...formData, typeOfService: e.target.value})} style={{ borderBottom: '1px solid #004080', borderTop: 'none', borderLeft: 'none', borderRight: 'none', width: '250px', outline: 'none' }} /></div>
        <div>DATE: <input type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ borderBottom: '1px solid #004080', borderTop: 'none', borderLeft: 'none', borderRight: 'none', width: '150px', outline: 'none' }} /></div>
      </div>

      {/* Main Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', color: '#004080', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeader} rowSpan={2}>Currency</th>
            <th style={tableHeader} rowSpan={2}>Tithe</th>
            <th style={tableHeader} rowSpan={2}>Offering</th>
            <th style={tableHeader} colSpan={7}>COLLECTION</th>
          </tr>
          <tr>
            {categories.slice(2).map(cat => <th key={cat} style={tableHeader}>{cat}</th>)}
          </tr>
        </thead>
        <tbody>
          {formData.currencyEntries.map((row, idx) => (
            <tr key={idx}>
              <td style={{ ...cell, padding: '4px', fontWeight: 'bold', fontSize: '11px' }}>{row.currency}</td>
              {categories.map(cat => (
                <td key={cat} style={cell}>
                  <input style={input} value={row[cat]} onChange={(e) => handleEntryChange(idx, cat, e.target.value)} />
                </td>
              ))}
            </tr>
          ))}
          <tr style={{ backgroundColor: '#f0f4f8', fontWeight: 'bold' }}>
            <td style={{ ...cell, padding: '6px' }}>TOTAL</td>
            {categories.map(cat => (
              <td key={cat} style={{ ...cell, textAlign: 'right', padding: '6px', fontSize: '12px' }}>
                {columnTotals[cat] > 0 ? columnTotals[cat].toFixed(2) : '-'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Lower Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Foreign Currency */}
        <div>
          <div style={{ background: '#004080', color: '#fff', padding: '6px', textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>FOREIGN CURRENCY COLLECTION</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#004080' }}>
            <thead>
              <tr><th style={tableHeader}>Type</th><th style={tableHeader}>Amount</th></tr>
            </thead>
            <tbody>
              {formData.foreignCurrencies.map((f, i) => (
                <tr key={i}>
                  <td style={{ ...cell, padding: '6px', fontSize: '12px' }}>{f.type}</td>
                  <td style={cell}><input style={input} value={f.amount} onChange={e => handleForeignChange(i, e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div>
          <div style={{ background: '#004080', color: '#fff', padding: '6px', textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>COLLECTION SUMMARY</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#004080' }}>
            <tbody>
              {categories.map((cat, i) => (
                <tr key={cat}>
                  <td style={{ ...cell, textAlign: 'center', width: '30px', fontSize: '11px' }}>{i + 1}</td>
                  <td style={{ ...cell, padding: '4px', textTransform: 'uppercase', fontSize: '11px' }}>{cat}</td>
                  <td style={{ ...cell, textAlign: 'right', padding: '4px', fontWeight: 'bold' }}>{columnTotals[cat].toFixed(2)}</td>
                </tr>
              ))}
              <tr style={{ background: '#f0f4f8' }}>
                <td colSpan={2} style={{ ...cell, padding: '8px', fontWeight: 'bold' }}>GRAND TOTAL</td>
                <td style={{ ...cell, textAlign: 'right', padding: '8px', fontWeight: 'bold', fontSize: '16px' }}>£{grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Officials Section */}
      <div style={{ marginTop: '30px' }}>
        <div style={{ background: '#004080', color: '#fff', padding: '6px', textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>USHERS, COUNTERS AND OTHER OFFICIALS</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeader}>NAME</th>
              <th style={tableHeader}>ROLE</th>
              <th style={tableHeader}>SIGNATURE</th>
              <th style={tableHeader}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map(i => (
              <tr key={i}>
                <td style={cell}><input style={input} /></td>
                <td style={cell}><input style={{ ...input, textAlign: 'center' }} placeholder={i === 3 ? "COUNTERSIGNING OFFICER" : ""} /></td>
                <td style={cell}><input style={input} /></td>
                <td style={cell}><input style={input} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
