import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="p-4">
      <input
        type="text"
        className="w-full bg-[#F3F4F6] border border-[#4CAF50] px-3 py-2 rounded-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all"
        placeholder="Tìm kiếm sân, người dùng..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
