import { useState } from "react";
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";

const INITIAL_CART = [];
const INITIAL_STATE = {
  cart: INITIAL_CART,
};

// Load cart from session storage
const loadCartFromStorage = () => {
  if (typeof window !== "undefined") {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? { cart: JSON.parse(savedCart) } : INITIAL_STATE;
  }
  return INITIAL_STATE;
};

const AppContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        newState = { ...state, cart: filteredCart };
      } else if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
        );
        newState = { ...state, cart: newCart };
      } else {
        newState = { ...state, cart: [...cartList, cartItem] };
      }

      // Save to session storage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("cart", JSON.stringify(newState.cart));
      }
      return newState;
    case "RESET_CART":
      let list = state.cart;
      const ids = JSON.parse(sessionStorage.getItem("ids"));
      if (ids) {
        const newCart = list.filter((item) => ids.indexOf(item.id) === -1);
        newState = { ...state, cart: newCart };
        if (typeof window !== "undefined") {
          sessionStorage.setItem("cart", JSON.stringify(newState.cart));
          sessionStorage.removeItem("ids");
        }
        return newState;
      } else {
        return state;
      }
    default: {
      return state;
    }
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
    loadCartFromStorage
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync state with session storage on mount
  useEffect(() => {
    if (state.cart.length > 0) {
      sessionStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );
  if (!isMounted) {
    return null;
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppContext;
