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
