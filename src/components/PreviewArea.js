import React, { useState, useRef } from "react";
import CatSprite from "./CatSprite";
import Queue from "./DataStructure/Queue/Queue";
import { useSelector } from "react-redux";

const PreviewArea = () => {
  const [characters, setCharacters] = useState([{ id: "character0" }]);

  const message = useSelector((state) => state.message);
  const showMessage = useSelector((state) => state.showMessage);
  const bubblePosition = useSelector((state) => state.bubblePosition);
  
  
  const dragItem = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  

  const handleMouseDown = (e, id) => {
    const element = document.getElementById(id);
    dragItem.current = element;

    const rect = element.getBoundingClientRect();
    const parentRect = element.parentElement.getBoundingClientRect();
    const container = element.parentElement.parentElement;
    dragOffset.current = {
      x: e.clientX - rect.left + parentRect.left,
      y: e.clientY - rect.top + parentRect.top,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragItem.current) return;

    const newX = e.clientX - dragOffset.current.x;
    const newY = e.clientY - dragOffset.current.y;

    dragItem.current.style.left = `${newX}px`;
    dragItem.current.style.top = `${newY}px`;
    dragItem.current.style.position = 'absolute';
  };

  const handleMouseUp = () => {
    dragItem.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="w-full flex-none h-full overflow-y-auto p-2 relative" id="preview_area">
      <div className="flex justify-around h-full relative">
        {characters.map((character, i) => (
          <div
            key={i}
            className="absolute"
            style={{ top: "0px", left: "0px" }}
            onMouseDown={(e) => handleMouseDown(e, `${character.id}-${i}`)}
          >
            <div id={`${character.id}-${i}`}>
            {showMessage && (
              <div
                className="bg-white border border-black rounded px-2 py-1"
                style={{ top: bubblePosition.top, left: bubblePosition.left, display: bubblePosition.show }}
              >
                {message}
              </div>
            )}
            {}
            {/* <CatSprite width={"95.17898101806641"} height={"100.04156036376953"} /> */}
            <CatSprite width={"50%"} height={"50%"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewArea;
