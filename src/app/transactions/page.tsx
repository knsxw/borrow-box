"use client";

import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [itemId, setItemId] = useState("");
  const [borrowerId, setBorrowerId] = useState("");
  const [status, setStatus] = useState("ongoing");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    setTransactions(await res.json());
  };

  const addTransaction = async () => {
    await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({ item: itemId, borrower: borrowerId, status }),
    });
    resetForm();
    fetchTransactions();
  };

  const deleteTransaction = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    fetchTransactions();
  };

  const startEdit = (tx: any) => {
    setEditingId(tx._id);
    setItemId(tx.item);
    setBorrowerId(tx.borrower);
    setStatus(tx.status);
  };

  const updateTransaction = async () => {
    await fetch(`/api/transactions/${editingId}`, {
      method: "PUT",
      body: JSON.stringify({ item: itemId, borrower: borrowerId, status }),
    });
    resetForm();
    fetchTransactions();
  };

  const resetForm = () => {
    setEditingId(null);
    setItemId("");
    setBorrowerId("");
    setStatus("ongoing");
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Item ID"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Borrower ID"
          value={borrowerId}
          onChange={(e) => setBorrowerId(e.target.value)}
        />
        <select
          className="border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ongoing">Ongoing</option>
          <option value="returned">Returned</option>
        </select>
        {editingId ? (
          <button
            onClick={updateTransaction}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={addTransaction}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li
            key={tx._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              Item: {tx.item} | Borrower: {tx.borrower} | Status: {tx.status}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(tx)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTransaction(tx._id)}
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
