import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <h1>Da Voice</h1>
      <div>
        <div className="map"></div>
        <Outlet />
      </div>
      <div className="more-info"></div>
    </div>
  );
};

export default Layout;
