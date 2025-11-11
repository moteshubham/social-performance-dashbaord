import React, { useState } from 'react';
import BrandsTable from './components/BrandsTable.jsx';
import BrandChart from './components/BrandChart.jsx';

export default function App(){
  const [brands, setBrands] = useState([]);

  return (
    <div className="container">
      <div className="header">
        <h1>Social Performance Dashboard</h1>
        <div className="small">Demo: GitHub as social platform</div>
      </div>

      <BrandsTable onDataUpdate={setBrands} />
      <BrandChart brands={brands} />
    </div>
  );
}
