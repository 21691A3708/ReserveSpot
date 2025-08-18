import React from "react";

const HamburgerIcon = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="relative w-[80px] h-[80px]">
        <div className="bg-[#7a0c0c] rounded-full w-full h-full flex items-center justify-center shadow-lg">
          <div className="flex flex-col items-center space-y-[6px]">
            <div className="w-[35px] h-[4px] bg-white rounded">/</div>
            <div className="w-[20px] h-[4px] bg-white rounded">/</div>
            <div className="w-[40px] h-[4px] bg-white rounded">/</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerIcon;
