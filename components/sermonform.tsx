import React from 'react';

const ExpandedSermonForm: React.FC = () => {
  // Inline CSS styles object
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      gap: '32px',
    },
    formSection: {
      width: '100%',
      maxWidth: '1400px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    displaySection: {
      width: '100%',
      maxWidth: '1400px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#1f2937',
      borderLeft: '4px solid #4f46e5',
      paddingLeft: '12px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      overflow: 'hidden',
      fontSize: '13px',
    },
    th: {
      backgroundColor: '#4f46e5',
      color: '#ffffff',
      padding: '10px 12px',
      textAlign: 'left' as const,
      fontSize: '13px',
      fontWeight: '600',
      borderBottom: '2px solid #e5e7eb',
      whiteSpace: 'nowrap' as const,
    },
    td: {
      padding: '10px 12px',
      textAlign: 'left' as const,
      borderBottom: '1px solid #e5e7eb',
      color: '#374151',
      fontSize: '13px',
    },
    input: {
      width: '100%',
      padding: '6px 10px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '13px',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box' as const,
    },
    datetimeInput: {
      width: '100%',
      padding: '6px 10px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '13px',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box' as const,
      fontFamily: 'inherit',
    },
    numberInput: {
      width: '100%',
      padding: '6px 10px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '13px',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box' as const,
      textAlign: 'right' as const,
    },
    addButton: {
      backgroundColor: '#4f46e5',
      color: '#ffffff',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      marginTop: '16px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '16px',
      gap: '12px',
    },
    headerRow: {
      backgroundColor: '#f9fafb',
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '40px',
      color: '#9ca3af',
      fontSize: '14px',
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
      padding: '4px 12px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
    actionCell: {
      padding: '10px 12px',
      textAlign: 'center' as const,
      borderBottom: '1px solid #e5e7eb',
    },
    subHeader: {
      backgroundColor: '#6366f1',
      color: '#ffffff',
      padding: '8px 12px',
      textAlign: 'center' as const,
      fontSize: '12px',
      fontWeight: '500',
    },
  };

  // Define the structure for form rows
  interface FormRow {
    date: string;
    typeOfService: string;
    message: string;
    bibleText: string;
    speaker: string;
    men: string;
    women: string;
    children: string;
    totalVirtualService: string;
    sundaySchool: string;
    newConverts: string;
    guests: string;
  }

  // Define the structure for submitted data
  interface SubmittedRecord extends FormRow {}

  // State for form rows
  const [rows, setRows] = React.useState<FormRow[]>([
    {
      date: '',
      typeOfService: '',
      message: '',
      bibleText: '',
      speaker: '',
      men: '',
      women: '',
      children: '',
      totalVirtualService: '',
      sundaySchool: '',
      newConverts: '',
      guests: '',
    },
  ]);

  // State for submitted data
  const [submittedData, setSubmittedData] = React.useState<SubmittedRecord[]>(
    []
  );

  // Get current datetime for local datetime-local input
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Format datetime for display
  const formatDateTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return '—';
    try {
      const date = new Date(dateTimeStr);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return dateTimeStr;
    }
  };

  // Handle input change
  const handleInputChange = (
    index: number,
    field: keyof FormRow,
    value: string
  ) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
  };

  // Add new row to form
  const addRow = () => {
    setRows([
      ...rows,
      {
        date: '',
        typeOfService: '',
        message: '',
        bibleText: '',
        speaker: '',
        men: '',
        women: '',
        children: '',
        totalVirtualService: '',
        sundaySchool: '',
        newConverts: '',
        guests: '',
      },
    ]);
  };

  // Submit all rows to the display table
  const submitAllRows = () => {
    const validRows = rows.filter(
      (row) =>
        row.date.trim() !== '' ||
        row.typeOfService.trim() !== '' ||
        row.message.trim() !== '' ||
        row.bibleText.trim() !== '' ||
        row.speaker.trim() !== ''
    );

    if (validRows.length > 0) {
      setSubmittedData([...submittedData, ...validRows]);
      // Reset form with one empty row
      setRows([
        {
          date: '',
          typeOfService: '',
          message: '',
          bibleText: '',
          speaker: '',
          men: '',
          women: '',
          children: '',
          totalVirtualService: '',
          sundaySchool: '',
          newConverts: '',
          guests: '',
        },
      ]);
    }
  };

  // Delete a row from the display table
  const deleteRow = (index: number) => {
    const updatedData = [...submittedData];
    updatedData.splice(index, 1);
    setSubmittedData(updatedData);
  };

  // Clear all data from display table
  const clearAll = () => {
    setSubmittedData([]);
  };

  // Calculate totals for display table
  const calculateTotals = () => {
    const totals = {
      men: 0,
      women: 0,
      children: 0,
      totalVirtualService: 0,
      sundaySchool: 0,
      newConverts: 0,
      guests: 0,
    };

    submittedData.forEach((record) => {
      totals.men += parseInt(record.men) || 0;
      totals.women += parseInt(record.women) || 0;
      totals.children += parseInt(record.children) || 0;
      totals.totalVirtualService += parseInt(record.totalVirtualService) || 0;
      totals.sundaySchool += parseInt(record.sundaySchool) || 0;
      totals.newConverts += parseInt(record.newConverts) || 0;
      totals.guests += parseInt(record.guests) || 0;
    });
    return totals;
  };

  const totals = calculateTotals();

  return (
    <div style={styles.container}>
      {/* Form Section */}
      <div style={styles.formSection}>
        <div style={styles.sectionTitle}>📝 Church Service Report Form</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th} rowSpan={2}>
                  DATE & TIME
                </th>
                <th style={styles.th} rowSpan={2}>
                  TYPE OF SERVICE
                </th>
                <th style={styles.th} rowSpan={2}>
                  MESSAGE
                </th>
                <th style={styles.th} rowSpan={2}>
                  BIBLE TEXT
                </th>
                <th style={styles.th} rowSpan={2}>
                  SPEAKER
                </th>
                <th style={styles.th} colSpan={7}>
                  ATTENDANCE STATISTICS
                </th>
                </tr>
              <tr>
                <th style={styles.subHeader}>MEN</th>
                <th style={styles.subHeader}>WOMEN</th>
                <th style={styles.subHeader}>CHILDREN</th>
                <th style={styles.subHeader}>TOTAL VIRTUAL SERVICE</th>
                <th style={styles.subHeader}>SUNDAY SCHOOL</th>
                <th style={styles.subHeader}>NEW CONVERTS</th>
                <th style={styles.subHeader}>GUESTS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td style={styles.td}>
                    <input
                      type="datetime-local"
                      value={row.date}
                      onChange={(e) =>
                        handleInputChange(index, 'date', e.target.value)
                      }
                      style={styles.datetimeInput}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#4f46e5';
                        e.currentTarget.style.boxShadow =
                          '0 0 0 2px rgba(79, 70, 229, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="text"
                      placeholder="e.g., Sunday Service"
                      value={row.typeOfService}
                      onChange={(e) =>
                        handleInputChange(index, 'typeOfService', e.target.value)
                      }
                      style={styles.input}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#4f46e5';
                        e.currentTarget.style.boxShadow =
                          '0 0 0 2px rgba(79, 70, 229, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="text"
                      placeholder="Sermon title"
                      value={row.message}
                      onChange={(e) =>
                        handleInputChange(index, 'message', e.target.value)
                      }
                      style={styles.input}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#4f46e5';
                        e.currentTarget.style.boxShadow =
                          '0 0 0 2px rgba(79, 70, 229, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="text"
                      placeholder="e.g., John 3:16"
                      value={row.bibleText}
                      onChange={(e) =>
                        handleInputChange(index, 'bibleText', e.target.value)
                      }
                      style={styles.input}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#4f46e5';
                        e.currentTarget.style.boxShadow =
                          '0 0 0 2px rgba(79, 70, 229, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="text"
                      placeholder="Speaker name"
                      value={row.speaker}
                      onChange={(e) =>
                        handleInputChange(index, 'speaker', e.target.value)
                      }
                      style={styles.input}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#4f46e5';
                        e.currentTarget.style.boxShadow =
                          '0 0 0 2px rgba(79, 70, 229, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      placeholder="0"
                      value={row.men}
                      onChange={(e) =>
                        handleInputChange(index, 'men', e.target.value)
                      }
                      style={styles.numberInput}
                      min="0"
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      placeholder="0"
                      value={row.women}
                      onChange={(e) =>
                        handleInputChange(index, 'women', e.target.value)
                      }
                      style={styles.numberInput}
                      min="0"
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      placeholder="0"
                      value={row.children}
                      onChange={(e) =>
                        handleInputChange(index, 'children', e.target.value)
                      }
                      style={styles.numberInput}
                      min="0"
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      placeholder="0"
                      value={row.totalVirtualService}
                      onChange={(e) =>
                        handleInputChange(index, 'totalVirtualService', e.target.value)
                      }
                      style={styles.numberInput}
                      min="0"
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      placeholder="0"
                      value={row.sundaySchool}
                      onChange={(e) =>
                        handleInputChange(index, 'sundaySchool', e.target.value)
                      }
                      style={styles.numberInput}
                      min="0"
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      placeholder="0"
                      value={row.newConverts}
                      onChange={(e) =>
                        handleInputChange(index, 'newConverts', e.target.value)
                      }
                      style={styles.numberInput}
                      min="0"
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      placeholder="0"
                      value={row.guests}
                      onChange={(e) =>
                        handleInputChange(index, 'guests', e.target.value)
                      }
                      style={styles.numberInput}
                      min="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={styles.buttonContainer}>
          <button
            style={styles.addButton}
            onClick={addRow}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4338ca';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4f46e5';
            }}
          >
            + Add Row
          </button>
          <button
            style={{ ...styles.addButton, backgroundColor: '#10b981' }}
            onClick={submitAllRows}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#059669';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#10b981';
            }}
          >
            ✓ Submit All
          </button>
        </div>
      </div>

      {/* Display Section */}
      <div style={styles.displaySection}>
        <div style={styles.sectionTitle}>
          📊 Submitted Church Reports
          {submittedData.length > 0 && (
            <button
              style={{
                ...styles.deleteButton,
                backgroundColor: '#6b7280',
                marginLeft: '12px',
                padding: '4px 12px',
              }}
              onClick={clearAll}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4b5563';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#6b7280';
              }}
            >
              Clear All
            </button>
          )}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th} rowSpan={2}>
                  DATE & TIME
                </th>
                <th style={styles.th} rowSpan={2}>
                  TYPE OF SERVICE
                </th>
                <th style={styles.th} rowSpan={2}>
                  MESSAGE
                </th>
                <th style={styles.th} rowSpan={2}>
                  BIBLE TEXT
                </th>
                <th style={styles.th} rowSpan={2}>
                  SPEAKER
                </th>
                <th style={styles.th} colSpan={7}>
                  ATTENDANCE STATISTICS
                </th>
                <th style={styles.th} rowSpan={2}>
                  ACTION
                </th>
              </tr>
              <tr>
                <th style={styles.subHeader}>MEN</th>
                <th style={styles.subHeader}>WOMEN</th>
                <th style={styles.subHeader}>CHILDREN</th>
                <th style={styles.subHeader}>TOTAL VIRTUAL SERVICE</th>
                <th style={styles.subHeader}>SUNDAY SCHOOL</th>
                <th style={styles.subHeader}>NEW CONVERTS</th>
                <th style={styles.subHeader}>GUESTS</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.length === 0 ? (
                <tr>
                  <td colSpan={14} style={styles.emptyState}>
                    No church records yet. Fill out the form above and click "Submit All" to add records.
                  </td>
                </tr>
              ) : (
                <>
                  {submittedData.map((record, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{formatDateTime(record.date)}</td>
                      <td style={styles.td}>{record.typeOfService || '—'}</td>
                      <td style={styles.td}>{record.message || '—'}</td>
                      <td style={styles.td}>{record.bibleText || '—'}</td>
                      <td style={styles.td}>{record.speaker || '—'}</td>
                      <td style={styles.td}>{record.men || '0'}</td>
                      <td style={styles.td}>{record.women || '0'}</td>
                      <td style={styles.td}>{record.children || '0'}</td>
                      <td style={styles.td}>{record.totalVirtualService || '0'}</td>
                      <td style={styles.td}>{record.sundaySchool || '0'}</td>
                      <td style={styles.td}>{record.newConverts || '0'}</td>
                      <td style={styles.td}>{record.guests || '0'}</td>
                      <td style={styles.actionCell}>
                        <button
                          style={styles.deleteButton}
                          onClick={() => deleteRow(index)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#dc2626';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ef4444';
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Totals Row */}
                  <tr style={{ backgroundColor: '#f3f4f6', fontWeight: 'bold' }}>
                    <td colSpan={5} style={{ ...styles.td, fontWeight: 'bold', textAlign: 'right' }}>
                      TOTALS:
                    </td>
                    <td style={{ ...styles.td, fontWeight: 'bold', backgroundColor: '#e0e7ff' }}>
                      {totals.men}
                    </td>
                    <td style={{ ...styles.td, fontWeight: 'bold', backgroundColor: '#e0e7ff' }}>
                      {totals.women}
                    </td>
                    <td style={{ ...styles.td, fontWeight: 'bold', backgroundColor: '#e0e7ff' }}>
                      {totals.children}
                    </td>
                    <td style={{ ...styles.td, fontWeight: 'bold', backgroundColor: '#e0e7ff' }}>
                      {totals.totalVirtualService}
                    </td>
                    <td style={{ ...styles.td, fontWeight: 'bold', backgroundColor: '#e0e7ff' }}>
                      {totals.sundaySchool}
                    </td>
                    <td style={{ ...styles.td, fontWeight: 'bold', backgroundColor: '#e0e7ff' }}>
                      {totals.newConverts}
                    </td>
                    <td style={{ ...styles.td, fontWeight: 'bold', backgroundColor: '#e0e7ff' }}>
                      {totals.guests}
                    </td>
                    <td style={styles.actionCell} />
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        {submittedData.length > 0 && (
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280', textAlign: 'right' }}>
            Total Records: {submittedData.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandedSermonForm;