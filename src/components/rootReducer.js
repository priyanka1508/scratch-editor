const initialState = {
  bubblePosition: { top: 0, left: 0 },
  showMessage: false,
  message: "Hello!",
  previousActions: [ 
    // 'move_right 10', 
    // 'move_right 10', 
    // 'move_right 10', 
    // 'move_right 10', 
    // 'move_right 10', 
    // 'move_right 10', 
    // 'move_right 10', 
    // 'move_right 10', 
    // 'turn_left 23', 
    // 'turn_left 46', 
    // 'turn_right 1', 
    // 'turn_right 44', 
    // 'turn_right 89', 
    // 'turn_right 134',
    // 'turn_right 179', 
    // 'move_right 10', 
    // 'move_right 10'
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ENQUEUE':
      return {
        ...state,
        previousActions: [...state.previousActions, action.payload],
      };
    case 'DEQUEUE':
      return {
        ...state,
        previousActions: state.previousActions.slice(1),
      };
    case 'SET_BUBBLE_POSITION':
      return {
        ...state,
        bubblePosition: action.payload,
      };
    case 'SET_SHOW_MESSAGE':
      return {
        ...state,
        showMessage: action.payload,
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};


export default rootReducer;