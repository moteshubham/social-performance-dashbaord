import React, { useEffect, useState } from 'react';
import { listBrands, createBrand, deleteBrand, fetchMetricsForBrand } from '../services/api';

export default function BrandsTable({ onDataUpdate }) {
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState({ name: '', platform: 'github', handle: '', notes: '' });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await listBrands();
      setBrands(data);
      onDataUpdate(data); // notify parent so chart can update
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.handle || !form.name) return;
    await createBrand(form);
    setForm({ name: '', platform: 'github', handle: '', notes: '' });
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this brand?')) return;
    await deleteBrand(id);
    load();
  };

  const handleFetchMetrics = async (id) => {
    setLoading(true);
    await fetchMetricsForBrand(id);
    await load();
    setLoading(false);
  };

  return (
    <div className="card">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <h3>Tracked Brands</h3>
        <div className="small">{loading ? 'Loading...' : ''}</div>
      </div>

      <form onSubmit={handleCreate} style={{ display:'flex', gap:8, marginBottom:12 }}>
        <input value={form.name} onChange={e=>setForm(s=>({...s, name:e.target.value}))} placeholder="Brand name" />
        <input value={form.handle} onChange={e=>setForm(s=>({...s, handle:e.target.value}))} placeholder="handle (github)" />
        <button className="button" type="submit">Add</button>
      </form>

      <table className="table">
        <thead>
          <tr><th>Name</th><th>Handle</th><th>Followers</th><th>Repos</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {brands.map(b => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td><a href={b.last_fetched_at ? `https://github.com/${b.handle}` : '#'} target="_blank" rel="noreferrer">{b.handle}</a></td>
              <td>{b.last_followers ?? '—'}</td>
              <td>{b.last_public_repos ?? '—'}</td>
              <td>
                <button className="button" onClick={()=>handleFetchMetrics(b.id)} style={{marginRight:8}}>Fetch</button>
                <button className="button" onClick={()=>handleDelete(b.id)} style={{background:'#999'}}>Delete</button>
              </td>
            </tr>
          ))}
          {brands.length === 0 && <tr><td colSpan="5" className="small">No brands added yet</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
