
import React, {useEffect, useState} from 'react';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import './App.css';
import AddItem from './Components/AddItem';
import apiRequest from './Components/API_Request';

function App() {
  const API_URL = "http://localhost:3001/items";
  const [newItem, setNewItem] = useState("");
  const [items, setItem] = useState([]);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    const fethItems = async () => {
      try{
        const response = await fetch(API_URL);
        const listItems = await response.json();
        setItem(listItems);
      }
      catch(err) {
        //console.log(err.stack);
      }
      finally {
        setLoading(false);
      }
    }
    setTimeout(function() {
      (async () => await fethItems())();
    }, 2000);
  }, []);

  const handleCheck = async (itemId) => {
    const listItems = items.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setItem(listItems);

    const myItem = listItems.filter(item =>item.id === itemId);

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }

    const url = `${API_URL}/${itemId}`;
    const result = await apiRequest(url, updateOptions);
    if(result) console.log(result);

  };

  const handleRemoveField = async (itemId) => {
    const listItems = items.filter((item) => item.id !== itemId);
    setItem(listItems);

    const updateOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const url = `${API_URL}/${itemId}`;
    const result = await apiRequest(url, updateOptions);
    if(result) console.log(result);
  };

  const handleSubmit = (e) => {
    if (!newItem) return;
    addItem(newItem);      
    setNewItem('');
    e.preventDefault();
  };

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addItemList = {id, checked: false, item};
    const listItems = [...items, addItemList];
    setItem(listItems);
    
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addItemList)
    }

    const result = await apiRequest(API_URL, postOptions);
    if(result) console.log(result);
  }

  return (
    <div className='App'>
      <Header />
      <AddItem 
      newItem = {newItem}
      setNewItem = {setNewItem}
      handleSubmit = {handleSubmit}
      />
      {isLoading && <p>Items Loading...</p>}
      {!isLoading && 
      <Content 
      items={items}
      handleCheck = {handleCheck}
      handleRemoveField = {handleRemoveField}
      />
      }
      <Footer />
    </div>
  );
}

export default App;
