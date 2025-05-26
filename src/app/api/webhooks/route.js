import { createOrUpdateUser, deleteUser } from "@/database/models/actions/user";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    const { id, email_addresses, username, image_url } = evt?.data;
    const eventType = evt?.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    if (eventType === "user.created" || eventType === "user.updated") {
      // Handle user created event
      console.log("User created webhook:");
      console.log("User updated webhook:");
      await createOrUpdateUser(id, email_addresses, image_url, username);
    }

    if (eventType === "user.deleted") {
      // Handle user deleted event
      console.log("User deleted webhook:");
      await deleteUser(id);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
