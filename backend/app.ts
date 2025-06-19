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
      res.status(200).json(result)
    })
    .catch((error: any) => {
      console.error("Error in /api/translate endpoint:", error)
      res
        .status(500)
        .json({ error: "Failed to process request", details: error.message })
    })
}

app.post("/api/translateText", translateHandler)

app.get("/", (_, res: express.Response) => {
  res.send("Genkit Translation API is running!")
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
  console.log(`Access the API at http://localhost:${PORT}/api/translate`)
})
