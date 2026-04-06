# InterviewAI — Deployment Guide

## What's in this package

```
interview-site/
├── backend/
│   ├── server.js       ← Node.js API server (keeps your API key secret)
│   └── package.json
└── frontend/
    └── index.html      ← The full website (deploy to Netlify/Vercel)
```

---

## Step 1 — Deploy the Backend (FREE on Render.com)

1. Go to https://render.com and sign up free
2. Click "New" → "Web Service"
3. Connect your GitHub account
4. Create a new GitHub repo, upload the `backend/` folder contents (server.js + package.json)
5. In Render settings:
   - **Name**: interview-ai-backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Under "Environment Variables", add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your key from https://console.anthropic.com/keys
7. Click Deploy — wait ~2 minutes
8. Copy your backend URL — looks like: `https://interview-ai-backend.onrender.com`

---

## Step 2 — Connect Frontend to Backend

1. Open `frontend/index.html` in a text editor
2. Find this line near the bottom:
   ```
   const BACKEND_URL = 'YOUR_BACKEND_URL_HERE';
   ```
3. Replace with your Render URL:
   ```
   const BACKEND_URL = 'https://interview-ai-backend.onrender.com';
   ```
4. Save the file

---

## Step 3 — Deploy the Frontend (FREE on Netlify)

1. Go to https://netlify.com and sign up free
2. Drag and drop your `frontend/` folder onto the Netlify dashboard
3. Your site goes live instantly at a URL like: `https://your-site-name.netlify.app`
4. Optional: add a custom domain in Netlify settings

---

## Step 4 — Get an Anthropic API Key

1. Go to https://console.anthropic.com/keys
2. Click "Create Key" → copy it
3. Add $5 of credits at https://console.anthropic.com/billing
   - $5 = roughly 5,000+ interview answers (very cheap)

---

## Total Cost

| Service   | Cost  |
|-----------|-------|
| Render    | Free  |
| Netlify   | Free  |
| Anthropic | ~$0.001 per answer |

Your users pay nothing. You pay a tiny fraction of a cent per answer.

---

## How users use it

1. Open your website in Chrome or Edge
2. Add job role context (optional)
3. Click "Start listening" → allow mic when Chrome asks
4. Speak — questions are transcribed automatically
5. Press Ctrl+G to generate answer
6. Press Ctrl+H to hide if asked to share screen

---

## Mic Not Working?

If users report mic permission denied:
- Must use Chrome or Edge (not Firefox/Safari)
- Click the lock icon in Chrome address bar → Allow Microphone → Refresh
- Or use the "Type / Paste" tab as fallback

---

## Support

If the Render backend goes to sleep (free tier), first request takes ~30s to wake up.
Upgrade to Render's $7/month plan to keep it always awake.
