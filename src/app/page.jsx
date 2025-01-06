"use client";

import { useState } from "react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [improvedPrompt, setImprovedPrompt] = useState("");
  const [music, setMusic] = useState(null);
  const [loading, setLoading] = useState(false);

  const improvePrompt = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/improve-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setImprovedPrompt(data.improvedPrompt);
    } catch (error) {
      console.error("Error improving prompt:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateMusic = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/musicgen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: improvedPrompt || prompt }),
      });
      const data = await response.json();
      setMusic(data.audio);
    } catch (error) {
      console.error("Error generating music:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
      />
      <button onClick={improvePrompt} disabled={loading || !prompt}>
        Improve Prompt
      </button>
      {improvedPrompt && (
        <div>
          <h3>Improved Prompt:</h3>
          <p>{improvedPrompt}</p>
        </div>
      )}
      <button onClick={generateMusic} disabled={loading || (!prompt && !improvedPrompt)}>
        Generate Music
      </button>
      {music && (
        <div>
          <h3>Your Generated Music:</h3>
          <audio controls src={`data:audio/mpeg;base64,${music}`} />
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
}
