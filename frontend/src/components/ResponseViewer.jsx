import React from 'react';

const ResponseViewer = ({ response, onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>📦 Response Data</h3>
        <pre style={styles.pre}>
          {typeof response === 'string'
            ? response
            : JSON.stringify(response, null, 2)}
        </pre>
        <button onClick={onClose} style={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxHeight: '80%',
    overflowY: 'auto',
  },
  pre: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '4px',
  },
  closeBtn: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ResponseViewer;
