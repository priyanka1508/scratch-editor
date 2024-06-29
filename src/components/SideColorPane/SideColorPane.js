import React, { useState } from "react";

const SideColorPane = () => {
  const [selected, setSelected] = useState(null);

  const handleClick = (item) => {
    setSelected(item);
  };

  return (
    <div className="w-14 flex-none h-full overflow-y-auto flex flex-col gap-3 items-center pt-3 border-r border-gray-200">
      <div
        className={`flex flex-col items-center gap-1 cursor-pointer group ${
          selected === "motion" ? "bg-gray-200 w-full pt-1" : ""
        }`}
        onClick={() => handleClick("motion")}
      >
        <div className="rounded-full bg-blue-500 border-1 border-black w-5 h-5"></div>
        <div className="text-xs group-hover:text-blue-500">Motion</div>
      </div>
      <div
        className={`flex flex-col items-center gap-1 cursor-pointer group ${
          selected === "looks" ? "bg-gray-200 w-full pt-1" : ""
        }`}
        onClick={() => handleClick("looks")}
      >
        <div className="rounded-full bg-purple-500 border-1 border-black w-5 h-5"></div>
        <div className="text-xs group-hover:text-blue-500">Looks</div>
      </div>
      <div
        className={`flex flex-col items-center gap-1 cursor-pointer group ${
          selected === "replay" ? "bg-gray-200 w-full pt-1" : ""
        }`}
        onClick={() => handleClick("replay")}
      >
        <div className="rounded-full border-1 border-black w-5 h-5" style={{backgroundColor: "#0891b2"}}></div>
        <div className="text-xs group-hover:text-blue-500">Replay</div>
      </div>
    </div>
  );
};

export default SideColorPane;
