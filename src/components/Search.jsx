import React from "react";

function Search({ term, setTerm }) {
  return (
    <div>
      {" "}
      <input value={term} style={{ height: "30px" }} placeholder='search term' type='text' onChange={(e) => setTerm(e.target.value)}></input>
    </div>
  );
}

export default Search;
