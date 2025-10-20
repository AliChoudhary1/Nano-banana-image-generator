
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Ensure API_KEY is available in the environment
if (!process.env.API_KEY) {
    // In a real app, you might want to handle this more gracefully.
    // For this context, we assume it's set.
    console.warn("API_KEY environment variable not set. API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Generates creative image editing prompts using a text model.
 * @returns A promise that resolves to an array of string prompts.
 */
export const generateEditingPrompts = async (): Promise<string[]> => {
  const prompt = `You are a creative assistant for image editing using an AI model.
  Generate exactly 5 unique and concise prompts for editing a user's photo.
  The prompts should be creative and describe a transformative action.
  Examples: 'Add a majestic dragon flying in the sky', 'Turn the scene into a vibrant neon-lit cityscape', 'Make it look like a vintage polaroid photo', 'Cover the ground in magical, glowing flowers', 'Change the weather to a dramatic thunderstorm'.
  Return ONLY a JSON object with a single key "prompts" which is an array of 5 strings.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prompts: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: 'A creative editing prompt.'
              }
            }
          },
          required: ['prompts']
        }
      }
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    if (result && Array.isArray(result.prompts)) {
      return result.prompts;
    }
    
    console.warn("Received unexpected format for prompts:", result);
    return [];

  } catch (error) {
    console.error("Error generating prompts:", error);
    throw new Error("Failed to generate creative prompts from AI.");
  }
};


/**
 * Edits an image using the gemini-2.5-flash-image model.
 * @param base64Image The base64 encoded image data (without the data URL prefix).
 * @param mimeType The MIME type of the image.
 * @param prompt The text prompt describing the edit.
 * @returns A promise that resolves to the new base64 data URL of the edited image.
 */
export const editImageWithNanoBanana = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    
    throw new Error("No image was found in the AI's response.");

  } catch (error) {
    console.error("Error editing image with Nano Banana:", error);
    throw new Error("Failed to edit the image with AI.");
  }
};
