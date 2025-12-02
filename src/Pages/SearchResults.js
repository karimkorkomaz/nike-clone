import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/Search.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("q"); // get ?q= from URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <main className="container">
      <h1 className="search-title">
        Search Results for: <span>"{query}"</span>
      </h1>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : results.length === 0 ? (
        <p className="no-results">No products found.</p>
      ) : (
        <div className="search-grid">
          {results.map((p) => (
            <div key={p.id} className="search-card">
              <img src={p.image_url} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="category">{p.category}</p>
              <p className="price">${Number(p.price).toFixed(2)}</p>
              <p className="section-tag">Section: {p.section}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default SearchResults;
