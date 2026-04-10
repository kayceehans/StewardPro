"use client";
import React, { useState, useEffect, useMemo } from 'react';

export default function Dashboard() {
  const [name, setName] = useState("Alex");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({ title: '',amount:'0', status: 'Active' });
  const [tableData, setTableData] = useState([
    { id: 1, title: "Initial Task",amount:'10', status: "Active" },
    { id: 2, title: "System Update",amount:'20', status: "Pending" },
  ]);

  const itemsPerPage = 5;

  // Handle Responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter and Search Logic
  const filteredData = useMemo(() => {
    return tableData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || item.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [tableData, search, filter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSubmit = (e: React.FormEvent) => {      
    e.preventDefault();
    if (!formData.title) return;
    setTableData([{ id: Date.now(), ...formData }, ...tableData]);
    setFormData({ title: '',amount:'0', status: 'Active' });
  };

  // Inline Styles
  const styles: Record<string, React.CSSProperties> = {
    container: {
      padding: isMobile ? '10px' : '20px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      paddingBottom: '10px',
      borderBottom: '1px solid #e5e7eb'
    },
    card: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    },
    input: {
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      marginRight: '10px',
      marginBottom: isMobile ? '10px' : '0',
      width: isMobile ? '100%' : 'auto'
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px'
    },
    th: {
      textAlign: 'left',
      padding: '12px',
      backgroundColor: '#f3f4f6',
      borderBottom: '2px solid #e5e7eb'
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #e5e7eb'
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <header style={styles.header}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard</h1>
        <div style={{ fontWeight: '500' }}>Welcome, <span style={{ color: '#2563eb' }}>{name}</span></div>
      </header>

      {/* Form Section */}
      <section style={styles.card}>
        <h2 style={{ marginBottom: '15px' }}>Add New Entry</h2>
        <form onSubmit={handleSubmit} style={{ display: isMobile ? 'block' : 'flex' }}>
          <input
            style={styles.input}
            placeholder="Entry Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
          <select
            style={styles.input}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
          <button type="submit" style={styles.button}>Add Entry</button>
        </form>
      </section>

      {/* Table Section with Search & Filter */}
      <section style={styles.card}>
        <div style={{ display: isMobile ? 'block' : 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <input
            style={styles.input}
            placeholder="Search entries..."
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
          <select
            style={styles.input}
            onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td style={styles.td}>{item.id}</td>
                  <td style={styles.td}>{item.title}</td>
                  <td style={styles.td}>{item.amount}</td>
                  <td style={styles.td}>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                ...styles.button,
                backgroundColor: currentPage === i + 1 ? '#2563eb' : '#d1d5db',
                color: currentPage === i + 1 ? 'white' : 'black'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
