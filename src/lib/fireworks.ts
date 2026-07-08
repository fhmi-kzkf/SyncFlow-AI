// Generic helper to call Fireworks AI using native fetch
export async function generateContent(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.FIREWORKS_API_KEY;
  if (!apiKey) {
    throw new Error("FIREWORKS_API_KEY is not set in the environment variables.");
  }

  const model = process.env.FIREWORKS_MODEL || "accounts/fireworks/models/qwen3p7-plus";

  try {
    const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 4000,
        top_k: 40,
        presence_penalty: 0,
        frequency_penalty: 0,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Fireworks API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Fireworks AI Error:", error);
    throw error;
  }
}
