import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/facebook/musicgen-medium", {
      method: "POST",
      headers: {
        Authorization: `Bearer YOUR_HUGGINGFACE_API_KEY`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) throw new Error("Failed to generate music");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
