import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import QueueAction from "../../actions";

export const hideSprite = () => {
  const el = document.getElementById("character0-0");
  if (el) {
    el.style.display = "none";
  }
}

export const showSprite = () => {
  const el = document.getElementById("character0-0");
  if (el) {
    el.style.display = "block";
  }
}

const LooksSection = () => {
  const [manageTime, setManageTime] = useState(2);
  const [size, setSize] = useState(0); // Size increment value
  const [message, setMessage] = useState("Hello!");
  const [showMessage, setShowMessage] = useState(false);
  const [bubblePosition, setBubblePosition] = useState({ top: 0, left: 0 });
  const dispatch = useDispatch();

  const handleHide = () => {
    const el = document.getElementById("character0-0");
    if (el) {
      dispatch(QueueAction("ENQUEUE", "hide"));
    }
    hideSprite();
  };

  const handleShow = () => {
    const el = document.getElementById("character0-0");
    if (el) {
      dispatch(QueueAction("ENQUEUE", "show block"));
    }
    showSprite();
  };

  const handleSay = () => {
    const isShow = !showMessage
    setShowMessage(isShow);
    if (isShow) {
      //dispatch(QueueAction("ENQUEUE", `say ${message}_${manageTime}`));
      handleSay(isShow);
      const el = document.getElementById("character0-0");
      if (el) {
        const rect = el.getBoundingClientRect();
        setBubblePosition({
          top: rect.top - 30, // Adjust the position above the cat
          left: rect.left + rect.width / 2, // Center horizontally
          show: "block"
        });
      }

      const timer = setTimeout(() => {
        const el = document.getElementById("character0-0");
        const rect = el.getBoundingClientRect();
        setShowMessage(!isShow);
        setBubblePosition({
          top: rect.top - 30, // Adjust the position above the cat
          left: rect.left + rect.width / 2, // Center horizontally
          show: "none"
        });
      }, manageTime * 1000);

      return () => clearTimeout(timer);
    }
  };



  const changeSize = () => {
    const el = document.getElementById("character0-0");
    if (el) {
      const currentWidth = el.offsetWidth;
      const currentHeight = el.offsetHeight;

      const newWidth = Number(currentWidth) + Number(size);
      const newHeight = Number(currentHeight) + Number(size);


      el.style.width = `${newWidth}px`;
      el.style.height = `${newHeight}px`;
      dispatch(QueueAction("ENQUEUE", `changesize ${size}`));
    } else {
      console.error("Element with ID 'character0-0' not found.");
    }
  };

  return (
    <Fragment>
      <div className="font-bold">{"Looks"}</div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded"
        onClick={handleShow}
      >
        {"Show"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded"
        onClick={handleHide}
      >
        {"Hide"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded"
        onClick={handleSay}
      >
        <span>{"Say"}</span>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-black w-12 text-center mx-2 border border-white bg-white rounded-full"
        />
        <span>{"for"}</span>
        <input
          value={manageTime}
          onChange={(e) => setManageTime(parseInt(e.target.value))}
          className="text-black w-6 text-center mx-2 border border-white bg-white rounded-full"
        />
        <span>{"seconds"}</span>
      </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded"
        onClick={changeSize}
      >
        <span>{"Increase size by"}</span>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="text-black w-12 text-center mx-2 border border-white bg-white rounded-full"
        />
      </div>
      {showMessage && (
        <div
          className="absolute bg-white border border-black rounded px-2 py-1"
          style={{ top: bubblePosition.top, left: bubblePosition.left, display: bubblePosition.show }}
        >
          {message}
        </div>
      )}
    </Fragment>
  );
};

export default LooksSection;
