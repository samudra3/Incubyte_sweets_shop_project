import React from 'react';
import SweetCard from './SweetCard';
import './Sweets.css';

const SweetList = ({ sweets, onPurchase, onDelete, onRestock, isAdmin }) => (
  <div className="sweet-list">
    {sweets.map((sweet) => (
      <SweetCard
        key={sweet.purchaseId || sweet._id} // unique key fix
        sweet={sweet}
        onPurchase={onPurchase}
        onDelete={onDelete}
        onRestock={onRestock}
        isAdmin={isAdmin}
      />
    ))}
  </div>
);

export default SweetList;
