import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Table from "./Table";

const fetchStores = async () => {
  const res = await fetch("http://localhost:5000/api/stores");
  return res.json();
};

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  useEffect(() => {
    fetchStores().then((data) => {
      setStores(data);
      setFilteredStores(data);
    });
  }, []);

 
  useEffect(() => {
    let results = stores;
    if (searchName) {
      results = results.filter((store) =>
        store.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (searchAddress) {
      results = results.filter((store) =>
        store.address.toLowerCase().includes(searchAddress.toLowerCase())
      );
    }
    setFilteredStores(results);
  }, [searchName, searchAddress, stores]);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <Filter
        searchName={searchName}
        setSearchName={setSearchName}
        searchAddress={searchAddress}
        setSearchAddress={setSearchAddress}
      />
      <Table stores={filteredStores} />
    </section>
  );
}
