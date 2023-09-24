import React from "react";
import ItemList from "./ItemList";


const Content = ({items, handleCheck, handleRemoveField}) => {  

  return (
    <main>
      {(!items.length) ? 
      <h1>No items found</h1> :
      <ItemList 
      items={items}
      handleCheck = {handleCheck}
      handleRemoveField = {handleRemoveField}
      />
      }
    </main>
  );
};

export default Content;
