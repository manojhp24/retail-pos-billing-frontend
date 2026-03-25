import { Link, useLocation, Outlet } from "react-router-dom";
import { Home, Package, ShoppingCart, Users, Menu } from "lucide-react";
import { useState } from "react";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Products", path: "/products", icon: Package },
    { name: "Billing", path: "/billing", icon: ShoppingCart },
    { name: "Users", path: "/users", icon: Users },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ${isOpen ? "w-60" : "w-16"}`}
      >
        {/* Top (Logo + Toggle) */}
        <div className="flex items-center justify-between p-4">
          {isOpen && <span className="text-lg font-semibold">POS</span>}
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu size={20} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2 px-2 items-center">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex ${isOpen ? "items-center" : "justify-center"}  gap-3 p-2 w-full rounded-md group ${
                  location.pathname === item.path
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                <Icon size={18} />

                {/* Show text only if open */}
                {isOpen && <span>{item.name}</span>}

                {/* Tooltip when collapsed */}
                {!isOpen && (
                  <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-1 flex-col bg-gray-100">
        {/* Header */}
        <div className="h-16 bg-white flex items-center px-4 shadow">
          <h2 className="text-lg font-medium">Retail POS</h2>
        </div>

        {/* Content */}
        <div className="m-4 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
