import google.generativeai as genai
from app.config import settings
from typing import List, Dict, Any
import json

# Configure Gemini AI
genai.configure(api_key=settings.ai_api_key)

def generate_legal_content(topic: str, content_type: str, difficulty: str = "medium", count: int = 5, age_group: str = "teen") -> Dict[str, Any]:
    """
    Generate legal content using Google Gemini AI.
    """
    try:
        model = genai.GenerativeModel('gemini-pro')

        # Create prompts based on content type and parameters
        prompts = {
            "questions": f"""
            Generate {count} multiple-choice questions about {topic} in the Indian Constitution.
            Difficulty level: {difficulty}
            Target audience: {age_group}
            Each question should have:
            - A clear question
            - 4 options (A, B, C, D)
            - The correct answer (specify which option)
            - A brief explanation

            Format as JSON array with objects containing: question, options (array), correct_answer (index 0-3), explanation
            Make questions educational and accurate for learning about the Indian Constitution.
            """,

            "scenarios": f"""
            Generate {count} real-life scenarios related to {topic} in the Indian Constitution.
            Difficulty level: {difficulty}
            Target audience: {age_group}
            Each scenario should have:
            - A situation description
            - A question about what to do or what the Constitution says
            - 4 possible actions/responses
            - The correct constitutional approach
            - An explanation of why it's correct

            Format as JSON array with objects containing: situation, question, options (array), correct_answer (index 0-3), explanation
            Make scenarios practical and educational for understanding constitutional rights and duties.
            """,

            "explanation": f"""
            Provide a comprehensive but simple explanation of {topic} in the Indian Constitution.
            Difficulty level: {difficulty}
            Target audience: {age_group}
            Include:
            - What it means
            - Why it's important
            - Real-life examples
            - Key points to remember

            Format as JSON object with: topic, explanation, key_points (array), examples (array)
            """,

            "facts": f"""
            Generate {count} interesting and educational facts about {topic} in the Indian Constitution.
            Difficulty level: {difficulty}
            Target audience: {age_group}
            Each fact should be:
            - Accurate and verifiable
            - Educational
            - Engaging for the target age group

            Format as JSON array of fact strings.
            """
        }

        prompt = prompts.get(content_type, prompts["questions"])

        response = model.generate_content(prompt)
        response_text = response.text.strip()

        # Clean up the response (remove markdown code blocks if present)
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
        response_text = response_text.strip()

        # Parse the JSON response
        try:
            content = json.loads(response_text)
            return {
                "success": True,
                "content": content,
                "topic": topic,
                "content_type": content_type,
                "generated_at": "2024-01-01T00:00:00Z"  # Would use datetime.utcnow() in real implementation
            }
        except json.JSONDecodeError as e:
            return {
                "success": False,
                "error": f"Failed to parse AI response as JSON: {str(e)}",
                "raw_response": response_text
            }

    except Exception as e:
        return {
            "success": False,
            "error": f"AI generation failed: {str(e)}"
        }

def get_available_topics() -> List[str]:
    """
    Return a list of available constitutional topics for AI generation.
    """
    return [
        "Fundamental Rights",
        "Directive Principles of State Policy",
        "Fundamental Duties",
        "Preamble of the Constitution",
        "Parliament",
        "President",
        "Supreme Court",
        "High Courts",
        "Election Commission",
        "Emergency Provisions",
        "Amendment Procedure",
        "Federal Structure",
        "Judicial Review",
        "Right to Equality",
        "Right to Freedom",
        "Right against Exploitation",
        "Right to Freedom of Religion",
        "Cultural and Educational Rights",
        "Right to Constitutional Remedies",
        "Panchayati Raj",
        "Municipalities"
    ]