import React, { useReducer } from "react";

const initialStoreState = {
  meals: [],
  restaurant: null,
  cartVisible: false,
};

const StoreReducer = (State, action) => {
  switch (action.type) {
    case "UPDATE_CART_RESTAURANT":{
      return {
          ...State,
          restaurant: action.restaurant
      };
    }
    case "UPDATE_CART_MEALS":{
      return {
          ...State,
          meals: [...action.meals]
      };
    }
    case "TOOGLE_CART":{
      return {
          ...State,
          cartVisible: !State.cartVisible
      };
    }
    case "RESET_CART":{
      return {
          ...initialStoreState
      };
    }
    default:
      throw new Error(`Unhandled action type`);
  }
};


const StoreStateContext = React.createContext(initialStoreState);
const StoreDispatchContext = React.createContext(() => null);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StoreReducer, initialStoreState);
  
  const values = {
    meals: state.meals,
    restaurant: state.restaurant,
    cartVisible: state.cartVisible
  }
  
  return (
    <StoreStateContext.Provider value={values}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
};

export function useStoreState() {
  const context = React.useContext(StoreStateContext);
  if (context === undefined) {
    throw new Error("useStoreState must be used within a StoreProvider");
  }

  return context;
}

export function useStoreDispatch() {
  const context = React.useContext(StoreDispatchContext);
  if (context === undefined) {
    throw new Error("useStoreDispatch must be used within a StoreProvider");
  }

  return context;
}
