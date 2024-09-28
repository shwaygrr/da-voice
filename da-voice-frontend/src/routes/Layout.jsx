import { Outlet } from "react-router-dom";
import MapComponent from "../components/MapComponent";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-gray-800 text-white">
        <h1 className="text-3xl">Da Voice</h1>
      </header>

      <div className="flex flex-1">
        <div className="w-3/4 h-full">
          <MapComponent />
        </div>

        <div className="w-1/4 h-full bg-gray-100 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      <footer className="p-4 bg-gray-200 text-center">
        <p>Additional Information or Footer Content</p>
      </footer>
    </div>
  );
};

export default Layout;
