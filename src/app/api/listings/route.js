import { prisma } from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { title, description, price, category, subCategory, location, images } = await req.json();

    // Validate the input
    if (!title || !description || !price || !category || !subCategory || !location || !images.length) {
      return new Response("All fields are required", { status: 400 });
    }

    // Create a new listing
    const newListing = await prisma.listing.create({
      data: {
        title,
        description,
        category,
        subCategory,
        location,
        images, // Stored as JSON in the database
        userId: session.user.id, // Associate with the logged-in user
      },
    });

    return new Response(JSON.stringify(newListing), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
    try {
      const listings = await prisma.listing.findMany({
        include: { user: true }, // Include user data if needed
      });
  
      return new Response(JSON.stringify(listings), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching listings:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }