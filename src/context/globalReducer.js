const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SET_ALLOWED":
      return { ...state, allowed: action.payload };
    case "LOGOUT":
      return { ...state, currentUser: null, currentUserRole: null };
    default:
      throw new Error("No matched action");
  }
};

export default globalReducer;
