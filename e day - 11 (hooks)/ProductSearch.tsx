// import { useState, useMemo } from 'react';
// function ProductList({ products, searchTerm }) {
//   const [count, setCount] = useState(0); // unrelated state

//   const filteredProducts = useMemo(() => {
//     console.log('Filtering...'); // only logs when products or searchTerm change
//     return products.filter(p =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [products, searchTerm]);

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
//       <ul>
//         {filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
//       </ul>
//     </>
//   );
// }
import { useState, useMemo } from "react";

function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);

  const products = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Mango" },
    { id: 5, name: "Grapes" },
  ];

  const filteredProducts = useMemo(() => {
    console.log("Filtering...");
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div>
      <h2>Product Search</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <br />
      <br />

      <button onClick={() => setCount((c) => c + 1)}>
        Clicked {count} times
      </button>

      <h3>Products</h3>

      <ul>
        {filteredProducts.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;