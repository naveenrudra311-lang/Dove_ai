const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.OPENROUTER_API_KEY;

app.post('/api/answer', async (req, res) => {

  const { question, context } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'No question provided' });
  }

  const prompt = `
You are an expert interview coach.

Answer the interview question clearly and confidently in under 170 words.

Use STAR method for behavioral questions.

Candidate background: ${context || "Not provided"}

Interview question:
${question}
`;

  try {

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{
      method:"POST",
      headers:{
        "Authorization":"Bearer " + API_KEY,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        model:"meta-llama/llama-3.1-8b-instruct:free",
        messages:[
          {role:"user",content:prompt}
        ]
      })
    })

    const data = await response.json()

    const answer = data.choices?.[0]?.message?.content || "No response"

    res.json({ answer })

  } catch (err) {

    res.status(500).json({ error: err.message })

  }

})

app.get('/', (req,res)=>{
  res.send("Interview AI backend running")
})

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
  console.log("Server running on port " + PORT)
})