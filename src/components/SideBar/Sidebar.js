import React from "react";
import Icon from "../Icon";
import MotionSection from "./MotionSection/MotionSection";
import LooksSection from "./LooksSection/LookSection";
import Replay from "../Replay/Replay";

export default function Sidebar() {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded">
        {"When this sprite clicked"}
      </div>
     <MotionSection/>
     <LooksSection/>
     <Replay/>
    </div>
  );
}
