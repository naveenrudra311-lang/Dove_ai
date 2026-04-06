import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENROUTER_API_KEY;

app.get("/", (req, res) => {
  res.send("Interview AI backend running");
});

app.post("/api/answer", async (req, res) => {
  try {

    const { question, context } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question required" });
    }

    const prompt = `
You are an expert interview coach.

Question: ${question}

Candidate background: ${context || "Not provided"}

Give a confident concise interview answer under 150 words.
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "user", content: prompt }
          ]
        })
      }
    );

    const data = await response.json();

    const answer =
      data.choices?.[0]?.message?.content ||
      "AI could not generate an answer.";

    res.json({ answer });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server error"
    });

  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
