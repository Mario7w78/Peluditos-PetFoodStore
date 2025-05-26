import React from "react";

const Popup = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-white shadow-xl border border-blue-300 text-blue-700 
                    px-6 py-4 rounded-lg text-center z-50 animate-bounce w-[80%] max-w-md">
      <p className="text-xl font-semibold ">{message}</p>
    </div>
  );
};

export default Popup;
