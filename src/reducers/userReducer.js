const SET_STUDENT = "SET_STUDENT";
const SET_ADMIN = "SET_ADMIN";
const SET_LECTOR = "SET_LECTOR";
const LOGOUT = "LOGOUT";

const defaultState = {
  currentUser: {},
  isAuth: false,
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_STUDENT:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };

    case SET_ADMIN:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    case SET_LECTOR:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      };
    default:
      return state;
  }
}

export const setStudent = (user) => ({ type: SET_STUDENT, payload: user });
export const setAdmin = (user) => ({ type: SET_ADMIN, payload: user });
export const setLector = (user) => ({ type: SET_LECTOR, payload: user });
export const logout = () => ({ type: LOGOUT });
