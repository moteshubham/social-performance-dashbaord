import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);
import './BrandChart.css';

export default function BrandChart({ brands }) {
  // prepare data: x = handle, y = followers
  const labels = brands.map(b => b.handle);
  const data = {
    labels,
    datasets: [
      {
        label: 'Followers',
        data: brands.map(b => b.last_followers || 0),
      },
      {
        label: 'Public repos',
        data: brands.map(b => b.last_public_repos || 0),
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Brand metrics snapshot' },
      legend: { position: 'top' },
    },
  };

  return (
    <div className="card brand-chart-card">
      <h3>Overview</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
