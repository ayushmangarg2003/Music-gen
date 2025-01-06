import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();
  const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY
  const final_prompt = `Improve this prompt for music generation ${prompt}`
  const MODEL_NAME = 'microsoft/Phi-3-mini-4k-instruct'
  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL_NAME}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: final_prompt }),
    });

    const data = await response.json();
    const improvedPrompt = data[0]?.generated_text || "No suggestions.";

    return NextResponse.json({ improvedPrompt });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
