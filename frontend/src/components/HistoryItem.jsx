import React from 'react';

const HistoryItem = ({ data }) => (
  <div className="history-item" style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
    <p><strong>Method:</strong> {data.method}</p>
    <p><strong>URL:</strong> {data.url}</p>
    <p><strong>Status:</strong> {data.statusCode}</p>
    <p><strong>Time:</strong> {new Date(data.timestamp).toLocaleString()}</p>
    <p><strong>Response Time:</strong> {data.responseTime}ms</p>
  </div>
);

export default HistoryItem;
