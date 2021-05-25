import React, { useContext } from "react";
import PizzaCss from "./Pizza.module.css";
import { useSetState } from "./AppState";

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Props {
  pizza: Pizza;
}

const Pizza: React.FC<Props> = ({ pizza }) => {
  const setState = useSetState();
  function handleAddToCartClick() {
    setState((state) => {
      
    });
  }
  return (
    <li className={PizzaCss.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <button type="button" onClick={handleAddToCartClick}>
        Add to cart
      </button>
    </li>
  );
};

export default Pizza;
