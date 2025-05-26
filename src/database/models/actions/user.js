import User from "../user.model.js";
import { NextResponse } from "next/server";

export async function createOrUpdateUser(
  username,
  email_addresses,
  image_url,
  id
) {
  try {
    await connectMongo();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          username: username,
          email: email_addresses[0].email_address,
          avatar: image_url,
          clerkId: id,
        },
      },
      { upsert: true, new: true }
    );
    if (!user) {
      console.error("User not found or created:", user);
      throw new Error("User not found or created");
    }
    return NextResponse.json(
      { message: "User created or updated successfully" },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error("Error creating or updating user:", e);
    // return NextResponse.json(
    //   { error: "Failed to create or update user" },
    //   {
    //     status: 500,
    //   }
    // );
    throw new Error(e.message);
  }
}
export async function deleteUser(id) {
  try {
    await connectMongo();
    const user = await User.findOneAndDelete({ clerkId: id });
    if (!user) {
      console.error("User not deleted", user);
      throw new Error("User not deleted");
    }
    return NextResponse.json(
      { message: "User deleted successfully" },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error("Error creating or updating user:", e);
    // return NextResponse.json(
    //   { error: "Failed to delete user" },
    //   {
    //     status: 500,
    //   }
    // );
    throw new Error(e.message);
  }
}
