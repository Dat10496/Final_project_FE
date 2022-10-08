import { useReducer, createContext, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  cart: [],
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const lOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const ADDTOCART = "AUTH.ADDTOCART";
const PAYMENTSUCCESS = "AUTH.PAYMENTSUCCESS";

const AuthContext = createContext({ ...initialState });

const reducer = (state, action) => {
  switch (action.type) {
    case lOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        cart: action.payload.cart,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        cart: action.payload.cart,
      };
    case INITIALIZE:
      const { isAuthenticated, user, cart } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
        cart,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        cart: [],
      };
    case ADDTOCART:
      return {
        ...state,
        cart: action.payload.user.cart,
      };
    case PAYMENTSUCCESS: {
      return {
        ...state,
        cart: [],
      };
    }

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

          const response = await apiService.get("/users");
          const user = response.data.data;
          const cart = user.cart;

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, cart, user },
          });
        } else {
          setSession(null);

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null, cart: [] },
          });
        }
      } catch (error) {
        setSession(null);

        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null, cart: [] },
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });

    const { user, accessToken } = response.data.data;
    const cart = user.cart;

    setSession(accessToken);
    dispatch({
      type: lOGIN_SUCCESS,
      payload: { user, cart },
    });

    callback();
  };

  const register = async ({ name, email, password }, callback) => {
    const response = await apiService.post("/users", { name, email, password });
    const { user, accessToken } = response.data.data;
    const cart = user.cart;

    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user, cart },
    });
    callback();
  };

  const logout = (callback) => {
    setSession(null);

    dispatch({
      type: LOGOUT,
    });

    callback();
  };

  const addCart = async ({ cart, userId }) => {
    try {
      const response = await apiService.put(`/users/addcart/${userId}`, {
        cart,
      });
      const { user } = response.data.data;
      dispatch({
        type: ADDTOCART,
        payload: { user },
      });
    } catch (error) {
      console.log(error, "addCart error");
    }
  };

  const paymentSuccess = async ({ details, user, cart }) => {
    try {
      await apiService.post("/payment", { details, user, cart });

      dispatch({
        type: PAYMENTSUCCESS,
      });
    } catch (error) {
      console.log(error, "Payment error");
    }
  };
  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, addCart, paymentSuccess }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
