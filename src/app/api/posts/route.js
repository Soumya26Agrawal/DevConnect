import connectMongo from "@/database/connect";
import User from "@/database/models/user.model";
import Post from "@/database/models/post.model";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const user = await currentUser();
    const { title, description } = await req.json();
    await connectMongo();

    // Validate input
    if (
      [title, description].some((field) => field == null || field.trim() === "")
    ) {
      throw new Error("Title and description are required");
    }

    // Check if user exists
    const userMongoDbId = await User.findOne({ clerkId: user.id }, { _id: 1 });

    // Create new post
    const newPost = await Post.create({
      title,
      description,
      user: userMongoDbId._id, // Use the first found user's MongoDB ID
    });

    if (!newPost) {
      throw new Error("Failed to create post");
    }

    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const user = await currentUser();
    await connectMongo();
    const userMongoDbId = await User.findOne({ clerkId: user.id }, { _id: 1 });
    const posts = await Post.find({ user: userMongoDbId })
      .sort({
        createdAt: -1,
      })
      .limit(6);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
