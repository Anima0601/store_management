
import React, { useEffect, useMemo, useState } from "react";
import RatingStars from "../Components/RatingStars";

export default function StoresList({ backendUrl, token, user }) {
  const [q, setQ] = useState({ name: "", address: "", sort: "rating", order: "desc", page: 1 });
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ total: 0 });
  const isAuthed = !!token;

  const fetchStores = async () => {
    const params = new URLSearchParams(q).toString();
    const res = await fetch(`${backendUrl}/stores?${params}`, {
      headers: isAuthed ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    setRows(data.items || data); 
    setMeta(data.meta || { total: data.length });
  };

  useEffect(() => { fetchStores();  }, [q.sort, q.order, q.page]);

  const onRate = async (storeId, rating) => {
    if (!isAuthed || user?.role !== "normal_user") return alert("Login as normal user to rate.");
   
    setRows(r => r.map(s => s.id === storeId ? { ...s, userRating: rating } : s));
    await fetch(`${backendUrl}/stores/${storeId}/ratings`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ rating }),
    });
    fetchStores();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-3 mb-4">
        <input className="input input-bordered" placeholder="Search name"
          value={q.name} onChange={(e)=>setQ({ ...q, name: e.target.value })}/>
        <input className="input input-bordered" placeholder="Search address"
          value={q.address} onChange={(e)=>setQ({ ...q, address: e.target.value })}/>
        <select className="select select-bordered"
          value={q.sort} onChange={e=>setQ({ ...q, sort: e.target.value })}>
          <option value="rating">Overall Rating</option>
          <option value="name">Name</option>
        </select>
        <select className="select select-bordered"
          value={q.order} onChange={e=>setQ({ ...q, order: e.target.value })}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
        <button className="btn" onClick={()=>setQ({ ...q, page: 1 })}>Search</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map((s) => (
          <div key={s.id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title">{s.name}</h3>
              <p className="text-sm text-gray-600">{s.address}</p>
              <p className="mt-2">Overall: <b>{Number(s.overallRating ?? 0).toFixed(1)}</b> / 5</p>
              {isAuthed && user?.role === "normal_user" && (
                <div className="mt-2">
                  <p className="text-sm">Your Rating:</p>
                  <RatingStars value={s.userRating || 0} onChange={(val)=>onRate(s.id, val)} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
