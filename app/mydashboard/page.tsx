"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Nav from '@/components/nav'
import SermonForm
 from '@/components/sermonform';
export default function DashboardLayout() {
  // --- STATE & LOGIC (From previous step) ---
  const [name] = useState("Alex");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({ title: '', status: 'Active' });
  const [tableData, setTableData] = useState([
    { id: 1, title: "Initial Task", status: "Active" },
    { id: 2, title: "System Update", status: "Pending" },
  ]);

  const itemsPerPage = 5;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredData = useMemo(() => {
    return tableData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || item.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [tableData, search, filter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    setTableData([{ id: Date.now(), ...formData }, ...tableData]);
    setFormData({ title: '', status: 'Active' });
  };

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
      padding: isMobile ? '10px 15px' : '15px 40px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      gap: '10px'
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      fontSize: '0.9rem',
      order: isMobile ? 3 : 2,
      width: isMobile ? '100%' : 'auto',
      justifyContent: isMobile ? 'center' : 'flex-start'
    },
    link: {
      textDecoration: 'none',
      color: '#4b5563',
      fontWeight: '500',
      cursor: 'pointer'
    },
    dashboardContent: {
      padding: isMobile ? '15px' : '30px 40px',
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
      marginBottom: isMobile ? '10px' : '0',
      width: isMobile ? '100%' : 'auto'
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
    <div style={styles.layout}>      
       <Nav/>
      {/* DASHBOARD MAIN CONTENT */}
      <main style={styles.dashboardContent}>
        {/* Form Card */}       
         <SermonForm/>
        {/* Table Card */}              
      </main>
    </div>
  );
}
