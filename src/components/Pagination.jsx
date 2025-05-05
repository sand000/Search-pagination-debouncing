import React from "react";

function Pagination({ page, setPage }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-around", width: "250px", paddingLeft: "25%", marginTop: "50px" }}>
      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        Previous
      </button>
      <p>{page}</p>
      <button style={{ backgroundColor: "blue", color: "white" }} onClick={() => setPage((prev) => prev + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
