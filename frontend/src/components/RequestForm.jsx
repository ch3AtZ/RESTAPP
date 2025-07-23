import React, { useState } from 'react';
import axios from 'axios';

const RequestForm = ({ onRequestSent }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/request', {
        method,
        url,
        body: body ? JSON.parse(body) : undefined,
      });
      
      onRequestSent();
    } catch (error) {
      /* alert(` ${error.response?.data?.error || error.message}`); */
    }
    finally {
        onRequestSent(); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        {['GET', 'POST', 'PUT', 'DELETE'].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      {(method !== 'GET' && method !== 'DELETE') && (
        <textarea
          placeholder="JSON Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '16px' }} 
        />
      )}
      <button type="submit">Send Request</button>
    </form>
  );
};

export default RequestForm;
