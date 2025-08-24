
import React, { useEffect, useState } from "react";

export default function AdminDashboard({ backendUrl, token }) {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });

  useEffect(() => {
    (async ()=>{
      const res = await fetch(`${backendUrl}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setStats(data);
    })();
  }, [backendUrl, token]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="stat bg-base-100 shadow"><div className="stat-title">Users</div><div className="stat-value">{stats.totalUsers}</div></div>
        <div className="stat bg-base-100 shadow"><div className="stat-title">Stores</div><div className="stat-value">{stats.totalStores}</div></div>
        <div className="stat bg-base-100 shadow"><div className="stat-title">Ratings</div><div className="stat-value">{stats.totalRatings}</div></div>
      </div>

   
    </div>
  );
}
