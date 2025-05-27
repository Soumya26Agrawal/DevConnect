// "use client";
// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { AddPost } from "@/parts/AddPost";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import CardPost from "@/parts/Card";

// function Profile() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn, user } = useUser();
//   const [posts, setPosts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const fetchPosts = async () => {
//     try {
//       const response = await fetch("/api/posts");
//       if (!response.ok) {
//         throw new Error("Failed to fetch posts");
//       }
//       const data = await response.json();
//       console.log("Posts fetched successfully:", data);
//       setPosts(data.posts);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };
//   const fetchAllUsers = async () => {
//     try {
//       const response = await fetch("/api/users");
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error);
//       }
//       console.log("Users fetched successfully:");
//       setUsers(data.users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
//   useEffect(() => {
//     fetchPosts();
//     fetchAllUsers();
//   }, []);

//   if (!isLoaded) {
//     return <p>Loading user...</p>;
//   }

//   if (!isSignedIn) {
//     return <p>Please sign in to view your profile.</p>;
//   }
//   return (
//     <div className="min-h-screen flex flex-col justify-start">
//       <div className="flex flex-col justify-center items-center flex-1 gap-4">
//         <div className="mt-20 border border-white w-[30%] rounded-xl flex flex-row gap-3">
//           <input
//             onChange={(e) => setSearch(e.target.value)}
//             type="text"
//             value={search}
//             placeholder="Search..."
//             list="users"
//             className="w-full py-2 pl-10 pr-4 rounded-lg bg-[#320A58] text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#9B4D96] focus:border-[#9B4D96] placeholder-white"
//           />

//           <datalist id="users">
//             {users.map((user, index) => (
//               <option key={index} value={user.username} />
//             ))}
//           </datalist>

//           {/* <div className="">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-white"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             ></svg>

//           </div> */}
//           <Button
//             variant="outline"
//             className="py-4 h-10"
//             onClick={() => router.push(`/user/${search}`)}
//           >
//             Button
//           </Button>
//         </div>
//         <h1>Hi, {user.username}</h1>
//         <p>People you follow : 90</p>
//         <p>People follow you : 90</p>
//         <AddPost fetchPosts={fetchPosts} />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//         {posts.map((post) => (
//           <CardPost
//             key={post._id}
//             title={post.title}
//             description={post.description}
//             createdAt={post.createdAt}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Profile;

// // const res = await fetch("/api/submit", {
// //   method: "POST",
// //   headers: { "Content-Type": "application/json" },
// //   body: JSON.stringify({ name: "Soumya" }),
// // });
// // const data = await res.json();

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
        <div className="w-full text-center">
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
