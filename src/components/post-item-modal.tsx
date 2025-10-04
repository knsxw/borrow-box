"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, ImageIcon } from "lucide-react";

interface PostItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit?: any;
}

const categories = [
  "Electronics",
  "Tools",
  "Sports",
  "Books",
  "Furniture",
  "Kitchen",
  "Garden",
  "Clothing",
  "Other",
];

export function PostItemModal({
  isOpen,
  onClose,
  itemToEdit,
}: PostItemModalProps) {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("borrowhub_user") || "null")
      : null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    duration: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        title: itemToEdit.title || "",
        description: itemToEdit.description || "",
        category: itemToEdit.category || "",
        location: itemToEdit.location || "",
        duration: itemToEdit.duration || "",
        image: itemToEdit.image || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        duration: "",
        image: "",
      });
    }
  }, [itemToEdit, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🧩 Upload image to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );
      const json = await res.json();
      handleInputChange("image", json.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        itemToEdit ? `${API_URL}/items/${itemToEdit.id}` : `${API_URL}/items`,
        {
          method: itemToEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            owner: user ? user.name : "Anonymous",
          }),
        }
      );

      if (!res.ok)
        throw new Error(
          itemToEdit ? "Failed to update item" : "Failed to post item"
        );

      onClose();
      alert(
        itemToEdit ? "Item updated successfully!" : "Item posted successfully!"
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {itemToEdit ? "Edit Item" : "Post an Item"}
          </DialogTitle>
          <DialogDescription>
            {itemToEdit
              ? "Update the details of your item."
              : "Share an item with your community and help others by lending what you don't use."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Item Title</Label>
            <Input
              id="title"
              placeholder="e.g., Electric Drill, Camera Lens, Camping Tent"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your item, its condition, and any special instructions..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              required
            />
          </div>

          {/* Category & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Max Duration</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => handleInputChange("duration", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="How long?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 day">1 day</SelectItem>
                  <SelectItem value="3 days">3 days</SelectItem>
                  <SelectItem value="1 week">1 week</SelectItem>
                  <SelectItem value="2 weeks">2 weeks</SelectItem>
                  <SelectItem value="1 month">1 month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Downtown, Brooklyn, Near Central Park"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
            />
          </div>

          {/* ✅ Cloudinary Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  {uploading ? "Uploading..." : "Click to upload image"}
                </p>
              </label>
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-3 w-full h-48 object-cover rounded-md"
                />
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              {loading
                ? itemToEdit
                  ? "Updating..."
                  : "Posting..."
                : itemToEdit
                ? "Update Item"
                : "Post Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
