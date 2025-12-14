import React, { useState } from 'react';
import { sweetImages } from '../../utils/sweetImages';
import './Sweets.css';

const SweetCard = ({ sweet, onPurchase, onDelete, onRestock, isAdmin }) => {
  const [qty, setQty] = useState(1);
  const [restockQty, setRestockQty] = useState(1);

  return (
    <div className="sweet-card">
      <img
        src={sweet.image || sweetImages[sweet.name] || sweetImages['default']}
        alt={sweet.name}
        className="sweet-image"
      />
      <h3>{sweet.name}</h3>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Available: {sweet.quantity}</p>

      {sweet.quantity > 0 ? (
        <div className="purchase-section">
          <input
            type="number"
            min="1"
            max={sweet.quantity}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
          <button onClick={() => onPurchase(sweet._id, qty)}>Purchase</button>
        </div>
      ) : (
        <button disabled>Out of Stock</button>
      )}

      {isAdmin && (
        <div className="admin-section">
          <button onClick={() => onDelete(sweet._id)}>Delete</button>
          <input
            type="number"
            min="1"
            value={restockQty}
            onChange={(e) => setRestockQty(Number(e.target.value))}
          />
          <button onClick={() => onRestock(sweet._id, restockQty)}>Restock</button>
        </div>
      )}
    </div>
  );
};

export default SweetCard;
