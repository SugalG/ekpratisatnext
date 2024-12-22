// src/app/api/subcategories/[categoryId]/route.js

import { prisma } from "../../../../../lib/prisma"; // Assuming prisma client is set up in lib/prisma.js"

export async function GET(req, { params }) {
  const { categoryId } = params;

  try {
    // Fetch subcategories based on the categoryId
    const subcategories = await prisma.subCategory.findMany({
      where: {
        categoryId: categoryId, // Filter by the selected category ID
      },
    });

    return new Response(JSON.stringify(subcategories), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch subcategories", { status: 500 });
  }
}
