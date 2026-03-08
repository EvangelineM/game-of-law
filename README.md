# Game of Law: Constitution Learning Platform

An interactive, gamified platform to learn about the Indian Constitution through games, quizzes, and AI-generated content.

## Features

- 🎮 **Interactive Games**: Spin wheel, card matching, crossword puzzles, and situation-based games
- 📚 **Learning Modules**: Comprehensive content about the Indian Constitution
- 🤖 **AI Content Generation**: Dynamic content creation using Google Gemini AI
- 🏆 **Gamification**: XP system, levels, leaderboards, and achievements
- 👥 **Multi-age Support**: Content tailored for children, teens, and adults
- 📊 **Progress Tracking**: Detailed analytics and personalized recommendations

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: FastAPI with Python
- **Database**: MongoDB
- **AI**: Google Gemini AI for content generation
- **Authentication**: JWT tokens

## Project Structure

```
game-of-law/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   └── data/          # Static data files
│   └── package.json
├── backend/           # FastAPI backend
│   ├── app/
│   │   ├── main.py        # FastAPI app
│   │   ├── models.py      # Pydantic models
│   │   ├── ai.py          # AI integration
│   │   └── ...
│   ├── requirements.txt
│   └── .env
└── README.md
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB
- Google Gemini AI API key (for AI features)

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd game-of-law

# Setup backend
cd backend
pip install -r requirements.txt

# Setup frontend
cd ../frontend
npm install
```

### 2. Environment Configuration

#### Backend (.env)
```bash
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=constitution_db
AI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_jwt_secret_here
```

#### Frontend
The frontend uses a proxy to the backend, configured in `frontend/package.json`.

### 3. Start MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Or using Docker Compose (from backend directory)
cd backend
docker-compose up -d mongodb
```

### 4. Start the Application

```bash
# Terminal 1: Start backend
cd backend
uvicorn app.main:app --reload

# Terminal 2: Start frontend
cd frontend
npm start
```

Visit `http://localhost:3000` to access the application.

## AI Content Generation Setup

1. Get a Google Gemini AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add the key to `backend/.env`:
   ```
   AI_API_KEY=your_actual_api_key_here
   ```
3. Restart the backend server
4. Access the AI Content Generator from the navigation menu

### AI Features

- **Dynamic Questions**: Generate multiple-choice questions on any constitutional topic
- **Real Scenarios**: Create situation-based learning content
- **Explanations**: Get comprehensive explanations with examples
- **Fun Facts**: Generate interesting constitutional facts

## API Documentation

### Authentication Endpoints
- `POST /token` - Login
- `POST /register` - Register new user
- `GET /users/me` - Get current user info

### Content Endpoints
- `GET /content/{topic}` - Get learning content
- `GET /quizzes/{topic}` - Get quiz questions

### AI Endpoints
- `GET /ai/topics` - Get available topics for AI generation
- `POST /ai/generate-content` - Generate AI content

### Game Endpoints
- `POST /log-activity` - Log user activities and award XP
- `GET /user-stats` - Get user statistics and recommendations

## Development

### Running Tests

```bash
# Backend tests
cd backend
python test_ai_integration.py

# Frontend tests
cd frontend
npm test
```

### Building for Production

```bash
# Build frontend
cd frontend
npm run build

# Build backend (if needed)
cd backend
# The FastAPI app is ready for production as-is
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on GitHub or contact the development team.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
