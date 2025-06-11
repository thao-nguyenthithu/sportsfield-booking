import React from "react";

const Alert = ({ message }) => {
  return (
    <div className="bg-red-500 text-white p-2 rounded mb-4">
      {message || "Có hoạt động đáng chú ý!"}
    </div>
  );
};

export default Alert;