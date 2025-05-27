"use client";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CardPost from "@/parts/Card";

function UserProfile({ params }) {
  const { username } = use(params);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`/api/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
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
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPosts(data.posts);
      console.log("User posts fetched successfully:", data.posts);
    } catch (e) {
      console.error("Error fetching user posts:", e);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (user && user._id) fetchUserPosts();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#240046] to-[#3a0ca3] text-purple-100 flex flex-col justify-start px-4 py-8 sm:px-6 lg:px-12">
      <div className="flex flex-col items-center gap-6 mb-10">
        <h1 className="text-3xl font-bold tracking-wide">{user?.username}</h1>
        <div className="flex gap-6 text-lg">
          <p>
            <span className="font-semibold">
              {user?.followers?.length ?? 0}
            </span>{" "}
            Followers
          </p>
          <p>
            <span className="font-semibold">
              {user?.following?.length ?? 0}
            </span>{" "}
            Following
          </p>
        </div>
        <Button
          variant="outline"
          className="px-6 py-2 border-purple-300 text-purple-600 hover:bg-purple-700 hover:text-white transition"
        >
          {user ? (user.isFollowing ? "Unfollow" : "Follow") : "Loading..."}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
