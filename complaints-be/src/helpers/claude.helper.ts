import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

// CONFIGURE ENV
dotenv.config();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const generateResponse = async (message: string): Promise<string> => {
  const response = await client.messages.create({
    model: 'claude-3-7-sonnet-20250219',
    max_tokens: 1024,
    messages: [{ role: 'user', content: message }],
  });

  return (response as { content: { text: string }[] }).content[0].text;
};

export { generateResponse };
