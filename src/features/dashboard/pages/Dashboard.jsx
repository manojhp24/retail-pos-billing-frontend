import { BadgeIndianRupee, Package, TrendingUp } from "lucide-react";
import { KpiCard } from "../components";
import PageHeader from "@/features/shared/PageHeader";


const cardDetails = [
  {
    label: "Total Revenue",
    value: "1600",
    icon: BadgeIndianRupee,
    bg: "bg-green-50",
    color: "text-green-500",
  },
  {
    label: "Products",
    value: "10",
    icon: Package,
    bg: "bg-blue-50",
    color: "text-blue-500",
  },
  {
    label: "Total Sales",
    value: "5",
    icon: TrendingUp,
    bg: "bg-yellow-50",
    color: "text-yellow-500",
  },
];

const Dashboard = () => {
  return (
    <>
      {/* Page header */}
      <PageHeader title="Dashboard" description="Welcome back, Admin" />

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mt-4">
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

      {/* Recent Transactions */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Recent Transactions</h3>
          <span className="text-xs text-gray-400">Today</span>
        </div>

        <div className="divide-y divide-gray-100">
          <div className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={14} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">B004</p>
                <p className="text-xs text-gray-400">1 item · Mar 19, 3:34 PM</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-emerald-600">₹500</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;