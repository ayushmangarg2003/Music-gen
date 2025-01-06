import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();
  const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY
  const MODEL_NAME = ''

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL_NAME}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    // console.log("RESPONSEEEEEEE", response);

    console.log(response)
    // if (!response.ok) throw new Error("Failed to generate music");

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
