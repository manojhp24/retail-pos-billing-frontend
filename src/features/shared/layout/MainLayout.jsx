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
    { name: "Users", path: "/users", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-950">

      {/* Sidebar */}
      <div
        className={`flex flex-col flex-shrink-0 bg-gray-900 border-r border-white/[0.07] transition-all duration-300 ${isOpen ? "w-56" : "w-16"
          }`}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.07]">
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0">
                <ShoppingCart size={13} className="text-white" />
              </div>
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight">
                POS
              </span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-slate-100 hover:bg-white/[0.07] transition-colors ${!isOpen ? "mx-auto" : ""
              }`}
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Nav label */}
        {isOpen && (
          <p className="px-4 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">
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
                className={`relative flex items-center rounded-xl transition-all duration-150 group ${isOpen ? "gap-2.5 px-3 py-2.5" : "justify-center py-2.5"
                  } ${isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg shadow-blue-600/30"
                    : "text-white/50 hover:bg-white/[0.06] hover:text-slate-100"
                  }`}
              >
                {/* Collapsed active indicator */}
                {isActive && !isOpen && (
                  <span className="absolute left-0 top-1/4 h-1/2 w-0.5 rounded-r bg-blue-400" />
                )}

                <Icon size={17} className="flex-shrink-0" />

                {isOpen && (
                  <span className="text-[13.5px]">{item.name}</span>
                )}

                {/* Tooltip when collapsed */}
                {!isOpen && (
                  <span className="absolute left-14 z-50 whitespace-nowrap rounded-lg bg-gray-900 border border-white/10 px-2.5 py-1 text-xs font-medium text-slate-100 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User badge */}
        {isOpen && (
          <div className="mt-auto mx-3 mb-4 flex items-center gap-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] px-3 py-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              A
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-100 leading-tight">Admin</p>
              <p className="text-[11px] text-white/35">Retail POS</p>
            </div>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 bg-gray-900 border-b border-white/[0.07] flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-[15px] font-semibold text-slate-100">Retail POS</h2>
            <div className="w-px h-[18px] bg-white/10" />
            <span className="text-[13px] text-white/40">
              {menu.find((m) => m.path === location.pathname)?.name ?? ""}
            </span>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
            Online
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-slate-100 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;