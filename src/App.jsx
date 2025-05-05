import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { debounce } from "lodash";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

function App() {
  const [term, setTerm] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchItems = async ({ page = 1, limit }) => {
    try {
      setIsLoading(true);
      let todos = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}?_limit=${limit}`);
      let res = await todos.json();

      if (!res) {
        setIsLoading(false);
        setData([]);
      }
      setIsLoading(false);
      setData(res);
      setFilteredData(res);
    } catch (error) {
      setIsLoading(false);
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debounceFilter = useMemo(() => {
    return debounce((term, postsData) => {
      const res = postsData.filter((e) => e.title.toLowerCase().includes(term.toLowerCase()));
      setFilteredData(res);
    }, 500);
  });
  useEffect(() => {
    fetchItems({ page, limit: 10 });
  }, [page]);

  useEffect(() => {
    if (term) {
      debounceFilter(term, data);
    } else {
      setFilteredData(data);
    }
    return () => debounceFilter.cancel();
  }, [term, debounceFilter]);

  return (
    <>
      <div style={{ width: "100vh", height: "100vh" }}>
        <Search term={term} setTerm={setTerm} />
        {isLoading ? <h1>Loading...</h1> : ""}
        {filteredData?.map((item) => (
          <div style={{ display: "flex", justifyContent: "start" }} key={item.id}>
            <h4 style={{ backgroundColor: "red", lineHeight: 0 }}>
              {item.id}. {item.title}
            </h4>
          </div>
        ))}
        <Pagination page={page} setPage={setPage} />
      </div>
    </>
  );
}

export default App;
