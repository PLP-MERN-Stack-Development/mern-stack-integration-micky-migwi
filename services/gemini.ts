import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY; 
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBlogContent = async (topic: string): Promise<string> => {
  const client = getClient();
  if (!client) throw new Error("API Key not configured");

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a comprehensive, engaging blog post about: "${topic}". 
      Format it in Markdown. 
      Include an introduction, 3 main sections with headings, and a conclusion. 
      Keep it under 500 words for a quick read.`,
    });
    
    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
};
