import connectMongo from "@/database/connect";
import User from "@/database/models/user.model";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const user = await currentUser();
    await connectMongo();

    // Fetch the user from the database
    const users = await User.find({}, { username: 1 });

    // Return the user details
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  //   const { searchParams } = new URL(request.url);
  //   const username = searchParams.get("username");
  try {
    const { username } = await req.json();
    const myUser = await currentUser();
    await connectMongo();
    const myMongoDbId = await User.findOne({ clerkId: myUser.id }, { _id: 1 });

    // Fetch the user from the database
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.followers.includes(myMongoDbId)) {
      user.isFollowing = true;
    }
    console.log("User found:", user);
    return NextResponse.json(
      { user },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error("Error fetching user:", e);
    return NextResponse.json(
      { error: e.message },
      {
        status: 500,
      }
    );
  }
}
