import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RequestForm from './components/RequestForm'
import HistoryList from './components/HistoryList';

const App = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchHistory = async (pg = page) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/history?page=${pg}&limit=${limit}`);
      setRecords(res.data.records);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };


  useEffect(() => {
    fetchHistory();
  }, [page]);

  return (
    <div>
      <h1>REST Client</h1>
      <RequestForm onRequestSent={fetchHistory} />
      <HistoryList records={records} page={page} setPage={setPage} fetchHistory={fetchHistory} />
    </div>
  );
};

export default App;
