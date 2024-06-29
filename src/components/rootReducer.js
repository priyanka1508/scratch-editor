const initialState = {
  previousActions: [ 
    'move_right 10', 
    'move_right 10', 
    'move_right 10', 
    'move_right 10', 
    'move_right 10', 
    'move_right 10', 
    'move_right 10', 
    'move_right 10', 
    'turn_left -23', 
    'turn_left -46', 
    'turn_right -1', 
    'turn_right 44', 
    'turn_right 89', 
    'turn_right 134',
    'turn_right 179', 
    'move_right 10', 
    'move_right 10'
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ENQUEUE':
      return {
        previousActions: [...state.previousActions, action.payload],
      };
    case 'DEQUEUE':
      return {
        previousActions: state.previousActions.slice(1),
      };
    default:
      return state;
  }
};


export default rootReducer;