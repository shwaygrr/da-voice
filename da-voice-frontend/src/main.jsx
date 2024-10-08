import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./routes/Layout";
import Representative from "./routes/Representative";
import RepresList from "./routes/RepresList";
import { LocationProvider } from "./contexts/location";
import ElectionList from "./routes/ElectionList";
import Election from "./routes/Election";
import Home from "./routes/Home"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RepresList />} />
            <Route path="representative" element={<Representative />} />
            <Route path="home" element={<Home />} />
            <Route path="elections" element={<ElectionList />} />
            <Route path="electionPage/:id" element={<Election />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocationProvider>
  </React.StrictMode>
);
