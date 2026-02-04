import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URL with sorting parameter to retrieve the most recent results first.
  const API_URL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?sort=-record_date";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados da API');
        }
        const json = await response.json();
        setRates(json.data.slice(0, 20)); // Limiting it to the first 20 results.
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loader">Loading data from API...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <img src="treasury.png" height='150' />
      <h1>Average Interest Rates (U.S. Treasury)</h1>
      <p>Official data from the U.S. Treasury Department <strong>FREE API</strong></p>
      
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Treasury Description</th>
            <th>Average Rate</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((item, index) => (
            <tr key={index}>
              <td>{item.record_date}</td>
              <td>{item.security_desc}</td>
              <td>{parseFloat(item.avg_interest_rate_amt).toFixed(3)} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;