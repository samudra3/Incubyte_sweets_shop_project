import { useState } from "react";
import api from "../api/api";

export default function SweetForm({ refresh }) {
  const [form, setForm] = useState({
    name:"",
    category:"",
    price:"",
    quantity:""
  });

  const submit = async () => {
    await api.post("/sweets", {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity)
    });
    refresh();
  };

  return (
    <div className="card">
      <h3>Add Sweet (Admin)</h3>
      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Category" onChange={e=>setForm({...form,category:e.target.value})}/>
      <input placeholder="Price" onChange={e=>setForm({...form,price:e.target.value})}/>
      <input placeholder="Quantity" onChange={e=>setForm({...form,quantity:e.target.value})}/>
      <button onClick={submit}>Add</button>
    </div>
  );
}
