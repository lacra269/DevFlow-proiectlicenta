import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new Response("Missing required fields", { status: 400 });
    }

    const user = await prisma.user.create({
      data: { name, email, password },
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return new Response("Error creating user", { status: 500 });
  }
}
