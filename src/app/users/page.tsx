"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    setUsers(await res.json());
  };

  const addUser = async () => {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email }),
    });
    setName("");
    setEmail("");
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const startEdit = (user: any) => {
    setEditingId(user._id);
    setName(user.name);
    setEmail(user.email);
  };

  const updateUser = async () => {
    await fetch(`/api/users/${editingId}`, {
      method: "PUT",
      body: JSON.stringify({ name, email }),
    });
    setEditingId(null);
    setName("");
    setEmail("");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {editingId ? (
          <button
            onClick={updateUser}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={addUser}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {user.name} ({user.email})
            </span>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(user)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user._id)}
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
