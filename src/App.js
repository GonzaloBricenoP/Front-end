import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Panel from "./components/Panel";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/panel" element={<Panel />}></Route>
      </Routes>
    </div>
  );
}

export default App;
