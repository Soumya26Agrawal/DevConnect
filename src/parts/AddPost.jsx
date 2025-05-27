"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AddPost({ fetchPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddPost = async () => {
    if (!title || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add post");
      }

      toast.success("Post added successfully");
      setTitle("");
      setDescription("");
      await fetchPosts();
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error(error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-purple-600 text-purple-600 hover:bg-purple-700 hover:text-white transition rounded-md px-4 py-2"
        >
          Add Post
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full bg-[#2A1A4B] rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-purple-200">
            Add Post
          </DialogTitle>
          <DialogDescription className="text-purple-300 mb-6">
            Make a post to share with your followers. You can add a title and a
            description.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-5 items-center gap-4">
            <Label
              htmlFor="title"
              className="text-purple-300 font-medium sm:text-right"
            >
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="sm:col-span-4 bg-[#3E2C6E] placeholder-purple-400 text-white focus:ring-purple-500"
              placeholder="Enter post title"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 items-center gap-4">
            <Label
              htmlFor="description"
              className="text-purple-300 font-medium sm:text-right"
            >
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="sm:col-span-4 bg-[#3E2C6E] placeholder-purple-400 text-white focus:ring-purple-500"
              placeholder="Write something..."
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddPost}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition"
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
