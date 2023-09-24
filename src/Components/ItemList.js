import React from 'react';
import { FaTrashAlt } from "react-icons/fa";

const ItemList = ({items, handleCheck, handleRemoveField}) => {
  return (
    <ul>
        {items.map((item) => (
          <li className="item" key={item.id}>
            <input
              type="checkbox"
              checked={item.checked}
              onClick={() => handleCheck(item.id)}
            />
            <label tabIndex="0">{item.item}</label>
            <FaTrashAlt
              role="button"
              tabIndex="0"
              onClick={() => handleRemoveField(item.id)}
            />
          </li>
        ))}
      </ul>
  )
}

export default ItemList;
