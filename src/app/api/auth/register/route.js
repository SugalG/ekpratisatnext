import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req,res) {
  try {
    // Parse request body
    const { email, password } = await req.json();
    console.log("Received data:", { email, password });

    const user = await prisma.user.create({
      data: { email, password }, // You may want to save the hashed password
    });

    console.log("User", user)

    // Respond with the created user's information
    return new Response(JSON.stringify({
      message: "User Created Successfully",
      user: { id: user.id, email: user.email }, // Return only relevant data
    }),)
  
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something happened" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
}
}
