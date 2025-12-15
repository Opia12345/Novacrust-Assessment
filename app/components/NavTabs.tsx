"use client";

import { useState } from "react";
import { nav_items } from "../constants";

const NavTabs = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex justify-center rounded-2xl w-full max-w-lg">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 sm:gap-3 bg-gray-100 rounded-full min-w-fit">
            {nav_items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`${
                  activeTab === item.id
                    ? "green text-white shadow-md"
                    : "text-[#828282] hover:bg-gray-200"
                } px-3 sm:px-4 md:px-6 py-2 rounded-full font-medium sm:font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ease-in-out`}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTabs;
