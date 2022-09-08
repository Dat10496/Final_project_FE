import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  admin: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";

const AuthContext = createContext({ initialState });

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload.admin,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload.admin,
      };
    case INITIALIZE:
      const { isAuthenticated, admin } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        admin,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
      };

    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await apiService.get("/admin");
          console.log(response);
          const admin = response.data.data;
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, admin },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, admin: null },
          });
        }
      } catch (error) {}
    };
    initialize();
  }, []);

  const register = async ({ name, email, password }, callback) => {
    const response = await apiService.post("/admin", { name, email, password });
    const { admin, accessToken } = response.data.data;

    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { admin },
    });

    callback();
  };

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/admin/login", {
      email,
      password,
    });
    const { admin, accessToken } = response.data.data;

    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { admin },
    });

    callback();
  };

  const logout = async (callback) => {
    setSession(null);
    dispatch({
      type: LOGOUT,
    });

    callback();
  };

  return (
    <AuthContext.Provider value={{ ...state, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
