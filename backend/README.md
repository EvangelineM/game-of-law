# Constitution Learning Platform Backend

A FastAPI backend for a gamified platform to learn about the Indian Constitution.

## Setup

1. Clone or create the project structure.

2. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Set up environment variables:

    - Copy `.env.example` to `.env`
    - Update the values as needed

4. Start MongoDB (locally or via Docker):

    ```bash
    # Using Docker
    docker run -d -p 27017:27017 --name mongodb mongo:7.0
    ```

5. Run the application:
    ```bash
    uvicorn app.main:app --reload
    ```

## Docker Setup

To run with Docker Compose (includes MongoDB):

```bash
docker-compose up --build
```

## API Endpoints

-   `POST /content` - Add new content
-   `GET /content/{topic}` - Get content with questions and scenarios
-   `GET /quizzes/{topic}` - Get quizzes for a topic
-   `GET /ai/topics` - Get available AI content generation topics
-   `POST /ai/generate-content` - Generate AI content for learning

## AI Content Generation

The platform includes Google Gemini AI integration for dynamic content generation.

### Setup AI Integration

1. Get a Google Gemini AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. Update your `.env` file:
    ```
    AI_API_KEY=your_actual_gemini_api_key_here
    ```

3. Restart the backend server

### AI Content Types

- **Questions**: Multiple-choice questions with explanations
- **Scenarios**: Real-life situations with constitutional analysis
- **Explanations**: Comprehensive explanations with key points and examples
- **Facts**: Interesting constitutional facts

### AI API Examples

#### Get Available Topics

```bash
curl -X GET "http://localhost:8000/ai/topics" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Generate Questions

```bash
curl -X POST "http://localhost:8000/ai/generate-content" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{
       "topic": "Fundamental Rights",
       "content_type": "questions",
       "difficulty": "medium",
       "count": 5,
       "age_group": "teen"
     }'
```

#### Generate Scenarios

```bash
curl -X POST "http://localhost:8000/ai/generate-content" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{
       "topic": "Right to Freedom",
       "content_type": "scenarios",
       "difficulty": "easy",
       "count": 3,
       "age_group": "child"
     }'
```

## Testing Examples

### Add Content

```bash
curl -X POST "http://localhost:8000/content" \
     -H "Content-Type: application/json" \
     -d '{
       "topic": "Preamble",
       "text": "The Preamble of the Indian Constitution declares India to be a sovereign, socialist, secular, democratic republic.",
       "source_url": "https://example.com/constitution"
     }'
```

### Get Content

```bash
curl -X GET "http://localhost:8000/content/Preamble"
```

This will return the content along with generated questions and scenarios.
