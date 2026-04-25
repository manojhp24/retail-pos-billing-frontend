import { Link, useLocation, Outlet } from "react-router-dom";
import { Home, Package, ShoppingCart, Users, Menu, Archive } from "lucide-react";
import { useState } from "react";

const MainLayout = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Products", path: "/products", icon: Package },
    { name: "Inventory", path: "/inventory", icon: Archive },
    { name: "Billing", path: "/billing", icon: ShoppingCart },
    // { name: "Users", path: "/users", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`flex flex-col flex-shrink-0 bg-white border-r border-gray-300 transition-all duration-300 ${isOpen ? "w-56" : "w-14"}`}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between h-14 px-3 border-b border-gray-300">
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-700 flex items-center justify-center flex-shrink-0">
                <ShoppingCart size={13} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-800">
                POS
              </span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-8 h-8 rounded flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors ${!isOpen ? "mx-auto" : ""}`}
          >
            <Menu size={17} />
          </button>
        </div>

        {/* Nav label */}
        {isOpen && (
          <p className="px-4 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Navigation
          </p>
        )}

        {/* Menu Items */}
        <nav className={`flex flex-col gap-0.5 px-2 ${!isOpen ? "pt-4" : ""}`}>
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center rounded transition-colors duration-150 group ${isOpen ? "gap-2.5 px-3 py-2" : "justify-center py-2"
                  } ${isActive
                    ? "bg-blue-700 text-white font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {/* Collapsed active indicator */}
                {isActive && !isOpen && (
                  <span className="absolute left-0 top-1/4 h-1/2 w-0.5 rounded-r bg-blue-700" />
                )}

                <Icon size={16} className="flex-shrink-0" />

                {isOpen && (
                  <span className="text-sm">{item.name}</span>
                )}

                {/* Tooltip when collapsed */}
                {!isOpen && (
                  <span className="absolute left-12 z-50 whitespace-nowrap rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User badge */}
        {isOpen && (
          <div className="mt-auto mx-3 mb-4 flex items-center gap-2.5 rounded border border-gray-300 bg-gray-50 px-3 py-2.5">
            <div className="w-7 h-7 rounded bg-blue-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              A
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 leading-tight">Admin</p>
              <p className="text-[11px] text-gray-400">Retail POS</p>
            </div>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Header */}
        <div className="h-14 flex items-center justify-between px-6 bg-white border-b border-gray-300 flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-gray-800">Retail POS</h2>
            <div className="w-px h-4 bg-gray-300" />
            <span className="text-sm text-gray-500">
              {menu.find((m) => m.path === location.pathname)?.name ?? ""}
            </span>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded border border-green-300 bg-green-50 text-green-700">
            Online
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-100 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;