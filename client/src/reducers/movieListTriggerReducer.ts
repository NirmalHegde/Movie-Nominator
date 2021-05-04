const movieListTriggerReducer = (state = false, action: any): any => {
  switch (action.type) {
  case "SHOWLIST":
    return !state;
  default:
    return state;
  }
};

export default movieListTriggerReducer;
