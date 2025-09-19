"use client";

import { useEffect, useState } from "react";

export default function ItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch items
  const fetchItems = async () => {
    const res = await fetch("/api/items");
    setItems(await res.json());
  };

  // Add item
  const addItem = async () => {
    await fetch("/api/items", {
      method: "POST",
      body: JSON.stringify({ name, category }),
    });
    setName("");
    setCategory("");
    fetchItems();
  };

  // Delete item
  const deleteItem = async (id: string) => {
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    fetchItems();
  };

  // Edit item
  const startEdit = (item: any) => {
    setEditingId(item._id);
    setName(item.name);
    setCategory(item.category);
  };

  const updateItem = async () => {
    await fetch(`/api/items/${editingId}`, {
      method: "PUT",
      body: JSON.stringify({ name, category }),
    });
    setEditingId(null);
    setName("");
    setCategory("");
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Items</h1>

      {/* Add / Edit Form */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {editingId ? (
          <button
            onClick={updateItem}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={addItem}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        )}
      </div>

      {/* List */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {item.name} ({item.category})
            </span>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(item)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
