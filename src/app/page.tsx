"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MapPin, Clock, LogIn, Plus } from "lucide-react";
import { AuthModal } from "@/components/auth-modal";
import { PostItemModal } from "@/components/post-item-modal";
import { useAuth } from "@/hooks/use-auth";
import { mockItems } from "@/lib/mock-data";

export default function HomePage() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [filteredItems, setFilteredItems] = useState(mockItems);

  useEffect(() => {
    const filtered = mockItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery]);

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handlePostItem = () => {
    if (!user) {
      setAuthMode("login");
      setShowAuthModal(true);
      return;
    }
    setShowPostModal(true);
  };

  const handleBorrowRequest = (itemId: string) => {
    if (!user) {
      setAuthMode("login");
      setShowAuthModal(true);
      return;
    }
    // Handle borrow request logic here
    alert("Borrow request sent!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <img
                  src="/borrow-box-icon.png"
                  alt="icon"
                  className="w-8 h-8"
                />
              </div>
              <h1 className="text-xl font-bold text-foreground">Borrow Box</h1>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button
                    onClick={handlePostItem}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Post Item
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                    <Button variant="ghost" size="sm" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleAuthClick("login")}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button onClick={() => handleAuthClick("signup")}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Borrow, Share, Connect
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Discover items from your community. Lend what you don't use, borrow
            what you need.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for items to borrow..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-background/80 backdrop-blur-sm border-2 focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-foreground">
              Available Items
            </h3>
            <p className="text-muted-foreground">
              {filteredItems.length} items available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-emerald-200 dark:hover:border-emerald-800"
              >
                <CardHeader className="p-0">
                  <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg font-semibold text-foreground line-clamp-1">
                      {item.title}
                    </CardTitle>
                    <Badge variant="secondary" className="ml-2 shrink-0">
                      {item.category}
                    </Badge>
                  </div>

                  <CardDescription className="text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </CardDescription>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {item.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {item.owner.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {item.owner}
                      </span>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleBorrowRequest(item.id)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Borrow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      {/* Post Item Modal */}
      <PostItemModal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
      />
    </div>
  );
}
