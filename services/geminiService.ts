import { GoogleGenAI, Type } from "@google/genai";
import { Post, Report } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function generateCollectiveReport(posts: Post[]): Promise<Report> {
  const allText = posts.map(p => p.text).join('\n---\n');

  const prompt = `
    Analyze the following collection of anonymous thoughts. Based on this data, provide a "Collective Mood Report".
    The response must be a JSON object that strictly adheres to the provided schema.

    Do not include any introductory text or markdown formatting like \`\`\`json. Just the raw JSON object.

    Thoughts:
    ---
    ${allText}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topThemes: {
              type: Type.ARRAY,
              description: "Identify the top 3-5 recurring themes or topics. For each theme, provide a short, descriptive name and one representative, anonymized snippet from the provided thoughts.",
              items: {
                type: Type.OBJECT,
                properties: {
                  theme: { type: Type.STRING },
                  snippet: { type: Type.STRING },
                },
              },
            },
            sentimentSummary: {
              type: Type.ARRAY,
              description: "Provide a percentage breakdown of the overall sentiment (positive, negative, neutral). The percentages must sum to 100.",
              items: {
                type: Type.OBJECT,
                properties: {
                  sentiment: { type: Type.STRING },
                  percentage: { type: Type.INTEGER },
                },
              },
            },
            generatedText: {
              type: Type.STRING,
              description: "Write a 2-3 paragraph narrative summary of the collective consciousness. Synthesize the themes and sentiments into a cohesive, insightful, and slightly poetic reflection on the current mood. Speak as if you are the voice of the collective."
            },
          },
        },
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);

    return {
      ...parsedResponse,
      date: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error generating report with Gemini:", error);
    throw new Error("Failed to generate the collective mood report.");
  }
}
