import React, { Fragment, useState } from "react";
import Icon from "../../Icon";

const MotionSection = () => {
  const [moveSteps, setMoveSteps] = useState(0);
  const [undoSteps, setUndoSteps] = useState(0);
  const [redoSteps, setRedoSteps] = useState(0);

  const handleClick = () => {
    const el = document.getElementById("character0-0");
    const container = el.parentElement.parentElement;

    
    const elWidth = el.offsetWidth;
    const containerWidth = container.offsetWidth;
    const boundary = containerWidth - elWidth;
    console.log("boundary: ", boundary);

    const left = el.offsetLeft;
    el.style.position = "relative";
    const stepsToMove = Number(left) + Number(moveSteps);
    if(stepsToMove > boundary){
      return;
    }
    el.style.left = stepsToMove + "px";
  };

  const handleMoveSteps = (e) => {
    console.log("move by: ", e.target.value);
    setMoveSteps(e.target.value);
  }

  return (
    <Fragment>
      <div className="font-bold"> {"Motion"} </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 cursor-pointer rounded items-center text-xs"
        onClick={handleClick}
        id={"character0"}
      >
        <span>{"Move"}</span>
        <div className="">
          <input
            value={moveSteps}
            onChange={(e) => handleMoveSteps(e)}
            className="text-black w-8 text-center mx-2 border border-white bg-white rounded-full"
          />
        </div>

        <span>{"steps"}</span>
      </div>
      <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 cursor-pointer rounded items-center text-xs">
        <span>{"Turn"}</span>
        <Icon name="undo" size={15} className="text-white mx-2 mt-1" />
        <div className="">
          <input
            value={undoSteps}
            onChange={(e) => setUndoSteps(e.target.value)}
            className="text-black w-8 text-center mr-1 border border-white bg-white rounded-full"
          />
        </div>
        <span>{"degrees"}</span>
      </div>
      <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 cursor-pointer rounded items-center text-xs">
        <span>{"Turn"}</span>
        <Icon name="redo" size={15} className="text-white mx-2 mt-1" />
        <div className="">
          <input
            value={redoSteps}
            onChange={(e) => setRedoSteps(e.target.value)}
            className="text-black w-8 text-center mr-1 border border-white bg-white rounded-full"
          />
        </div>
        <span>{"degrees"}</span>
      </div>
    </Fragment>
  );
};

export default MotionSection;
