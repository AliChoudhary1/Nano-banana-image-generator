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
  const prompt = `You are an expert prompt engineer and a creative director for AI-powered visual art, specializing in the 'Nano Banana' (gemini-2.5-flash-image) model. Your task is to generate 5 highly creative and descriptive editing prompts for a user's photo.

These prompts should be inspired by popular global trends in AI image generation and digital art. They need to be imaginative and suggest significant, artistic transformations, not just simple additions. Each prompt should be a concise but evocative sentence, around 20-30 words, painting a clear picture of the desired outcome.

Consider these styles for inspiration:
- **Cinematic Lighting:** "Transform the lighting to a dramatic, golden-hour cinematic glow, with long shadows and a warm, nostalgic feel."
- **Surreal Fantasy:** "Morph the background into a surreal, dreamlike landscape with floating islands and bioluminescent flora."
- **Cyberpunk Aesthetic:** "Convert the entire scene into a rainy, neon-drenched cyberpunk city at night, reflecting vibrant colors on wet streets."
- **Vintage & Retro:** "Give the image a grainy, faded 1970s vintage film look, with authentic light leaks and a muted color palette."
- **Impressionistic Painting:** "Reimagine the photo as a vibrant, textured impressionist painting by Monet, focusing on light and brushstrokes."

Now, generate a new, unique set of 5 prompts following these principles. Return ONLY a JSON object with a single key "prompts" which is an array of 5 strings.`;

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