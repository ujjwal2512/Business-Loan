//Used tailwind for minimum styling
//Code by -Ujjwal Lal

import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [businessName, setBusinessName] = useState('');
  const [yearEstablished, setYearEstablished] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [accountingProvider, setAccountingProvider] = useState('Xero');
  const [preAssessment, setPreAssessment] = useState(20);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/submit-application', {
        businessName,
        yearEstablished,
        loanAmount,
        accountingProvider
      });

      setPreAssessment(response.data.preAssessment);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="content-center">
      <h1 className='font-bold p-2 text-2xl'>Business Loan Application</h1>
      <form onSubmit={handleSubmit}>
        <label className='p-2 font-bold text-lg'>
          Business Name:
          <input className='border-black border-2 m-2' type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
        </label>
        <br />
        <label className='p-2 font-bold text-lg'>
          Year Established:
          <input className='border-black border-2 m-2' type="text" value={yearEstablished} onChange={(e) => setYearEstablished(e.target.value)} />
        </label>
        <br />
        <label className='p-2 font-bold text-lg'>
          Loan Amount:
          <input className='border-black border-2 m-2' type="text" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
        </label>
        <br />
        <label className='p-2 font-bold text-lg'>
          Accounting Provider:
          <select className='border-black border-2 m-2' value={accountingProvider} onChange={(e) => setAccountingProvider(e.target.value)}>
            <option value="Xero">Xero</option>
            <option value="MYOB">MYOB</option>
          </select>
        </label>
        <br />
        <button className='border-2 border-black rounded-full ... bg-green-300 m-2 p-2' type="submit">Submit Application</button>
      </form>
      <div>
        <p className='p-2 font-bold text-lg text-blue-800 '>Pre-Assessment Value: {preAssessment}</p>
      </div>
    </div>
  );
}

export default App;
