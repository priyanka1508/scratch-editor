import React, { Fragment, useState } from "react";

const LooksSection = () => {
  const[inputText, setInputText] = useState("Hello!");
  const [manageTime, setManageTime] = useState(2);
  const [think, setThink] = useState("hmm...");
  const [thinkTime, setThinkTime] = useState(2);

  return (
    <Fragment>
      <div className="font-bold"> {"Looks"} </div>
      <div className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded">
        {"show"}
      </div>
      <div 
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded"
      >
        {"Hide"}
      </div>
      <div className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded">
        <span>{"Say"}</span>
        <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="text-black w-12 text-center mx-2 border border-white bg-white rounded-full"
          />
        <span>{"for"}</span> 
        <input
            value={manageTime}
            onChange={(e) => setManageTime(e.target.value)}
            className="text-black w-6 text-center mx-2 border border-white bg-white rounded-full"
          />
          <span>{"seconds"}</span> 
      </div>
      <div className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded">
        <span>{"Think"}</span>
        <input
            value={think}
            onChange={(e) => setThink(e.target.value)}
            className="text-black w-12 text-center mx-2 border border-white bg-white rounded-full"
          />
        <span>{"for"}</span> 
        <input
            value={thinkTime}
            onChange={(e) => setThinkTime(e.target.value)}
            className="text-black w-6 text-center mx-2 border border-white bg-white rounded-full"
          />
          <span>{"seconds"}</span> 
      </div>
    </Fragment>
  );
};

export default LooksSection;
