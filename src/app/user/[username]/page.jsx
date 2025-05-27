// import React from "react";
"use client";
import { use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CardPost from "@/parts/Card";
import { useState } from "react";

function UserProfile({ params }) {
  const { username } = use(params);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUser(data.user);
      console.log("User profile fetched successfully:", data.user);
    } catch (e) {
      console.error("Error fetching user profile:", e);
    }
  };
  const fetchUserPosts = async () => {
    try {
      const res = await fetch(`/api/userposts?id=${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setPosts(data.posts);
      console.log("User posts fetched successfully:", data.posts);
    } catch (e) {
      console.error("Error fetching user posts:", e);
    }
  };
  useEffect(() => {
    fetchUserProfile();
    // if (user) fetchUserPosts();
  }, []);

  useEffect(() => {
    if (user && user._id) {
      fetchUserPosts();
    }
  }, [user]);
  return (
    <div className="min-h-screen flex flex-col justify-start">
      <div className="flex flex-col justify-center items-center flex-1 gap-4">
        <h1>Hi, {user && user.username}</h1>
        <p>Followers : {user && user.followers.length}</p>
        <p>Following : {user && user.following.length}</p>
        <Button variant="outline">
          {user && (user.isFollowing ? "Unfollow" : "Follow")}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
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

export default UserProfile;
