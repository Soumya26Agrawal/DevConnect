"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { AddPost } from "@/parts/AddPost";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CardPost from "@/parts/Card";

function Profile() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      console.log("Posts fetched successfully:", data);
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      console.log("Users fetched successfully:");
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchAllUsers();
  }, []);

  if (!isLoaded)
    return <p className="text-center mt-10 text-gray-300">Loading user...</p>;
  if (!isSignedIn)
    return (
      <p className="text-center mt-10 text-red-400">
        Please sign in to view your profile.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#2F2F4E] to-[#3C1E5F] text-white px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 items-center">
        {/* Search Bar */}
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex items-center gap-2 bg-[#320A58] rounded-xl px-4 py-2 shadow-md">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search users..."
            list="users"
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-300"
          />
          <datalist id="users">
            {users.map((user, index) => (
              <option key={index} value={user.username} />
            ))}
          </datalist>
          <Button
            variant="outline"
            className="bg-[#9B4D96] hover:bg-[#b960b3] text-white border-none px-4 py-2 rounded-lg transition"
            onClick={() => router.push(`/user/${search}`)}
          >
            Go
          </Button>
        </div>

        {/* Welcome */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Hi, {user.username}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 text-sm sm:text-base text-center">
          <p className="bg-[#1F1F3A] px-4 py-2 rounded-lg shadow">
            People you follow: <strong>90</strong>
          </p>
          <p className="bg-[#1F1F3A] px-4 py-2 rounded-lg shadow">
            People following you: <strong>90</strong>
          </p>
        </div>

        {/* Add Post */}
        <div className="w-full">
          <AddPost fetchPosts={fetchPosts} />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <CardPost
            key={post._id}
            title={post.title}
            description={post.description}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
