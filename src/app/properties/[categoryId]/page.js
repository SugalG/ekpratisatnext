import { prisma } from "../../../../lib/prisma";
import { notFound } from "next/navigation";

// Fetch category properties based on the categoryId
export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { id: true },
  });

  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

export default async function CategoryProperties({ params }) {
  const { categoryId } = params;

  // Fetch properties for this category
  const properties = await prisma.listing.findMany({
    where: { categoryId },
    include: { category: true },
  });

  if (!properties || properties.length === 0) {
    return notFound();
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Properties for {properties[0].category.name}</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <strong>Price:</strong> {property.price} NPR
          </li>
        ))}
      </ul>
    </div>
  );
}
