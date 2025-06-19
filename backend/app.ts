import express from "express"
import cors from "cors"
import { translateText } from "./translateFlow.ts"

interface TranslateRequest {
  text: string
  language: "English" | "Spanish"
  action: "translate" | "improve"
}

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

const translateHandler = (req: express.Request, res: express.Response) => {
  const { text, language, action } = req.body as TranslateRequest

  if (!text || !language || !action) {
    res.status(400).json({
      error: "Missing required fields: text, language, and action are required",
    })
    return
  }

  if (!text.trim()) {
    res.status(400).json({
      error: "Text cannot be empty",
    })
    return
  }

  translateText({ text, language, action })
    .then((result: any) => {
      if (!result) {
        throw new Error("No result received from translation flow")
      }

      res.json({
        success: true,
        result: {
          result: result.resultText,
        },
      })
    })
    .catch((error: any) => {
      res.status(500).json({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    })
}

app.post("/api/translateText", translateHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
