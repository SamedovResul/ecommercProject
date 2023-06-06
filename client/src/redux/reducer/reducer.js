const reducer = (state = { data: [], img: "" }, action) => {
  let { data } = state;
  switch (action.type) {
    case "GETPRODUCTS":
      return { ...state, data: action.payload };
    case "UPLOAD_IMG":
      return { ...state, img: action.payload };
    case "CREATE_PRODUCT":
      data.push(action.payload);
      return { ...state, data, img: '' };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        data: data.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        data: data.filter((data) => data._id !== action.payload),
      };
    case "DELETE_IMG":
      return { ...state, img: "" };
    default:
      return state;
  }
};

export default reducer;
