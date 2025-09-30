"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function RequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    async function fetchRequests() {
      try {
        const res = await fetch(`/api/transactions?owner=${user?.name}`);
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchRequests();
  }, [user]);

  if (!user) {
    return (
      <p className="text-center py-8">You must log in to view requests.</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Borrow Requests</h2>
      {requests.length === 0 ? (
        <p className="text-muted-foreground">No requests yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <Card key={req._id} className="border-2 hover:border-emerald-200">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <img
                    src={req.item?.image || "/placeholder.svg"}
                    alt={req.item?.title || "Item"}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <CardTitle>{req.item?.title || "Unknown Item"}</CardTitle>
                    <CardDescription>
                      Requested by <b>{req.borrower}</b>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {req.item?.description || "No description"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Status:{" "}
                  <span className="font-medium capitalize">{req.status}</span>
                </p>
                <div className="flex space-x-2 mt-4">
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={async () => {
                      await fetch(`/api/transactions/${req._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: "accepted" }),
                      });
                      setRequests((prev) =>
                        prev.map((r) =>
                          r._id === req._id ? { ...r, status: "accepted" } : r
                        )
                      );
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      await fetch(`/api/transactions/${req._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: "rejected" }),
                      });
                      setRequests((prev) =>
                        prev.map((r) =>
                          r._id === req._id ? { ...r, status: "rejected" } : r
                        )
                      );
                    }}
                  >
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
