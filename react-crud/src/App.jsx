import { useState } from "react";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 45000,
      quantity: 5,
    },
    {
      id: 2,
      name: "T-Shirt",
      category: "Clothing",
      price: 500,
      quantity: 20,
    },
    {
      id: 3,
      name: "Mouse",
      category: "Electronics",
      price: 800,
      quantity: 10,
    },
  ]);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceCondition, setPriceCondition] = useState("all");
  const [priceAmount, setPriceAmount] = useState("");

  const categories = [...new Set(products.map((product) => product.category))]
    .filter(Boolean)
    .sort((first, second) => first.localeCompare(second));

  const filteredProducts = products.filter((product) => {
    const searchTerm = nameFilter.trim().toLowerCase();
    const matchesName = product.name
      .toLowerCase()
      .includes(searchTerm);
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const amount = Number(priceAmount);
    const matchesPrice =
      priceCondition === "all" ||
      priceAmount === "" ||
      (priceCondition === "greater" && product.price > amount) ||
      (priceCondition === "less" && product.price < amount) ||
      (priceCondition === "equal" && product.price === amount);

    return matchesName && matchesCategory && matchesPrice;
  });

  function addProduct() {
    const newProduct = {
      id: products.length + 1,
      name: productName,
      category,
      price: Number(price),
      quantity: Number(quantity),
    };

    setProducts([...products, newProduct]);
    setProductName("");
    setCategory("");
    setPrice("");
    setQuantity("");
  }

  function editProduct(product) {
    setEditingId(product.id);
    setProductName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setQuantity(product.quantity);
  }

  function updateProduct() {
    const updatedProducts = products.map((product) => {
      if (product.id === editingId) {
        return {
          ...product,
          name: productName,
          category,
          price: Number(price),
          quantity: Number(quantity),
        };
      }

      return product;
    });

    setProducts(updatedProducts);
    setEditingId(null);
    setProductName("");
    setCategory("");
    setPrice("");
    setQuantity("");
  }

  function deleteProduct(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    setProducts(products.filter((product) => product.id !== id));
  }

  function clearFilters() {
    setNameFilter("");
    setCategoryFilter("all");
    setPriceCondition("all");
    setPriceAmount("");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">Product Management</h1>

      {/* ADD PRODUCT FORM */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">
          {editingId === null ? "Add Product" : "Edit Product"}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium">Product Name</label>
            <input
              type="text"
              className="w-full rounded border p-2"
              placeholder="Enter product name"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Category</label>
            <input
              type="text"
              className="w-full rounded border p-2"
              placeholder="Enter category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Price</label>
            <input
              type="number"
              className="w-full rounded border p-2"
              placeholder="Enter price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Quantity</label>
            <input
              type="number"
              className="w-full rounded border p-2"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>

        </div>

        <button
          onClick={editingId === null ? addProduct : updateProduct}
          className="mt-4 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          {editingId === null ? "Add Product" : "Update Product"}
        </button>
      </div>

      {/* PRODUCT FILTERS */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold">Search Products</h2>
          <button
            onClick={clearFilters}
            className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            Clear Filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block font-medium">Product Name</label>
            <input
              type="search"
              className="w-full rounded border p-2"
              placeholder="Search product name..."
              value={nameFilter}
              onChange={(event) => setNameFilter(event.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Category</label>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full rounded border bg-white p-2"
            >
              <option value="all">All categories</option>
              {categories.map((productCategory) => (
                <option key={productCategory} value={productCategory}>
                  {productCategory}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">Price Condition</label>
            <select
              value={priceCondition}
              onChange={(event) => setPriceCondition(event.target.value)}
              className="w-full rounded border bg-white p-2"
            >
              <option value="all">All prices</option>
              <option value="greater">Greater than (&gt;)</option>
              <option value="less">Less than (&lt;)</option>
              <option value="equal">Equal to (=)</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">Price Amount (₱)</label>
            <input
              type="number"
              min="0"
              className="w-full rounded border p-2"
              placeholder="Enter amount"
              value={priceAmount}
              onChange={(event) => setPriceAmount(event.target.value)}
            />
          </div>
        </div>

        <p className="mt-4 text-gray-600">
          Products found: <strong className="text-blue-600">{filteredProducts.length}</strong>
        </p>
      </div>

      {/* PRODUCT TABLE */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
         <h2 className="m-4 text-xl font-bold">Product List</h2>
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-3">{product.id}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">₱{product.price.toLocaleString()}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">
                  <button
                    onClick={() => editProduct(product)}
                    className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="ml-2 rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="6">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">About My Shop</h2>
        <p className="text-gray-600">Hi</p>
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Contact</h2>
        <p className="text-gray-600">Hello</p>
      </div>
    </div>
  );
}

export default App;




