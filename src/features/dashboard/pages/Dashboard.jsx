import { BadgeIndianRupee, Package, TrendingUp } from "lucide-react";
import { KpiCard } from "../components";

const cardDetails = [
  {
    label: "Total Revenue",
    value: "1600",
    icon: BadgeIndianRupee,
    bg: "bg-green-100",
    color: "text-green-500",
  },
  {
    label: "Products",
    value: "10",
    icon: Package,
    bg: "bg-blue-100",
    color: "text-blue-500",
  },
  {
    label: "Total Sales",
    value: "5",
    icon: TrendingUp,
    bg: "bg-yellow-100",
    color: "text-yellow-500",
  },
];

const Dashboard = () => {
  return (
    <>
      <div className="p-4 border border-l-4 border-l-gray-500 rounded-lg">
        <p className="font-semibold text-2xl text-gray-700">Dashboard</p>
      </div>
      <div className="grid grid-cols-3  gap-4 mt-4">
        {cardDetails.map((card) => (
          <KpiCard
            key={card.label}
            icon={card.icon}
            label={card.label}
            value={card.value}
            bg={card.bg}
            color={card.color}
          />
        ))}
      </div>
      <div className="mt-6 bg-white rounded-xl shadow overflow-hidden">
        <div className="px-5 py-4 border-b">
          <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
        </div>
        <div className="divide-y">
          <div className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition">
            <div>
              <p className="font-medium text-gray-800">B004</p>
              <p className="text-sm text-gray-500">1 item · Mar 19, 3:34 PM</p>
            </div>

            <p className="font-semibold text-gray-800">₹500</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
