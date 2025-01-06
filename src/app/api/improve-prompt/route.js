import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        Authorization: `Bearer YOUR_HUGGINGFACE_API_KEY`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) throw new Error("Failed to improve prompt");

    const data = await response.json();
    const improvedPrompt = data[0]?.generated_text || "No suggestions.";
    return NextResponse.json({ improvedPrompt });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
