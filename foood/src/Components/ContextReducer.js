import React, { createContext, useContext, useReducer } from "react";

const CartState = createContext();
const CartDispatch = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      let newarr = [...state];
      newarr.splice(action.index, 1);
      return newarr;
    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(food.qty, parseInt(action.qty));
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;
    case "DROP":
      let emptyarr = [];
      return emptyarr;

    default:
      console.log("error in reducer");
  }
};

export const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatch.Provider value={dispatch}>
      <CartState.Provider value={state}>{children}</CartState.Provider>
    </CartDispatch.Provider>
  );
};

export const useCart = () => useContext(CartState);

export const useDispatch = () => useContext(CartDispatch);
