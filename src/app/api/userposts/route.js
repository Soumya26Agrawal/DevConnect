import connectMongo from "@/database/connect";
import Post from "@/database/models/post.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    await connectMongo();

    const posts = await Post.find({ user: id })
      .sort({
        createdAt: -1,
      })
      .limit(10);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
