# AI Chat Setup Guide

## Getting Your Free Gemini API Key

1. **Visit Google AI Studio**: https://aistudio.google.com/app/apikey
   - Or visit: https://makersuite.google.com/app/apikey

2. **Sign in** with your Google account

3. **Create API Key**:
   - Click "Create API Key"
   - Select or create a Google Cloud project
   - Copy your API key

4. **Add to Project**:
   - Create a `.env` file in the root directory
   - Add: `VITE_GEMINI_API_KEY=your_api_key_here`
   - Restart your dev server

## Alternative: Using OpenAI (if preferred)

If you prefer OpenAI, update `AIChatBox.jsx`:

```javascript
const API_URL = 'https://api.openai.com/v1/chat/completions';
const response = await fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ]
  })
});
```

## Fallback Mode

The chat box includes intelligent fallback responses if the API fails, so it will still work for demo purposes without an API key.

