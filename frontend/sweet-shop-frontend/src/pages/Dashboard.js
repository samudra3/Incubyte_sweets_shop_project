import React, { useEffect, useState } from 'react';
import API from '../api/api';
import SweetList from '../components/Sweets/SweetList';
import Navbar from '../components/Header/Navbar';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [sweets, setSweets] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [lastPurchased, setLastPurchased] = useState(null);

  const isAdmin = user?.isAdmin || false;

  const fetchSweets = async () => {
    try {
      const res = await API.get('/sweets');
      setSweets(res.data);
    } catch (err) {
      alert('Failed to fetch sweets');
    }
  };

  const handlePurchase = async (id, quantity) => {
    try {
      const res = await API.post(`/sweets/${id}/purchase`, { quantity });
      const purchasedSweet = { ...res.data.sweet, purchasedQty: quantity, purchaseId: Date.now() };
      setPurchased((prev) => [...prev, purchasedSweet]);
      setLastPurchased(purchasedSweet.name);
      fetchSweets();

      setTimeout(() => setLastPurchased(null), 3000);
    } catch (err) {
      alert('Purchase failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/sweets/${id}`);
      fetchSweets();
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleRestock = async (id, quantity) => {
    try {
      await API.post(`/sweets/${id}/restock`, { quantity });
      fetchSweets();
    } catch (err) {
      alert('Restock failed: ' + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => { fetchSweets(); }, []);

  const filteredSweets = sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === '' || sweet.category === category) &&
    (maxPrice === '' || sweet.price <= maxPrice)
  );

  return (
    <div>
      <Navbar />

      {/* Top notification */}
      {lastPurchased && (
        <div className="purchase-notification">
          You purchased <strong>{lastPurchased}</strong>!
        </div>
      )}

      <div className="dashboard-container">
        {/* Filter/search bar */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Gulab Jamun">Gulab Jamun</option>
            <option value="Jalebi">Jalebi</option>
            <option value="Barfi">Barfi</option>
            <option value="Rasgulla">Rasgulla</option>
            <option value="Ladoo">Ladoo</option>
          </select>
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* Available sweets */}
        <h2>Available Sweets</h2>
        <SweetList
          sweets={filteredSweets}
          onPurchase={handlePurchase}
          onDelete={handleDelete}
          onRestock={handleRestock}
          isAdmin={isAdmin}
        />

        {/* Purchased sweets */}
        {purchased.length > 0 && (
          <div className="purchased-section">
            <h2>Purchased Sweets</h2>
            <SweetList sweets={purchased} onPurchase={() => {}} isAdmin={false} />
            <h3>
              Total Amount: ₹
              {purchased.reduce((sum, item) => sum + item.price * item.purchasedQty, 0)}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
