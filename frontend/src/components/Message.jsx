import React, { useState } from "react";

const Message = ({ children }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg flex items-center space-x-3 
                 backdrop-blur-lg bg-opacity-90 transition-all duration-300 animate-fadeIn"
    >
      {/* Error Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {/* Message Text */}
      <span className="font-semibold text-sm">{children}</span>

      {/* Close Button */}
      <button
        className="ml-auto text-white cursor-pointer bg-red-800 hover:bg-red-700 px-2 py-1 rounded-full text-sm font-bold shadow-md transition-all transform hover:scale-110 focus:outline-none"
        onClick={() => setVisible(false)}
      >
        ✕
      </button>
    </div>
  );
};

export default Message;
