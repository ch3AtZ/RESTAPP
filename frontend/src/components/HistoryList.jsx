import React from 'react';
import HistoryItem from './HistoryItem';

const HistoryList = ({ records, page, setPage}) => {
  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div>
      <h2>Request History</h2>
      {records.length === 0 ? (
        <p>No history available</p>
      ) : (
        records.map((item, idx) => <HistoryItem key={idx} data={item} />)
      )}
      <div>
        <button onClick={prevPage} disabled={page <= 1}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};

export default HistoryList;
