import React from "react";

export default function Filter({ searchName, setSearchName, searchAddress, setSearchAddress }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by Store Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="text"
        placeholder="Search by Address"
        value={searchAddress}
        onChange={(e) => setSearchAddress(e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  );
}
