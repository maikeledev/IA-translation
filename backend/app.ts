import express from "express"
import cors from "cors"
import { translateText } from "./translateFlow.ts"

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

app.post("/api/translateText", (req: any, res: any) => {
  const { text, language, action } = req.body

  if (!text || !language || !action) {
    return res.status(400).json({
      error: "Missing required fields: text, language, and action are required",
    })
  }

  if (!text.trim()) {
    return res.status(400).json({
      error: "Text cannot be empty",
    })
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
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
