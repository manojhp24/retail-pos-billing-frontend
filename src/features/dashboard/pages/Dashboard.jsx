import { BadgeIndianRupee, Package, TrendingUp, Plus, FileText, ArrowRight } from "lucide-react";
import { KpiCard } from "../components";
import PageHeader from "@/features/shared/PageHeader";

const cardDetails = [
  {
    label: "Total Revenue",
    value: "1600",
    icon: BadgeIndianRupee,
    bg: "bg-white",
    color: "text-gray-700",
  },
  {
    label: "Products",
    value: "10",
    icon: Package,
    bg: "bg-white",
    color: "text-gray-700",
  },
  {
    label: "Total Sales",
    value: "5",
    icon: TrendingUp,
    bg: "bg-white",
    color: "text-gray-700",
  },
];

const quickActions = [
  {
    label: "New Bill",
    icon: Plus,
    bg: "bg-blue-700",
    hover: "hover:bg-blue-800",
    text: "text-white",
    onClick: () => { },
  },
  {
    label: "View Reports",
    icon: FileText,
    bg: "bg-white",
    hover: "hover:bg-gray-100",
    text: "text-gray-700",
    border: "border border-gray-300",
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
      <div className="flex items-center gap-2 mt-5">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={`
              flex items-center gap-2 px-4 py-2 rounded text-sm font-medium
              transition-colors duration-150 cursor-pointer
              ${action.bg} ${action.hover} ${action.text} ${action.border ?? ""}
            `}
          >
            <action.icon size={15} />
            {action.label}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mt-5">
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
      <div className="mt-6 bg-white border border-gray-300 rounded overflow-hidden">

        {/* Header */}
        <div className="px-5 py-3 border-b border-gray-300 bg-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            Recent Transactions
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">Today</span>
            <button className="flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 transition-colors cursor-pointer">
              View all
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Table Head */}
        <div className="px-5 py-2 grid grid-cols-4 bg-gray-50 border-b border-gray-200">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Bill ID</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Items</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date & Time</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Amount</span>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">
          {recentTransactions.map((tx) => (
            <div
              key={tx.id}
              className="px-5 py-3 grid grid-cols-4 items-center hover:bg-gray-50 transition-colors duration-100"
            >
              <p className="text-sm font-medium text-gray-800">{tx.id}</p>
              <p className="text-sm text-gray-600">{tx.items} item{tx.items > 1 ? "s" : ""}</p>
              <p className="text-sm text-gray-500">{tx.date}</p>

              <div className="flex items-center justify-end gap-3">
                <span className="text-sm font-semibold text-gray-800">
                  {tx.amount}
                </span>
                <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-700 border border-gray-300 hover:border-blue-400 rounded px-2.5 py-1 transition-colors cursor-pointer">
                  <FileText size={12} />
                  Print
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="px-5 py-3 border-t border-gray-300 bg-gray-50">
          <button className="w-full text-xs font-medium text-gray-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-1 cursor-pointer">
            View all transactions
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;