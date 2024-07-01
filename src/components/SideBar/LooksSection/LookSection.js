import React, { Fragment, useState } from "react";
import { useDispatch } from 'react-redux';
import QueueAction from "../../actions";

export const hideSprite = () => {
  const el = document.getElementById("character0-0");
  if (!el) {
    return;
  }
  el.style.display = "none";
}

export const showSprite = () => {
  const el = document.getElementById("character0-0");
  if (!el) {
    return;
  }
  el.style.display = "block";
}

export const showMessageBubble = (showMessage, manageTime, dispatch) => {
  const isShow = !showMessage;
    //setShowMessage(isShow);
    dispatch(QueueAction("SET_SHOW_MESSAGE", isShow));
    if (isShow) {
      //dispatch(QueueAction("ENQUEUE", `say ${message}_${manageTime}`));
      const el = document.getElementById("character0-0");
      if (el) {
        const rect = el.getBoundingClientRect();
        const bubblePos = {
          top: rect.top - 30, // Adjust the position above the cat
          left: rect.left + rect.width / 2, // Center horizontally
          show: "block"
        }
        //setBubblePosition(bubblePos);
        dispatch(QueueAction("SET_BUBBLE_POSITION", bubblePos));
      }

      const timer = setTimeout(() => {
        const el = document.getElementById("character0-0");
        const rect = el.getBoundingClientRect();
        //setShowMessage(!isShow);
        dispatch(QueueAction("SET_SHOW_MESSAGE", !isShow));
        const bubblePos = {
          top: rect.top - 30, // Adjust the position above the cat
          left: rect.left + rect.width / 2, // Center horizontally
          show: "none"
        }
        //setBubblePosition(bubblePos);
        dispatch(QueueAction("SET_BUBBLE_POSITION", bubblePos));
      }, manageTime * 1000);

      return () => clearTimeout(timer);
    }
}

const LooksSection = () => {
  const [manageTime, setManageTime] = useState(2);
  const [size, setSize] = useState(0); // Size increment value
  const [message, setMessage] = useState("Hello!");
  const [showMessage, setShowMessage] = useState(false);
  const [bubblePosition, setBubblePosition] = useState({ top: 0, left: 0 });
  const dispatch = useDispatch();

  const handleDragStart = (e, actionType) => {
    e.dataTransfer.setData("actionType", actionType);
    if (actionType === 'show' || actionType === 'hide') {
      e.dataTransfer.setData("value", null);
    } else if (actionType === 'say') {
      e.dataTransfer.setData("value", `${message}_${manageTime}`);
    }
  };

  const handleHide = () => {
    const el = document.getElementById("character0-0");
    if (el) {
      dispatch(QueueAction("ENQUEUE", "hide"));
    }
    hideSprite();
  };

  const handleShow = () => {
    showSprite();
    dispatch(QueueAction("ENQUEUE", "show"));
  };

  const handleSay = () => {
    showMessageBubble(showMessage, manageTime, dispatch);
    dispatch(QueueAction("ENQUEUE", `say ${message}_${manageTime}`));
  };


  const handleSetMessage = (e) => {
    dispatch(QueueAction("SET_MESSAGE", e.target.value));
    setMessage(e.target.value);
  }

  const handleSetManageTime = (e) => {
    // dispatch(QueueAction("SET_MANAGE_TIME", parseInt(e.target.value)));
    console.log("event: ", e.target.value)
    console.log("type of val: ", typeof e.target.value)
    if(e.target.value == ""){
      console.log(e)
      setManageTime(0);
      return;
    }
    setManageTime(parseInt(e.target.value))
  }

  return (
    <Fragment>
      <div className="font-bold">{"Looks"}</div>
      <div
        className="action-block flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded"
        draggable
        onDragStart={(e) => handleDragStart(e, 'show')}
        onClick={handleShow}
      >
        {"Show"}
      </div>
      <div
        className="action-block flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded"
        draggable
        onDragStart={(e) => handleDragStart(e, 'hide')}
        onClick={handleHide}
      >
        {"Hide"}
      </div>
      <div
        className="action-block flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer rounded"
        draggable
        onDragStart={(e) => handleDragStart(e, 'say')}
        onClick={handleSay}
      >
        <span>{"Say"}</span>
        <input
          value={message}
          onChange={(e) => handleSetMessage(e)}
          onClick={(e) => e.stopPropagation()}
          className="text-black w-12 text-center mx-2 border border-white bg-white rounded-full"
        />
        <span>{"for"}</span>
        <input
          value={manageTime}
          onChange={(e) => handleSetManageTime(e)}
          onClick={(e) => e.stopPropagation()}
          className="text-black w-6 text-center mx-2 border border-white bg-white rounded-full"
        />
        <span>{"seconds"}</span>
      </div>
    </Fragment>
  );
};

export default LooksSection;
