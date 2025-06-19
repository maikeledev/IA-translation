import { googleAI } from "@genkit-ai/googleai"
import { genkit, z } from "genkit"

import dotenv from "dotenv"

const optionSchema = z.object({
  option: z.string(),
  explanation: z.string(),
})

const improveSchema = z.object({
  resultList: z.array(optionSchema),
})

const translateSchema = z.object({
  resultText: z.string(),
})

dotenv.config()

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
  model: googleAI.model("gemini-2.5-flash"),
})

export const translateText = ai.defineFlow(
  {
    name: "translateText",
    inputSchema: z.object({
      text: z.string().min(1, "Text is required"),
      language: z.enum(["English", "Spanish"]),
      action: z.enum(["translate", "improve"]),
    }),
  },
  async (input) => {
    const { text, language, action } = input
    const isImprove = action === "improve"

    const prompt = isImprove
      ? `Please improve this ${language} text:\n\n${text}\n\nReturn a list with 2 options to improve the text.`
      : `Translate this to ${language}:\n\n${text}\n\nReturn ONLY the translated text. DO NOT include any additional text, explanations, or suggestions.`

    const result = await ai.generate({
      prompt: prompt,
      config: {
        temperature: isImprove ? 0.3 : 0.2,
      },
      output: { schema: isImprove ? improveSchema : translateSchema },
    })

    return {
      resultText: result.text,
    }
  }
)
