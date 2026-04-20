const KpiCard = ({ icon: Icon, label, value, bg, color }) => {
  return (
    <div className="bg-white p-4 rounded border border-gray-300 flex gap-4 items-center">
      <div className={`${bg} p-2.5 rounded border border-gray-200`}>
        <Icon className={`${color}`} size={18} />
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase tracking-wide font-medium">{label}</p>
        <p className="text-xl font-semibold text-gray-800 mt-0.5">₹{value}</p>
      </div>
    </div>
  );
};

export default KpiCard;