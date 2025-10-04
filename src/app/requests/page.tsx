"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function RequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]); // requests for me (owner)
  const [myRequests, setMyRequests] = useState<any[]>([]); // requests I made (borrower)
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
  // Fetch requests where I'm the owner
  useEffect(() => {
    if (!user) return;
    async function fetchOwnerRequests() {
      try {
        const res = await fetch(`${API_URL}/transactions?owner=${user?.name}`);
        if (!res.ok) throw new Error("Failed to fetch owner requests");
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchOwnerRequests();
  }, [user]);

  // Fetch requests where I'm the borrower
  useEffect(() => {
    if (!user) return;
    async function fetchBorrowerRequests() {
      try {
        const res = await fetch(
          `${API_URL}/transactions?borrower=${user?.name}`
        );
        if (!res.ok) throw new Error("Failed to fetch borrower requests");
        const data = await res.json();
        setMyRequests(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBorrowerRequests();
  }, [user]);

  if (!user) {
    return (
      <p className="text-center py-8">You must log in to view requests.</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* --- Owner Requests Section --- */}
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        ← Back
      </Button>

      <section>
        <h2 className="text-3xl font-bold mb-8">Requests for My Items</h2>
        {requests.length === 0 ? (
          <p className="text-muted-foreground">
            No one has requested your items yet.
          </p>
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
                      <Link href={`/item/${req.item?._id}`}>
                        <CardTitle>
                          {req.item?.title || "Unknown Item"}
                        </CardTitle>
                      </Link>
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
                  {req.status === "pending" && (
                    <div className="flex space-x-2 mt-4">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={async () => {
                          await fetch(`${API_URL}/transactions/${req._id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status: "accepted" }),
                          });
                          setRequests((prev) =>
                            prev.map((r) =>
                              r._id === req._id
                                ? { ...r, status: "accepted" }
                                : r
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
                          await fetch(`${API_URL}/transactions/${req._id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status: "rejected" }),
                          });
                          setRequests((prev) =>
                            prev.map((r) =>
                              r._id === req._id
                                ? { ...r, status: "rejected" }
                                : r
                            )
                          );
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* --- Borrower Requests Section --- */}
      {user && myRequests.length > 0 && (
        <section className="border-t pt-12">
          <h2 className="text-3xl font-bold mb-8">My Borrow Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRequests.map((req) => (
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
                        Owned by <b>{req.owner}</b>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
