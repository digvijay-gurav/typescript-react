import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useReducer,
} from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
interface AppStateValue {
  cart: {
    items: CartItem[];
  };
}

const defaultStateValue: AppStateValue = {
  cart: {
    items: [],
  },
};
export const AppStateContext = createContext(defaultStateValue);

export const AppSetStateContext = createContext<
  Dispatch<AppStateValue> | undefined
>(undefined);

export const useSetState = () => {
  const setState = useContext(AppSetStateContext);
  if (!setState) {
    throw new Error(
      "useSetState was called outside of the AppSetStateContext provider"
    );
  }
  return setState;
};

interface Action<T> {
  type: T;
}
interface AddToCartAction extends Action<"ADD TO CART"> {
  payload: {
    item: CartItem;
  };
}
const reducer = (
  state: AppStateValue,
  action: AddToCartAction
): AppStateValue => {
  if (action.type === "ADD TO CART") {
    const itemToAdd = action.payload.item;
    const itemExists = state.cart.items.find(
      (item) => item?.id === itemToAdd?.id
    );
    return {
      ...state,
      cart: {
        ...state.cart,
        items: itemExists
          ? state.cart.items.map((item) => {
              if (item?.id === itemToAdd?.id) {
                return {
                  ...item,
                  quantity: item.quantity + 1,
                };
                return item;
              }
            })
          : [...state.cart.items, itemToAdd],
      },
    };
  }
  return state;
};
const AppStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultStateValue);
  return (
    <AppStateContext.Provider value={state}>
      <AppSetStateContext.Provider value={dispatch}>
        {children}
      </AppSetStateContext.Provider>
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
