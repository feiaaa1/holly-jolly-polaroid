
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateFestiveCaption = async (imageData: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash-latest', // Fallback to a stable text-ready model for captions
      contents: [
        {
          parts: [
            { text: "Generate a very short, cozy Christmas caption (max 5 words) for a Polaroid photo. Examples: 'Cozy Cocoa Vibes', 'Under the Mistletoe', 'Merry & Bright'. Return only the text." },
            { inlineData: { mimeType: 'image/jpeg', data: imageData.split(',')[1] } }
          ]
        }
      ],
      config: {
        temperature: 0.8,
        maxOutputTokens: 20,
      }
    });

    return response.text?.trim() || "Merry Christmas!";
  } catch (error) {
    console.error("Gemini Caption Error:", error);
    const defaults = ["Jolly Times", "Winter Magic", "Season's Greetings", "Warm & Cozy", "Pure Joy"];
    return defaults[Math.floor(Math.random() * defaults.length)];
  }
};
