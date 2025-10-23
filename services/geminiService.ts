
import { GoogleGenAI, Type } from '@google/genai';
import { EducationalAppIdea } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    appName: { type: Type.STRING, description: "A creative and catchy name for the application." },
    tagline: { type: Type.STRING, description: "A short, memorable tagline for the app." },
    problem: { type: Type.STRING, description: "A clear description of the educational problem or gap it addresses." },
    solution: { type: Type.STRING, description: "A detailed description of the unique and creative digital solution." },
    keyFeatures: {
      type: Type.ARRAY,
      description: "A list of 3-5 key features.",
      items: {
        type: Type.OBJECT,
        properties: {
          feature: { type: Type.STRING, description: "Name of the feature." },
          description: { type: Type.STRING, description: "Detailed description of the feature." },
          technology: { type: Type.STRING, description: "Key technology used (e.g., AI, AR, Gamification)." },
        },
        required: ["feature", "description", "technology"]
      },
    },
    targetAudience: { type: Type.STRING, description: "The target audience and how the app benefits them." },
    monetization: { type: Type.STRING, description: "A potential business or sustainability model." },
    userJourney: { type: Type.STRING, description: "A short example of how a user might interact with the app to achieve a learning goal." },
  },
  required: ["appName", "tagline", "problem", "solution", "keyFeatures", "targetAudience", "monetization", "userJourney"]
};

export const generateEducationalAppIdea = async (): Promise<EducationalAppIdea> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: "Generate a single, innovative educational app idea. The idea should be creative, detailed, and forward-thinking. Please provide the response in JSON format according to the provided schema.",
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const idea = JSON.parse(jsonText);
    return idea as EducationalAppIdea;
  } catch (error) {
    console.error("Error generating educational app idea:", error);
    throw new Error("Failed to generate an idea. The AI might be busy, please try again.");
  }
};
