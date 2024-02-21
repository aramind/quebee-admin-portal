const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, currentUser: action.payload, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, currentUser: null, isLoggedIn: false };
    default:
      throw new Error("No matched action");
  }
};

export default globalReducer;
