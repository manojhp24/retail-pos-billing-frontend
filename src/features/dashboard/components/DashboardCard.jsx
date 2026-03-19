const KpiCard = ({ icon: Icon, label, value, bg, color }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex gap-4 items-center">
      <div className={`${bg} p-3 rounded-lg `}>
        <Icon className={`${color}`} size={20} />
      </div>
      <div className="">
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-semibold text-gray-800">₹{value}</p>
      </div>
    </div>
  );
};

export default KpiCard;
