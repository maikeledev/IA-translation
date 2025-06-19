# GenKit Translate

A modern translation application that leverages Google's Gemini AI model through GenKit to provide high-quality text translation and improvement services between English and Spanish.

## 🏗️ Architecture Overview

The application follows a client-server architecture with the following components:

- **Backend**: Node.js/Express server with GenKit integration
- **Frontend**: Vanilla JavaScript with modern UI
- **AI Model**: Google Gemini 2.5 Flash via GenKit
- **API**: RESTful API for translation services

## 🔧 How It Works

### Backend Integration with GenKit

The backend uses **GenKit** as the AI orchestration framework to integrate with Google's Gemini model:

1. **GenKit Setup**: The application initializes GenKit with the Google AI plugin
2. **Model Configuration**: Uses `gemini-2.5-flash` model for optimal performance
3. **Flow Definition**: Defines a translation flow with structured input/output schemas
4. **API Endpoints**: Exposes REST endpoints for translation and text improvement

### Translation Flow

The core translation logic is implemented in `translateFlow.ts`:

```typescript
// GenKit flow definition with Zod schemas for type safety
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
    // Dynamic prompt generation based on action
    const prompt = isImprove
      ? `Please improve this ${language} text...`
      : `Translate this to ${language}...`
    
    // AI generation with structured output
    const result = await ai.generate({
      prompt: prompt,
      config: { temperature: isImprove ? 0.3 : 0.2 },
      output: { schema: isImprove ? improveSchema : translateSchema },
    })
  }
)
```

### Frontend API Integration

The frontend communicates with the backend through a REST API:

- **API Endpoint**: `POST /api/translateText`
- **Request Format**: JSON with `text`, `language`, and `action` fields
- **Response Format**: Structured JSON with translation results
- **Error Handling**: Comprehensive error handling for network and API errors

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Environment Setup

1. **Get a Google Gemini API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key for later use

2. **Set up Environment Variables**:
   Create a `.env` file in the backend directory:
   ```bash
   cd backend
   touch .env
   ```
   
   Add your API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

   The backend will start on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
genkit-translate/
├── backend/
│   ├── app.ts              # Express server setup
│   ├── translateFlow.ts    # GenKit translation flow
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json       # TypeScript configuration
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── translatorIA.js     # Frontend JavaScript logic
│   ├── styles.css          # Application styles
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🔌 API Reference

### Translate Text Endpoint

**POST** `/api/translateText`

**Request Body**:
```json
{
  "text": "Hello world",
  "language": "Spanish",
  "action": "translate"
}
```

**Response**:
```json
{
  "success": true,
  "result": {
    "result": "Hola mundo"
  }
}
```

**Parameters**:
- `text` (string, required): Text to translate or improve
- `language` (string, required): Target language ("English" or "Spanish")
- `action` (string, required): Action type ("translate" or "improve")

## 🎯 Features

### Translation
- **Bidirectional Translation**: English ↔ Spanish
- **High-Quality Output**: Powered by Google Gemini 2.5 Flash
- **Structured Responses**: Type-safe with Zod schemas

### Text Improvement
- **Multiple Options**: Provides 2 improvement suggestions
- **Detailed Explanations**: Each option includes reasoning
- **Context-Aware**: Understands language nuances

### User Interface
- **Modern Design**: Clean, responsive interface
- **Real-time Updates**: Dynamic UI based on language selection
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during processing

## 🛠️ Development

### Backend Development

The backend uses TypeScript with the following key technologies:

- **Express.js**: Web server framework
- **GenKit**: AI orchestration framework
- **Google AI**: Gemini model integration
- **Zod**: Schema validation
- **CORS**: Cross-origin resource sharing

### Frontend Development

The frontend is built with vanilla JavaScript and includes:

- **Modern ES6+**: Arrow functions, async/await, destructuring
- **DOM Manipulation**: Dynamic UI updates
- **Fetch API**: HTTP requests to backend
- **Event Handling**: User interaction management

## 🔒 Security Considerations

- **API Key Protection**: Store Gemini API key in environment variables
- **Input Validation**: Server-side validation with Zod schemas
- **CORS Configuration**: Restricted to frontend origin
- **Error Handling**: No sensitive information in error responses

## 🚀 Deployment

### Backend Deployment

1. **Build the application**:
   ```bash
   cd backend
   npm run build
   ```

2. **Set production environment variables**:
   ```env
   GEMINI_API_KEY=your_production_api_key
   PORT=3001
   ```

3. **Start the production server**:
   ```bash
   node dist/app.js
   ```

### Frontend Deployment

The frontend can be deployed to any static hosting service:

- **Netlify**: Drag and drop the frontend folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Push to gh-pages branch

**Note**: Update the `backendUrl` in `translatorIA.js` to point to your production backend URL.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **Backend won't start**:
   - Check if `.env` file exists with `GEMINI_API_KEY`
   - Verify Node.js version (v18+)
   - Ensure all dependencies are installed

2. **Frontend can't connect to backend**:
   - Verify backend is running on port 3001
   - Check CORS configuration
   - Ensure no firewall blocking localhost

3. **Translation errors**:
   - Verify Gemini API key is valid
   - Check API quota limits
   - Ensure text input is not empty

### Getting Help

If you encounter issues not covered here, please:
1. Check the browser console for errors
2. Review the backend server logs
3. Verify your API key is working
4. Test with a simple text input 