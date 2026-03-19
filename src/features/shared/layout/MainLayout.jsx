import { Link, useLocation } from "react-router-dom";
import { Home,Package,ShoppingCart,Users} from "lucide-react"

const MainLayout = ({ children }) => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard",icon:Home },
    { name: "Products", path: "/products", icon:Package},
    { name: "Billing", path: "/billing", icon:ShoppingCart },
    { name: "Users", path: "/users", icon:Users },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-gray-900 flex flex-col text-white">
        {/* Logo */}
        <div className="flex items-center justify-center p-4 text-xl font-semibold">
          Retail POS
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2 px-2">
          {menu.map((item) => {
            const Icon = item.icon
            return (

            <Link
              key={item.path}
              to={item.path}
              className={`p-2 rounded-md flex items-center gap-2 ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
                <Icon size={18}/>
              {item.name}
            </Link>
          )
          })}
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-1 flex-col bg-gray-100">
        {/* Header */}
        <div className="h-16 bg-white flex items-center px-4 shadow">
          <h2 className="text-lg font-medium">Retail POS</h2>
        </div>

        {/* Dynamic Content */}
        <div className="m-4 flex-1 bg-white p-6 rounded-xl shadow overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
