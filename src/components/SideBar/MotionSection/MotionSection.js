import React, { Fragment, useState } from "react";
import { useDispatch } from 'react-redux';
import Icon from "../../Icon";
import QueueAction from "../../actions";

function getRotationAngle(elementId) {
  const element = document.getElementById(elementId);
  if (!element) {
    return null;
  }

  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform || style.mozTransform;

  // No transform applied
  if (transform === 'none' || !transform) {
    return 0;
  }

  // Extract the values from the matrix
  const matrixValues = transform.match(/matrix.*\((.+)\)/);
  if (!matrixValues) {
    console.error('No valid transform matrix found');
    return null;
  }

  const values = matrixValues[1].split(', ');
  const a = parseFloat(values[0]);
  const b = parseFloat(values[1]);

  // Calculate the angle
  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  return angle;
}


export const moveSprite = (steps) => {
  const el = document.getElementById("character0-0");
  if (!el) {
    return;
  }
  const container = el.parentElement.parentElement;
  const elWidth = el.offsetWidth;
  const containerWidth = container.offsetWidth;
  const boundary = containerWidth - elWidth;
  const left = el.offsetLeft;
  el.style.position = "relative";
  const stepsToMove = Number(left) + Number(steps);
  if (stepsToMove > boundary) {
    return;
  }
  el.style.left = stepsToMove + "px";
}

export const turnSprite = (degree, direction) => {
  const el = document.getElementById("character0-0");
  if (!el) {
    return;
  }
  let rotation = getRotationAngle('character0-0');
  console.log("curret rotation: ", rotation);
  let newRotation;
  if (direction === "left") {
    newRotation = rotation - Number(degree);
  } else {
    newRotation = rotation + Number(degree);
  }
  el.style.transform = `rotate(${newRotation}deg)`;
}

export const glideSprite = (randomOffsetX, randomOffsetY, glideTime) => {
  const el = document.getElementById("character0-0");
  if (!el) {
    console.log("el not exists: ");
    return;
  }
  const container = el.parentElement.parentElement;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const x = (randomOffsetX) * (containerWidth - el.offsetWidth);
  const y = (randomOffsetY) * (containerHeight - el.offsetHeight);

  // el.style.position = "relative";
  el.style.position = "absolute";
  el.style.left = `${el.offsetLeft}px`;
  el.style.top = `${el.offsetTop}px`;
  el.offsetHeight; 

  // Apply transition styles
  el.style.transition = `all ${glideTime}s ease-in-out`;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
}

const MotionSection = () => {
  const [moveSteps, setMoveSteps] = useState(0);
  const [undoSteps, setUndoSteps] = useState(0);
  const [redoSteps, setRedoSteps] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [glideTime, setGlideTime] = useState(1);

  //const previousActions = useSelector((state) => state.previousActions);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(QueueAction("ENQUEUE", `move_right ${moveSteps}`));
    moveSprite(moveSteps);
  };

  const handleMoveSteps = (e) => {
    setMoveSteps(e.target.value);
  };

  const handleUndoClick = () => {
    dispatch(QueueAction("ENQUEUE", `turn_left ${undoSteps}`));
    turnSprite(undoSteps, "left");
  };

  const handleRedoClick = () => {
    dispatch(QueueAction("ENQUEUE", `turn_right ${redoSteps}`));
    turnSprite(redoSteps, "right");
  };

  const handleGlide = () => {
    const randomOffsetX = Math.random();
    const randomOffsetY = Math.random();
    dispatch(QueueAction("ENQUEUE", `glide ${randomOffsetX}_${randomOffsetY}_${glideTime}`));
    glideSprite(randomOffsetX, randomOffsetY, glideTime);
  };

  const handleGlideTimeChange = (e) => {
    setGlideTime(e.target.value);
  };

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
            onClick={(e) => e.stopPropagation()}
            className="text-black w-8 text-center mx-2 border border-white bg-white rounded-full"
          />
        </div>
        <span>{"steps"}</span>
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 cursor-pointer rounded items-center text-xs"
        onClick={handleUndoClick}
      >
        <span>{"Turn"}</span>
        <Icon name="undo" size={15} className="text-white mx-2 mt-1" />
        <div className="">
          <input
            value={undoSteps}
            onChange={(e) => setUndoSteps(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="text-black w-8 text-center mr-1 border border-white bg-white rounded-full"
          />
        </div>
        <span>{"degrees"}</span>
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 cursor-pointer rounded items-center text-xs"
        onClick={handleRedoClick}
      >
        <span>{"Turn"}</span>
        <Icon name="redo" size={15} className="text-white mx-2 mt-1" />
        <div className="">
          <input
            value={redoSteps}
            onChange={(e) => setRedoSteps(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="text-black w-8 text-center mr-1 border border-white bg-white rounded-full"
          />
        </div>
        <span>{"degrees"}</span>
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 cursor-pointer rounded items-center text-xs"
        onClick={handleGlide}
      >
        <span>{"Glide"}</span>
        <input
          value={glideTime}
          onChange={handleGlideTimeChange}
          onClick={(e) => e.stopPropagation()}
          className="text-black w-8 text-center mx-2 border border-white bg-white rounded-full"
        />
        <span>{"secs to random position"}</span>
        <span>
        </span>
      </div>
    </Fragment>
  );
};

export default MotionSection;
