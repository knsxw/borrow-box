"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import type { Item } from "@/lib/mock-data";
import { PostItemModal } from "@/components/post-item-modal";

export default function ItemDetailPage() {
  const params = useParams(); // get id from URL
  const router = useRouter();
  const { user } = useAuth();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`${API_URL}/items/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch item");
        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [params.id]);

  const handleBorrow = async () => {
    if (!user) return alert("Please login first!");

    try {
      const res = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item.id, // make sure this matches frontend `id`
          borrower: user.name,
          owner: item.owner,
        }),
      });
      if (!res.ok) throw new Error("Failed to borrow item");
      alert("Borrow request sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to borrow item");
    }
  };

  const handleDelete = async (itemId: String) => {
    if (!user) return;

    try {
      const res = await fetch(`${API_URL}/items/${itemId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner: user.name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("Item deleted!");
      router.push("/");
      // Refresh list
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEdit = () => {
    setEditingItem(item); // store the item being edited
    setShowPostModal(true); // redirect to your edit page
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.category}</CardDescription>
        </CardHeader>
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          className="w-full h-64 object-cover"
        />
        <CardContent>
          <p className="text-muted-foreground mb-4">{item.description}</p>
          <div className="flex space-x-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {item.location}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {item.duration}
            </div>
          </div>

          {/* Borrow / Edit / Delete */}
          {user?.name === item.owner ? (
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={handleEdit}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={handleBorrow}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Borrow
            </Button>
          )}
        </CardContent>
      </Card>
      <PostItemModal
        isOpen={showPostModal}
        onClose={() => {
          setShowPostModal(false);
          setEditingItem(null);
        }} // reset editing item on close
        itemToEdit={editingItem}
      />
    </div>
  );
}
