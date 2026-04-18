import { BadgeIndianRupee, Package, TrendingUp, Plus, FileText, ArrowRight } from "lucide-react";
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

const quickActions = [
  {
    label: "New Bill",
    icon: Plus,
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
    text: "text-white",
    onClick: () => { },
  },
  {
    label: "View Reports",
    icon: FileText,
    bg: "bg-white",
    hover: "hover:bg-gray-50",
    text: "text-gray-700",
    border: "border border-gray-200",
    onClick: () => { },
  },
];

const recentTransactions = [
  { id: "B004", items: 1, date: "Mar 19, 3:34 PM", amount: "₹500" },
  { id: "B003", items: 3, date: "Mar 19, 1:12 PM", amount: "₹1,200" },
  { id: "B002", items: 2, date: "Mar 19, 11:45 AM", amount: "₹850" },
];

const Dashboard = () => {
  return (
    <>
      {/* Page header */}
      <PageHeader title="Dashboard" description="Welcome back, Admin" />

      {/* Quick Action CTAs */}
      <div className="flex items-center gap-3 mt-5">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
              transition-all duration-200 cursor-pointer shadow-sm
              ${action.bg} ${action.hover} ${action.text} ${action.border ?? ""}
            `}
          >
            <action.icon size={16} />
            {action.label}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-5 mt-5">
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
      <div className="mt-7 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800 tracking-tight">
            Recent Transactions
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Today</span>
            <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
              View all
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">
          {recentTransactions.map((tx) => (
            <div
              key={tx.id}
              className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-all duration-150"
            >
              <div className="flex items-center gap-3">

                {/* Icon */}
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={15} className="text-blue-500" />
                </div>

                {/* Info */}
                <div>
                  <p className="text-sm font-medium text-gray-800">{tx.id}</p>
                  <p className="text-xs text-gray-400">
                    {tx.items} item{tx.items > 1 ? "s" : ""} · {tx.date}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-emerald-600">
                  {tx.amount}
                </span>

                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 border border-gray-200 hover:border-blue-300 rounded-lg px-2.5 py-1.5 transition-all cursor-pointer">
                  <FileText size={12} />
                  Print
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="px-5 py-3.5 border-t border-gray-100 bg-gray-50">
          <button className="w-full text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-1 cursor-pointer">
            View all transactions
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;