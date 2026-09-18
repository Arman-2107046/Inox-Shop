import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products — list all products
export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

// POST /api/products — create a product: { "name": "...", "price": 9.99, "stock": 5 }
export async function POST(request: Request) {
  const body = await request.json();
  const product = await prisma.product.create({
    data: { name: body.name, description: body.description, price: body.price, stock: body.stock ?? 0 },
  });
  return NextResponse.json(product, { status: 201 });
}
