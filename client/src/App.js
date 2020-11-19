import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/passwords";
import useAsync from "./hooks/useAsync";
import Form from "./components/form";

function App() {
  const { data, loading, error, doFetch } = useAsync(async () =>
    getPassword("wifi")
  );

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {data}
        <Form />
      </header>
    </div>
  );
}
export default App;
