import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  moveSprite,
  turnSprite,
  glideSprite,
} from "../SideBar/MotionSection/MotionSection";
import {
  hideSprite,
  showSprite,
  saySprite,
  changeSpriteSize
} from "../SideBar/LooksSection/LookSection";
import QueueAction from "../actions";
import Icon from "../Icon";

const handleActionReplay = (command) => {
  const actionName = command.split(" ")[0];
  const actionValue = command.split(" ")[1];
  switch (actionName) {
    case "move_right":
      moveSprite(actionValue);
      break;
    case "turn_left":
      turnSprite(actionValue, "left");
      break;
    case "turn_right":
      turnSprite(actionValue, "right");
      break;
    case "glide":
      const args = actionValue.split("_");
      glideSprite(Number(args[0]), Number(args[1]), Number(args[2]));
      break;
    case "hide":
      hideSprite();
      break;
    case "show":
      showSprite();
      break;
    case "changesize":
      changeSpriteSize(actionValue);
      break;
  }
};

function executeCommandsWithDelay(commands, dispatch, delay) {
  let i = 0;

  function nextCommand() {
    if (i < commands.length) {
      handleActionReplay(commands[i]);
      i++;
      dispatch(QueueAction("DEQUEUE", {}));
      setTimeout(nextCommand, delay);
    }
  }

  nextCommand();
}

const Replay = () => {
  const previousActions = useSelector((state) => state.previousActions);
  const dispatch = useDispatch();
  const handleReplay = () => {
    executeCommandsWithDelay(previousActions, dispatch, 1000); // 1000ms = 1 second delay
  };

  const performAction = (command) => {
    console.log("action to perform: ", command);
    handleActionReplay(command);
  }

  return (
    <Fragment>
      <div className="font-bold"> {"Replay History"} </div>
      <div
        className="flex flex-row flex-wrap text-white px-2 py-1 my-2 cursor-pointer rounded items-center text-xs"
        onClick={handleReplay}
        style={{ backgroundColor: "#0891b2" }}
      >
        {"Replay All"}
        <Icon name="play" size={15} className="text-white mx-2 mt-1 mb-1" />
      </div>

      {previousActions.map((action, index) => {
        return (
          <div
            className="flex flex-col flex-wrap text-white px-2 py-1 my-2 cursor-pointer rounded items-center text-xs"
            style={{ backgroundColor: "#22d3ee" }}
            onClick={()=>{performAction(action)}}
          >
            <div key={index}>{action}</div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Replay;
