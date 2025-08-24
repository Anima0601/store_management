import React from "react";

export default function Table({ stores }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="cursor-pointer">Store Name</th>
            <th className="cursor-pointer">Address</th>
            <th className="cursor-pointer">Average Rating</th>
            <th className="cursor-pointer">Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stores.length > 0 ? (
            stores.map((store) => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>{store.avgRating || "N/A"}</td>
                <td>{store.userRating || "Not rated"}</td>
                <td>
                  <button className="btn btn-sm btn-primary">Rate / Update</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No stores found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
