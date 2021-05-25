import React from "react";
import CartCss from "./Cart.module.css";
import { FiShoppingCart as CartIcon } from "react-icons/fi";
import { AppStateContext } from "./AppState";
interface Props {}

interface State {
  isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.target);
    console.log(e.currentTarget);
    if ((e.target as HTMLElement).nodeName === "SPAN") {
      //(e.target as HTMLSpanElement).offsetHeight
    }
    this.setState((state) => {
      return {
        isOpen: !state.isOpen,
      };
    });
  };
  render() {
    return (
      <AppStateContext.Consumer>
        {(state) => {
          return (
            <div className={CartCss.cartContainer}>
              <button
                type="button"
                className={CartCss.button}
                onClick={this.handleClick}
              >
                <CartIcon />
                <span>{state.cart.items.length} Pizza(s)</span>
              </button>
              <div
                className={CartCss.cartDropDown}
                style={{ display: this.state.isOpen ? "block" : "none" }}
              >
                <ul>
                  {state.cart.items.map((item) => {
                    return (
                      <li key={item?.id}>
                        {item?.name} &times; {item?.quantity}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        }}
      </AppStateContext.Consumer>
    );
  }
}

export default Cart;
