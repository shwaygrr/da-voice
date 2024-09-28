import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./routes/Layout";
import Representative from "./routes/Representative";
import RepresList from "./routes/RepresList";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RepresList />} />
          <Route path="test" element={<Representative />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
