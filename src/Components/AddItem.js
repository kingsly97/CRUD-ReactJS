import React, { useRef } from "react";
import { FaPlus } from "react-icons/fa";

const AddItem = ({newItem, handleSubmit, setNewItem}) => {  

  const inputRef = useRef()

  return (
    <form className="addform" onSubmit={(e) => handleSubmit(e)}>
      <label>Add Item</label>
      <input
      autoFocus
      ref={inputRef}
        type="text"
        placeholder="add item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        required
      />
      <button 
        type="submit"
        onClick = {() => inputRef.current.focus()} 
        >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
