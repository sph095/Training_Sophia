import { useState } from "react";

function ItemList() {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = () => {
    setItems(prev => [...prev, prev.length + 1]);
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>

      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;