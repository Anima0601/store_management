
import React, { useEffect, useState } from "react";

export default function OwnerDashboard({ backendUrl, token }) {
  const [average, setAverage] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async ()=>{
      const a = await fetch(`${backendUrl}/owner/my-store/average-rating`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r=>r.json());
      setAverage(a.average || 0);

      const r = await fetch(`${backendUrl}/owner/my-store/ratings`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r=>r.json());
      setRows(r.items || r);
    })();
  }, [backendUrl, token]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Store</h2>
      <p className="mb-6">Average rating: <b>{average.toFixed(2)}</b></p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead><tr><th>User</th><th>Email</th><th>Rating</th><th>Date</th></tr></thead>
          <tbody>
            {rows.map((r)=>(
              <tr key={r.id}>
                <td>{r.userName}</td>
                <td>{r.userEmail}</td>
                <td>{r.rating}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
