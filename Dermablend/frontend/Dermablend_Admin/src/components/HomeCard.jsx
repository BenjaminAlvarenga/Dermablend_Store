const HomeCard = ({ label, value, sublabel, icon: Icon }) => {
  return (
    <div className="flex-1 min-w-[190px] rounded-2xl bg-white p-5 shadow-md">
      <p className="text-sm font-semibold text-[#3a1e08]">{label}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D3AB80]/30 text-[#8a5a2b]">
          <Icon size={20} />
        </span>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#3a1e08]">{value}</p>
          {sublabel && <p className="text-xs text-[#b35c4a]">{sublabel}</p>}
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
